package com.resume.builder.controller;

import com.resume.builder.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
@Slf4j
public class EmailController {

    private final EmailService emailService;

    /**
     * Send resume PDF via email
     */
    @PostMapping(
            value = "/send-resume",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<Map<String, Object>> sendResumeByEmail(
            @RequestPart("recipientEmail") String recipientEmail,
            @RequestPart(value = "subject", required = false) String subject,
            @RequestPart(value = "message", required = false) String message,
            @RequestPart("pdfFile") MultipartFile pdfFile,
            Authentication authentication
    ) {

        Map<String, Object> response = new HashMap<>();

        // ✅ Step 1: Validate inputs
        if (recipientEmail == null || recipientEmail.isBlank()
                || pdfFile == null || pdfFile.isEmpty()) {

            response.put("success", false);
            response.put("message", "Missing required fields");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            // ✅ Step 2: Extract PDF data
            byte[] pdfBytes = pdfFile.getBytes();
            String filename = Objects.requireNonNullElse(
                    pdfFile.getOriginalFilename(),
                    "resume.pdf"
            );

            // ✅ Step 3: Prepare email content
            String emailSubject =
                    (subject != null && !subject.isBlank())
                            ? subject
                            : "Resume from ResumeBuilder";

            String emailBody =
                    (message != null && !message.isBlank())
                            ? message
                            : "Please find my resume attached.";

            // ✅ Step 4: Call service
            emailService.sendEmailWithAttachment(
                    recipientEmail,
                    emailSubject,
                    emailBody,
                    pdfBytes,
                    filename
            );

            // ✅ Step 5: Return success response
            response.put("success", true);
            response.put(
                    "message",
                    "Resume sent successfully to " + recipientEmail
            );
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error sending resume email", e);
            response.put("success", false);
            response.put("message", "Failed to send resume email");
            return ResponseEntity.internalServerError().body(response);
        }
    }
}
