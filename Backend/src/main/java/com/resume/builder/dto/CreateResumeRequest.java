package com.resume.builder.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateResumeRequest {

    @NotBlank(message = "Resume title is required")
    private String title;

    private String templateTheme;
}
