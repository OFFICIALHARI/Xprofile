package com.resume.builder.service;

import com.resume.builder.document.User;
import com.resume.builder.dto.AuthResponse;
import com.resume.builder.dto.LoginRequest;
import com.resume.builder.dto.RegisterRequest;
import com.resume.builder.dto.UpdateProfileRequest;
import com.resume.builder.exception.ResourceExistsException;
import com.resume.builder.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.time.LocalDateTime;
import java.util.UUID;
import com.resume.builder.util.JwtUtil;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Value("${app.base-url}")
    private String appBaseUrl;

    /**
     * Register new user
     */
    public AuthResponse register(RegisterRequest request) {

        log.info("Registering user with email: {}", request.getEmail());

        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            log.warn("User already exists: {}", request.getEmail());
            throw new ResourceExistsException("Email already registered");
        }

        // Convert request → Mongo document
        User newUser = toDocument(request);

        // Save user in DB
        userRepository.save(newUser);
        log.info("User saved with id: {}", newUser.getId());

        // Send verification email (non-blocking)
        sendVerificationEmail(newUser);

        // Send response to frontend
        return toResponse(newUser);
    }

    /**
     * Convert RegisterRequest → User document
     */
    private User toDocument(RegisterRequest request) {

        return User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .profileImageUrl(request.getProfileImageUrl())
                .subscriptionPlan("Basic")
                .emailVerified(false)
                .verificationToken(UUID.randomUUID().toString())
                .verificationExpires(LocalDateTime.now().plusHours(24))
                .build();
    }

    /**
     * Send verification email
     */
    private void sendVerificationEmail(User user) {

        try {
            String verificationLink =
                    appBaseUrl +
                            "/api/auth/verify-email?token=" +
                            user.getVerificationToken();

            String htmlContent = buildVerificationEmail(
                    user.getName(),
                    verificationLink
            );

            emailService.sendHtmlEmail(
                    user.getEmail(),
                    "Verify your email – ResumeBuilder",
                    htmlContent
            );

        } catch (Exception e) {
            // Email failure should NOT break registration
            log.error("Failed to send verification email to {}", user.getEmail(), e);
        }
    }

    /**
     * Build beautiful HTML email
     */
    private String buildVerificationEmail(String name, String link) {

        return """
        <div style="font-family:Arial,sans-serif;
                    max-width:600px;
                    margin:auto;
                    padding:20px;
                    border:1px solid #e5e7eb;
                    border-radius:8px">

            <h2 style="color:#4f46e5">Verify your email</h2>

            <p>Hi <b>%s</b>,</p>

            <p>
                Thanks for registering with <b>ResumeBuilder</b>.
                Please confirm your email to activate your account.
            </p>

            <a href="%s"
               style="display:inline-block;
                      margin:20px 0;
                      padding:12px 20px;
                      background:#4f46e5;
                      color:#ffffff;
                      text-decoration:none;
                      border-radius:6px">
               Verify Email
            </a>

            <p>If the button doesn’t work, copy this link:</p>
            <p style="word-break:break-all">%s</p>

            <p style="font-size:12px;color:gray">
                This link expires in 24 hours.
            </p>

            <p>— ResumeBuilder Team</p>
        </div>
        """.formatted(name, link, link);
    }

    /**
     * Convert User → AuthResponse
     */
    private AuthResponse toResponse(User user) {

        return AuthResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .profileImageUrl(user.getProfileImageUrl())
                .subscriptionPlan(user.getSubscriptionPlan())
                .emailVerified(user.isEmailVerified())
                .token(null)
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
    public void verifyEmail(String token) {

        log.info("Verifying email with token: {}", token);

        User user = userRepository.findByVerificationToken(token)
                .orElseThrow(() -> {
                    log.warn("Invalid verification token");
                    return new RuntimeException("Invalid verification token");
                });

        // Check token expiry
        if (user.getVerificationExpires() != null &&
                user.getVerificationExpires().isBefore(LocalDateTime.now())) {

            log.warn("Verification token expired for email: {}", user.getEmail());
            throw new RuntimeException("Verification token has expired");
        }

        // Mark email as verified
        user.setEmailVerified(true);
        user.setVerificationToken(null);
        user.setVerificationExpires(null);

        userRepository.save(user);

        log.info("Email verified successfully for user: {}", user.getEmail());
    }
    public AuthResponse login(LoginRequest request) {

        User existingUser = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "Invalid email or password"
                        )
                );

        // Password check (BCrypt)
        if (!passwordEncoder.matches(
                request.getPassword(),
                existingUser.getPassword()
        )) {
            throw new UsernameNotFoundException(
                    "Invalid email or password"
            );
        }

        // Email verification check
        if (!existingUser.isEmailVerified()) {
            throw new RuntimeException(
                    "Please verify your email before login"
            );
        }

        // JWT
        String token = jwtUtil.generateToken(existingUser.getId());

        AuthResponse response = toResponse(existingUser);
        response.setToken(token);

        return response;
    }


    public void resendVerification(String email) {

        // Step 1: Fetch user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found with this email"));

        // Step 2: Check if already verified
        if (user.isEmailVerified()) {
            throw new RuntimeException("Email is already verified");
        }

        // Step 3: Generate new token
        user.setVerificationToken(UUID.randomUUID().toString());

        // Step 4: Set new expiry (24 hours)
        user.setVerificationExpires(
                LocalDateTime.now().plusHours(24)
        );

        // Step 5: Save updated user
        userRepository.save(user);

        // Step 6: Send verification email
        sendVerificationEmail(user);
    }

    public AuthResponse updateProfile(User existingUser, UpdateProfileRequest request) {

        log.info("updateProfile called for user: {}", existingUser.getId());
        log.info("Request: name={}, imageUrl={}", request.getName(), request.getProfileImageUrl());

        User user = userRepository.findById(existingUser.getId())
                .orElseThrow(() -> {
                    log.error("User not found with ID: {}", existingUser.getId());
                    return new RuntimeException("User not found");
                });

        if (request.getName() != null && !request.getName().isBlank()) {
            user.setName(request.getName().trim());
            log.info("Updated name to: {}", user.getName());
        }

        if (request.getProfileImageUrl() != null && !request.getProfileImageUrl().isBlank()) {
            user.setProfileImageUrl(request.getProfileImageUrl().trim());
            log.info("Updated profile image URL");
        }

        User savedUser = userRepository.save(user);
        log.info("User profile saved successfully");
        return toResponse(savedUser);
    }
    public AuthResponse getProfile(User existingUser) {

        // Fetch fresh user data from database to ensure latest subscription plan
        User freshUser = userRepository.findById(existingUser.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        log.info("Fetching profile for user {} with subscription: {}", 
                freshUser.getId(), freshUser.getSubscriptionPlan());

        // Convert User entity → response DTO
        return toResponse(freshUser);
    }
    


}
