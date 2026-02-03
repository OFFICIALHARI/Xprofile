package com.resume.builder.dto;


import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {

    private String id;
    private String name;
    private String email;
    private String profileImageUrl;

    private String subscriptionPlan;
    private boolean emailVerified;

    private String token;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
