package com.resume.builder.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.resume.builder.document.Resume;
import com.resume.builder.document.User;
import com.resume.builder.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileUploadService {

    private final Cloudinary cloudinary;
    private final ResumeRepository resumeRepository;
    // Allowed image MIME types
    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of(
            "image/jpeg",
            "image/png",
            "image/jpg"
    );

    // Max file size (5MB)
    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024;

    /**
     * Upload a single profile image to Cloudinary
     */
    public Map<String, String> uploadSingleImage(MultipartFile file) {

        // 1️⃣ Null / empty check
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("Image file is required");
        }

        // 2️⃣ File size validation
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new RuntimeException("Image size must be less than 5MB");
        }

        // 3️⃣ Content type validation
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType)) {
            throw new RuntimeException("Only JPG, JPEG, and PNG images are allowed");
        }

        try {
            log.info("Uploading image: {}", file.getOriginalFilename());

            Map<String, Object> uploadResult =
                    cloudinary.uploader().upload(
                            file.getBytes(),
                            ObjectUtils.asMap(
                                    "resource_type", "image",
                                    "folder", "resume-builder/profile-images",
                                    "allowed_formats", new String[]{"jpg", "jpeg", "png"},
                                    "overwrite", true
                            )
                    );

            String imageUrl = uploadResult.get("secure_url").toString();

            log.info("Image uploaded successfully: {}", imageUrl);

            return Map.of(
                    "imageUrl", imageUrl
            );

        } catch (Exception e) {
            log.error("Cloudinary image upload failed", e);
            throw new RuntimeException("Failed to upload image");
        }
    }
    public Map<String, String> uploadResumeImages(
            String resumeId,
            MultipartFile thumbnail,
            MultipartFile profileImage,
            Object principal) {

        // Step 1: Get logged-in user
        User user = (User) principal;

        // Step 2: Fetch resume owned by this user
        Resume existingResume = resumeRepository
                .findByUserIdAndId(user.getId(), resumeId)
                .orElseThrow(() ->
                        new RuntimeException("Resume not found"));

        Map<String, String> returnValue = new HashMap<>();

        // Step 3: Upload thumbnail image (if provided)
        if (thumbnail != null && !thumbnail.isEmpty()) {

            Map<String, String> uploadResult =
                    uploadSingleImage(thumbnail);

            existingResume.setThumbnailLink(
                    uploadResult.get("imageUrl"));

            returnValue.put(
                    "thumbnailLink",
                    uploadResult.get("imageUrl"));
        }

        // Step 4: Upload profile image (if provided)
        if (profileImage != null && !profileImage.isEmpty()) {

            Map<String, String> uploadResult =
                    uploadSingleImage(profileImage);

            if (existingResume.getProfileInfo() == null) {
                existingResume.setProfileInfo(
                        new Resume.ProfileInfo());
            }

            existingResume.getProfileInfo()
                    .setProfilePreviewUrl(
                            uploadResult.get("imageUrl"));

            returnValue.put(
                    "profilePreviewUrl",
                    uploadResult.get("imageUrl"));
        }

        // Step 5: Save updated resume
        resumeRepository.save(existingResume);

        // Step 6: Add success message
        returnValue.put(
                "message",
                "Images uploaded successfully");

        return returnValue;
    }

}
