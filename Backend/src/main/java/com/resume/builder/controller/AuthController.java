package com.resume.builder.controller;

import com.resume.builder.document.User;
import com.resume.builder.dto.AuthResponse;
import com.resume.builder.dto.LoginRequest;
import com.resume.builder.dto.RegisterRequest;
import com.resume.builder.dto.UpdateProfileRequest;
import com.resume.builder.service.AuthService;
import com.resume.builder.service.FileUploadService;
import com.resume.builder.util.AppConstants;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping(AppConstants.AUTH_BASE)
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Authentication", description = "User registration, login, and profile management APIs")
public class AuthController {

    private final AuthService authService;
    private final FileUploadService fileUploadService;

    // =========================
    // REGISTER
    // =========================
    @PostMapping(AppConstants.REGISTER)
    @Operation(summary = "Register a new user", description = "Create a new user account with email verification")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User registered successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "409", description = "Email already exists")
    })
    public ResponseEntity<?> register(
            @Valid @RequestBody RegisterRequest request) {

        log.info("Register API called");
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(authService.register(request));
    }

    // =========================
    // VERIFY EMAIL
    // =========================
    @GetMapping(AppConstants.VERIFY_EMAIL)
    @Operation(summary = "Verify user email", description = "Verify email address using the token sent to user's email")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Email verified successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid or expired token")
    })
    public ResponseEntity<?> verifyEmail(@RequestParam String token) {

        log.info("Verify email API called");

        authService.verifyEmail(token);

        return ResponseEntity.ok(
                Map.of("message", "Email verified successfully")
        );
    }

    // =========================
    // UPLOAD PROFILE IMAGE
    // =========================
    @PostMapping(
            value = AppConstants.UPLOAD_IMAGE,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    @Operation(summary = "Upload profile image", description = "Upload and store profile picture on Cloudinary")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Image uploaded successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid image file"),
            @ApiResponse(responseCode = "413", description = "File size exceeds limit (5MB max)")
    })
    public ResponseEntity<?> uploadImage(
            @RequestPart("image") MultipartFile file) {

        log.info("Upload image API called");
        log.info("File name: {}, Size: {} bytes", file.getOriginalFilename(), file.getSize());

        try {
            Map<String, String> response =
                    fileUploadService.uploadSingleImage(file);
            
            log.info("Upload successful: {}", response.get("imageUrl"));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Upload failed with exception", e);
            throw e;
        }
    }

    // =========================
    // LOGIN
    // =========================
    @PostMapping(AppConstants.LOGIN)
    @Operation(summary = "Login user", description = "Authenticate user and return JWT token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login successful, JWT token returned"),
            @ApiResponse(responseCode = "401", description = "Invalid credentials"),
            @ApiResponse(responseCode = "403", description = "Email not verified")
    })
    public ResponseEntity<?> login(
            @Valid @RequestBody LoginRequest request) {

        log.info("Login API called");

        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    // =========================
    // JWT VALIDATION TEST
    // =========================
    @GetMapping(AppConstants.VALIDATE)
    @Operation(summary = "Validate JWT token", description = "Check if JWT token is valid and authenticated")
    @ApiResponse(responseCode = "200", description = "Token is valid")
    public ResponseEntity<?> validateToken() {
        return ResponseEntity.ok("Token validation is working");
    }

    // =========================
    // RESEND VERIFICATION EMAIL
    // =========================
    @PostMapping(AppConstants.RESEND_VERIFICATION)
    @Operation(summary = "Resend verification email", description = "Send verification email again if it was missed")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Verification email sent successfully"),
            @ApiResponse(responseCode = "400", description = "Email is required"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    public ResponseEntity<?> resendVerification(
            @RequestBody Map<String, String> body) {

        String email = body.get("email");

        if (email == null || email.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email is required"));
        }

        authService.resendVerification(email);

        return ResponseEntity.ok(
                Map.of(
                        "success", true,
                        "message", "Verification email sent successfully"
                )
        );
    }

    // =========================
    // GET CURRENT USER PROFILE
    // =========================
    @GetMapping(AppConstants.PROFILE)
    @Operation(summary = "Get user profile", description = "Retrieve current authenticated user's profile information")
    @ApiResponse(responseCode = "200", description = "Profile retrieved successfully")
    public ResponseEntity<?> getProfile(Authentication authentication) {

        // Principal = currently logged-in user (set by JWT filter)
        User existingUser = (User) authentication.getPrincipal();

        AuthResponse currentProfile =
                authService.getProfile(existingUser);

        return ResponseEntity.ok(currentProfile);
    }

        // =========================
        // UPDATE CURRENT USER PROFILE
        // =========================
        @PutMapping(AppConstants.PROFILE)
        @Operation(summary = "Update user profile", description = "Update current authenticated user's profile information")
        @ApiResponses(value = {
                @ApiResponse(responseCode = "200", description = "Profile updated successfully"),
                @ApiResponse(responseCode = "400", description = "Invalid input data")
        })
        public ResponseEntity<?> updateProfile(
                        @RequestBody UpdateProfileRequest request,
                        Authentication authentication) {

                log.info("Update profile API called");
                User existingUser = (User) authentication.getPrincipal();
                log.info("Updating profile for user: {}", existingUser.getId());

                AuthResponse updatedProfile =
                                authService.updateProfile(existingUser, request);

                log.info("Profile updated successfully");
                return ResponseEntity.ok(updatedProfile);
        }
}
