package com.resume.builder.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.from}")
    private String fromEmail;

    public void sendHtmlEmail(String to, String subject, String htmlContent) {

        try {
            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            mailSender.send(message);

            log.info("Verification email sent to {}", to);

        } catch (MessagingException e) {
            log.error("Failed to send email to {}", to, e);
            throw new RuntimeException("Failed to send email");
        }
    }
    /**
     * Send email with attachment (PDF)
     */
    public void sendEmailWithAttachment(
            String to,
            String subject,
            String body,
            byte[] attachment,
            String filename
    ) {
        try {
            // ✅ Step 1: Create MIME message
            MimeMessage message =
                    mailSender.createMimeMessage();

            // ✅ Step 2: Helper (multipart = true)
            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true);

            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body);

            // ✅ Step 3: Add PDF attachment
            helper.addAttachment(
                    filename,
                    new ByteArrayResource(attachment)
            );

            // ✅ Step 4: Send email
            mailSender.send(message);

            log.info("Resume email sent successfully to {}", to);

        } catch (Exception e) {
            log.error("Failed to send email", e);
            throw new RuntimeException("Email sending failed");
        }
    }
}
