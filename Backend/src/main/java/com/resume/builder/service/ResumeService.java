package com.resume.builder.service;

import com.resume.builder.document.Resume;
import com.resume.builder.document.User;
import com.resume.builder.dto.AuthResponse;
import com.resume.builder.dto.CreateResumeRequest;
import com.resume.builder.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ResumeService {
    private final ResumeRepository resumeRepository;
    private final AuthService authService;

    public Resume createResume(
            CreateResumeRequest request,
            Authentication authentication) {

        // Step 1: Get logged-in user directly
        User existingUser = (User) authentication.getPrincipal();

        // Step 2: Create empty resume
        Resume newResume = new Resume();

        // Step 3: Attach resume to user
        newResume.setUserId(existingUser.getId());

        // Step 4: Set title
        newResume.setTitle(request.getTitle());

        // Step 5: Set default data
        setDefaultResumeData(newResume);

        // Step 5.1: Set template theme (default to "Classic Blue")
        String templateTheme = request.getTemplateTheme();
        Resume.Template template = new Resume.Template();
        template.setTheme((templateTheme == null || templateTheme.isBlank())
                ? "Classic Blue"
                : templateTheme);
        newResume.setTemplate(template);

        // Step 6: Save
        return resumeRepository.save(newResume);
    }
    private void setDefaultResumeData(Resume resume) {
        resume.setProfileInfo(new Resume.ProfileInfo());
        resume.setContactInfo(new Resume.ContactInfo());
        resume.setWorkExperience(new ArrayList<>());
        resume.setEducation(new ArrayList<>());
        resume.setSkills(new ArrayList<>());
        resume.setProjects(new ArrayList<>());
        resume.setCertifications(new ArrayList<>());
        resume.setLanguages(new ArrayList<>());
        resume.setInterests(new ArrayList<>());
        resume.setTemplate(new Resume.Template());
    }
    public List<Resume> getUserResumes(User user) {

        return resumeRepository
                .findByUserIdOrderByUpdatedAtDesc(user.getId());
    }
    public Resume getResumeById(String resumeId, User user) {

        return resumeRepository
                .findByUserIdAndId(user.getId(), resumeId)
                .orElseThrow(() ->
                        new RuntimeException("Resume not found"));
    }

    public Resume updateResume(
            String resumeId,
            Resume updatedData,
            User user) {

        // Step 1: Fetch resume owned by user
        Resume existingResume = resumeRepository
                .findByUserIdAndId(user.getId(), resumeId)
                .orElseThrow(() ->
                        new RuntimeException("Resume not found"));

        // Step 2: Update fields
        existingResume.setTitle(updatedData.getTitle());
        existingResume.setThumbnailLink(updatedData.getThumbnailLink());
        existingResume.setTemplate(updatedData.getTemplate());
        existingResume.setProfileInfo(updatedData.getProfileInfo());
        existingResume.setContactInfo(updatedData.getContactInfo());
        existingResume.setWorkExperience(updatedData.getWorkExperience());
        existingResume.setEducation(updatedData.getEducation());
        existingResume.setSkills(updatedData.getSkills());
        existingResume.setProjects(updatedData.getProjects());
        existingResume.setCertifications(updatedData.getCertifications());
        existingResume.setLanguages(updatedData.getLanguages());
        existingResume.setInterests(updatedData.getInterests());

        // Step 3: Save updated resume
        return resumeRepository.save(existingResume);
    }
    public void deleteResume(String resumeId, Object principal) {

        // Step 1: Get logged-in user's profile
        AuthResponse response =
                authService.getProfile((User) principal);

        // Step 2: Fetch resume ONLY if it belongs to this user
        Resume existingResume =
                resumeRepository
                        .findByUserIdAndId(
                                response.getId(),
                                resumeId
                        )
                        .orElseThrow(() ->
                                new RuntimeException("Resume not found")
                        );

        // Step 3: Delete resume
        resumeRepository.delete(existingResume);

        log.info(
                "Resume deleted successfully. ResumeId={}, UserId={}",
                resumeId,
                response.getId()
        );
    }

}
