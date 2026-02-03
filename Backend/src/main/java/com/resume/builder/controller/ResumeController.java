package com.resume.builder.controller;

import com.resume.builder.document.User;
import com.resume.builder.dto.CreateResumeRequest;
import com.resume.builder.document.Resume;
import com.resume.builder.service.FileUploadService;
import com.resume.builder.service.ResumeService;
import com.resume.builder.util.AppConstants;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(AppConstants.RESUME)
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Resumes", description = "Resume creation, update, and management APIs")
public class ResumeController {

    private final ResumeService resumeService;
    private final FileUploadService fileUploadService;
    @PostMapping
    @Operation(summary = "Create new resume", description = "Create a new resume for the authenticated user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Resume created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input data")
    })
    public ResponseEntity<?> createResume(
            @Valid @RequestBody CreateResumeRequest request,
            Authentication authentication) {

        Resume newResume =
                resumeService.createResume(request, authentication);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(newResume);
    }


    @GetMapping
    @Operation(summary = "Get all user resumes", description = "Retrieve all resumes created by the authenticated user")
    @ApiResponse(responseCode = "200", description = "Resumes retrieved successfully")
    public ResponseEntity<?> getUserResumes(Authentication authentication) {

        // Extract logged-in user
        User existingUser = (User) authentication.getPrincipal();

        // Call service
        List<Resume> resumes =
                resumeService.getUserResumes(existingUser);

        return ResponseEntity.ok(resumes);
    }


    @GetMapping(AppConstants.ID)
    @Operation(summary = "Get resume by ID", description = "Retrieve a specific resume by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Resume retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Resume not found")
    })
    public ResponseEntity<?> getResumeById(
            @PathVariable String id,
            Authentication authentication) {

        // Extract logged-in user
        User existingUser = (User) authentication.getPrincipal();

        Resume existingResume =
                resumeService.getResumeById(id, existingUser);

        return ResponseEntity.ok(existingResume);
    }


    @PutMapping(AppConstants.ID)
    @Operation(summary = "Update resume", description = "Update an existing resume with new data")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Resume updated successfully"),
            @ApiResponse(responseCode = "404", description = "Resume not found")
    })
    public ResponseEntity<?> updateResume(
            @PathVariable String id,
            @RequestBody Resume updatedData,
            Authentication authentication) {

        // Extract logged-in user
        User existingUser = (User) authentication.getPrincipal();

        Resume updatedResume =
                resumeService.updateResume(id, updatedData, existingUser);

        return ResponseEntity.ok(updatedResume);
    }


    @PutMapping(AppConstants.UPLOAD_IMAGES)
    @Operation(summary = "Upload resume images", description = "Upload thumbnail and profile images for a resume")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Images uploaded successfully"),
            @ApiResponse(responseCode = "404", description = "Resume not found")
    })
    public ResponseEntity<?> uploadResumeImages(
            @PathVariable String id,
            @RequestPart(value = "thumbnail", required = false) MultipartFile thumbnail,
            @RequestPart(value = "profileImage", required = false) MultipartFile profileImage,
            Authentication authentication) {

        Map<String, String> response =
                fileUploadService.uploadResumeImages(
                        id,
                        thumbnail,
                        profileImage,
                        authentication.getPrincipal()
                );

        return ResponseEntity.ok(response);
    }


    @DeleteMapping(AppConstants.ID)
    @Operation(summary = "Delete resume", description = "Delete a resume permanently")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Resume deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Resume not found")
    })
    public ResponseEntity<?> deleteResume(
            @PathVariable String id,
            Authentication authentication) {

        // Step 1: Call service with resumeId + logged-in user
        resumeService.deleteResume(
                id,
                authentication.getPrincipal()
        );

        // Step 2: Return success response
        return ResponseEntity.ok(
                Map.of(
                        "message", "Resume deleted successfully"
                )
        );
    }

}
