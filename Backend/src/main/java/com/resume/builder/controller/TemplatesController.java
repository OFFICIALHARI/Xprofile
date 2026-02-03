package com.resume.builder.controller;

import com.resume.builder.service.TemplatesService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/templates")
@Slf4j
@Tag(name = "Templates", description = "Resume template management APIs")
public class TemplatesController {

    private final TemplatesService templatesService;

    @GetMapping
    @Operation(summary = "Get available templates", description = "Retrieve all available resume templates for the user")
    @ApiResponse(responseCode = "200", description = "Templates retrieved successfully")
    public ResponseEntity<?> getTemplates(Authentication authentication) {

        log.info("Get templates API called");

        Map<String, Object> response =
                templatesService.getTemplates(authentication.getPrincipal());

        return ResponseEntity.ok(response);
    }
}
