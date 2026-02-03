package com.resume.builder.dto;

import lombok.Data;

@Data
public class UpdateProfileRequest {
    private String name;
    private String profileImageUrl;
}
