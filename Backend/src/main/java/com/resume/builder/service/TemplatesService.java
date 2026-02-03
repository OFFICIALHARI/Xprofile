package com.resume.builder.service;

import com.resume.builder.document.User;
import com.resume.builder.dto.AuthResponse;
import com.resume.builder.util.AppConstants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor
@Slf4j
public class TemplatesService {

    private final AuthService authService;



    public Map<String, Object> getTemplates(Object principal) {

        // Step 1: Get logged-in user's profile
        User user = (User) principal;
        AuthResponse authResponse =
                authService.getProfile(user);

        // Step 2: Check subscription
        boolean isPremium =
                AppConstants.PREMIUM.equalsIgnoreCase(
                        authResponse.getSubscriptionPlan()
                );

        // Step 3: Decide available templates
        List<String> availableTemplates;

        if (isPremium) {
            availableTemplates = List.of(
                "Classic Blue",
                "ATS Clean",
                "Modern Navy",
                "Minimal Grey",
                "Accent Orange",
                "Academic Grey",
                "Tech Serif"
            );
        } else {
            availableTemplates = List.of(
                "Classic Blue",
                "ATS Clean",
                "Minimal Grey",
                "Tech Serif"
            );
        }

        // Step 4: Build response
        Map<String, Object> restrictions = new HashMap<>();
        restrictions.put("availableTemplates", availableTemplates);
        restrictions.put(
            "allTemplates",
            List.of("Classic Blue", "ATS Clean", "Modern Navy", "Minimal Grey", "Accent Orange", "Academic Grey", "Tech Serif")
        );
        restrictions.put("subscriptionPlan", authResponse.getSubscriptionPlan());
        restrictions.put("isPremium", isPremium);

        return restrictions;
    }
}
