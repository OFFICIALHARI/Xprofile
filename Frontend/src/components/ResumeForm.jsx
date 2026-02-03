import { useState } from 'react';
import { User, Phone, Briefcase, GraduationCap, Code, FolderGit2, Award, Languages, Heart, Palette } from 'lucide-react';

const ResumeForm = ({ resume, updateResume, activeSection, setActiveSection }) => {
  const sections = [
    { id: 'profile', label: 'Profile Info', icon: User },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'work', label: 'Work Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'languages', label: 'Languages', icon: Languages },
    { id: 'theme', label: 'Theme', icon: Palette },
  ];

  const currentIndex = sections.findIndex((section) => section.id === activeSection);
  const previousSection = currentIndex > 0 ? sections[currentIndex - 1] : null;
  const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;

  return (
    <div>
      {/* Section Navigation */}
      <div className="mb-6 border-b">
        <div className="flex overflow-x-auto space-x-1 pb-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg whitespace-nowrap transition-colors ${
                  activeSection === section.id
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section Content */}
      <div className="space-y-6">
        {activeSection === 'profile' && (
          <ProfileSection resume={resume} updateResume={updateResume} />
        )}
        {activeSection === 'contact' && (
          <ContactSection resume={resume} updateResume={updateResume} />
        )}
        {activeSection === 'work' && (
          <WorkExperienceSection resume={resume} updateResume={updateResume} />
        )}
        {activeSection === 'education' && (
          <EducationSection resume={resume} updateResume={updateResume} />
        )}
        {activeSection === 'skills' && (
          <SkillsSection resume={resume} updateResume={updateResume} />
        )}
        {activeSection === 'projects' && (
          <ProjectsSection resume={resume} updateResume={updateResume} />
        )}
        {activeSection === 'certifications' && (
          <CertificationsSection resume={resume} updateResume={updateResume} />
        )}
        {activeSection === 'languages' && (
          <LanguagesSection resume={resume} updateResume={updateResume} />
        )}
        {activeSection === 'theme' && (
          <ThemeSection resume={resume} updateResume={updateResume} />
        )}
      </div>

      {/* Prev / Next Navigation */}
      <div className="flex items-center justify-between mt-8">
        <button
          type="button"
          onClick={() => previousSection && setActiveSection(previousSection.id)}
          disabled={!previousSection}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => nextSection && setActiveSection(nextSection.id)}
          disabled={!nextSection}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Profile Info Section
const ProfileSection = ({ resume, updateResume }) => {
  const handleChange = (field, value) => {
    updateResume('profileInfo', {
      ...resume.profileInfo,
      [field]: value,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900">Profile Information</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
        <input
          type="text"
          value={resume.profileInfo?.fullName || ''}
          onChange={(e) => handleChange('fullName', e.target.value)}
          className="input-field"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
        <input
          type="text"
          value={resume.profileInfo?.designation || ''}
          onChange={(e) => handleChange('designation', e.target.value)}
          className="input-field"
          placeholder="Software Engineer"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Professional Summary</label>
        <textarea
          value={resume.profileInfo?.summary || ''}
          onChange={(e) => handleChange('summary', e.target.value)}
          className="input-field min-h-[120px]"
          placeholder="Brief summary about yourself..."
        />
      </div>
    </div>
  );
};

// Contact Info Section
const ContactSection = ({ resume, updateResume }) => {
  const handleChange = (field, value) => {
    updateResume('contactInfo', {
      ...resume.contactInfo,
      [field]: value,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900">Contact Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={resume.contactInfo?.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            className="input-field"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            value={resume.contactInfo?.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="input-field"
            placeholder="+1 234 567 8900"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
        <input
          type="text"
          value={resume.contactInfo?.location || ''}
          onChange={(e) => handleChange('location', e.target.value)}
          className="input-field"
          placeholder="New York, USA"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
          <input
            type="url"
            value={resume.contactInfo?.linkedIn || ''}
            onChange={(e) => handleChange('linkedIn', e.target.value)}
            className="input-field"
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
          <input
            type="url"
            value={resume.contactInfo?.github || ''}
            onChange={(e) => handleChange('github', e.target.value)}
            className="input-field"
            placeholder="github.com/johndoe"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
        <input
          type="url"
          value={resume.contactInfo?.website || ''}
          onChange={(e) => handleChange('website', e.target.value)}
          className="input-field"
          placeholder="johndoe.com"
        />
      </div>
    </div>
  );
};

// Work Experience Section
const WorkExperienceSection = ({ resume, updateResume }) => {
  const addExperience = () => {
    const newExperience = {
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    updateResume('workExperience', [...(resume.workExperience || []), newExperience]);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...resume.workExperience];
    updated[index][field] = value;
    updateResume('workExperience', updated);
  };

  const removeExperience = (index) => {
    const updated = resume.workExperience.filter((_, i) => i !== index);
    updateResume('workExperience', updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Work Experience</h3>
        <button onClick={addExperience} className="btn-primary text-sm">
          Add Experience
        </button>
      </div>
      {resume.workExperience?.map((exp, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-gray-700">Experience {index + 1}</span>
            <button
              onClick={() => removeExperience(index)}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={exp.company}
              onChange={(e) => updateExperience(index, 'company', e.target.value)}
              className="input-field"
              placeholder="Company Name"
            />
            <input
              type="text"
              value={exp.role}
              onChange={(e) => updateExperience(index, 'role', e.target.value)}
              className="input-field"
              placeholder="Job Title"
            />
            <input
              type="text"
              value={exp.startDate}
              onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
              className="input-field"
              placeholder="Start Date (e.g., Jan 2020)"
            />
            <input
              type="text"
              value={exp.endDate}
              onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
              className="input-field"
              placeholder="End Date (e.g., Present)"
            />
          </div>
          <textarea
            value={exp.description}
            onChange={(e) => updateExperience(index, 'description', e.target.value)}
            className="input-field min-h-[80px]"
            placeholder="Job responsibilities and achievements..."
          />
        </div>
      ))}
    </div>
  );
};

// Education Section
const EducationSection = ({ resume, updateResume }) => {
  const addEducation = () => {
    const newEducation = {
      degree: '',
      institution: '',
      startDate: '',
      endDate: '',
    };
    updateResume('education', [...(resume.education || []), newEducation]);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...resume.education];
    updated[index][field] = value;
    updateResume('education', updated);
  };

  const removeEducation = (index) => {
    const updated = resume.education.filter((_, i) => i !== index);
    updateResume('education', updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Education</h3>
        <button onClick={addEducation} className="btn-primary text-sm">
          Add Education
        </button>
      </div>
      {resume.education?.map((edu, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-gray-700">Education {index + 1}</span>
            <button
              onClick={() => removeEducation(index)}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={edu.degree}
              onChange={(e) => updateEducation(index, 'degree', e.target.value)}
              className="input-field"
              placeholder="Degree (e.g., Bachelor of Science in Computer Science)"
            />
            <input
              type="text"
              value={edu.institution}
              onChange={(e) => updateEducation(index, 'institution', e.target.value)}
              className="input-field"
              placeholder="Institution Name"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={edu.startDate}
                onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                className="input-field"
                placeholder="Start Year (e.g., 2016)"
              />
              <input
                type="text"
                value={edu.endDate}
                onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                className="input-field"
                placeholder="End Year (e.g., 2020)"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Skills Section
const SkillsSection = ({ resume, updateResume }) => {
  const addSkill = () => {
    const newSkill = { name: '' };
    updateResume('skills', [...(resume.skills || []), newSkill]);
  };

  const updateSkill = (index, field, value) => {
    const updated = [...resume.skills];
    updated[index][field] = value;
    updateResume('skills', updated);
  };

  const removeSkill = (index) => {
    const updated = resume.skills.filter((_, i) => i !== index);
    updateResume('skills', updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Skills</h3>
        <button onClick={addSkill} className="btn-primary text-sm">
          Add Skill
        </button>
      </div>
      {resume.skills?.map((skill, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center gap-3">
            <input
              type="text"
              value={skill.name}
              onChange={(e) => updateSkill(index, 'name', e.target.value)}
              className="input-field flex-1"
              placeholder="Skill Name (e.g., JavaScript)"
            />
            <button
              onClick={() => removeSkill(index)}
              className="text-red-600 hover:text-red-700 text-sm whitespace-nowrap"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Projects Section
const ProjectsSection = ({ resume, updateResume }) => {
  const addProject = () => {
    const newProject = {
      title: '',
      description: '',
      github: '',
      liveDemo: '',
    };
    updateResume('projects', [...(resume.projects || []), newProject]);
  };

  const updateProject = (index, field, value) => {
    const updated = [...resume.projects];
    updated[index][field] = value;
    updateResume('projects', updated);
  };

  const removeProject = (index) => {
    const updated = resume.projects.filter((_, i) => i !== index);
    updateResume('projects', updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Projects</h3>
        <button onClick={addProject} className="btn-primary text-sm">
          Add Project
        </button>
      </div>
      {resume.projects?.map((project, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-gray-700">Project {index + 1}</span>
            <button
              onClick={() => removeProject(index)}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
          <input
            type="text"
            value={project.title}
            onChange={(e) => updateProject(index, 'title', e.target.value)}
            className="input-field"
            placeholder="Project Title"
          />
          <textarea
            value={project.description}
            onChange={(e) => updateProject(index, 'description', e.target.value)}
            className="input-field min-h-[80px]"
            placeholder="Project description..."
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="url"
              value={project.github}
              onChange={(e) => updateProject(index, 'github', e.target.value)}
              className="input-field"
              placeholder="GitHub URL"
            />
            <input
              type="url"
              value={project.liveDemo}
              onChange={(e) => updateProject(index, 'liveDemo', e.target.value)}
              className="input-field"
              placeholder="Live Demo URL"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// Certifications Section
const CertificationsSection = ({ resume, updateResume }) => {
  const addCertification = () => {
    const newCert = { title: '', issuer: '', year: '' };
    updateResume('certifications', [...(resume.certifications || []), newCert]);
  };

  const updateCertification = (index, field, value) => {
    const updated = [...resume.certifications];
    updated[index][field] = value;
    updateResume('certifications', updated);
  };

  const removeCertification = (index) => {
    const updated = resume.certifications.filter((_, i) => i !== index);
    updateResume('certifications', updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Certifications</h3>
        <button onClick={addCertification} className="btn-primary text-sm">
          Add Certification
        </button>
      </div>
      {resume.certifications?.map((cert, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold text-gray-700">Certification {index + 1}</span>
            <button
              onClick={() => removeCertification(index)}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
          <input
            type="text"
            value={cert.title}
            onChange={(e) => updateCertification(index, 'title', e.target.value)}
            className="input-field"
            placeholder="Certification Title"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={cert.issuer}
              onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
              className="input-field"
              placeholder="Issuing Organization"
            />
            <input
              type="text"
              value={cert.year}
              onChange={(e) => updateCertification(index, 'year', e.target.value)}
              className="input-field"
              placeholder="Year (e.g., 2023)"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// Languages Section
const LanguagesSection = ({ resume, updateResume }) => {
  const addLanguage = () => {
    const newLanguage = { name: '', progress: 80 };
    updateResume('languages', [...(resume.languages || []), newLanguage]);
  };

  const updateLanguage = (index, field, value) => {
    const updated = [...resume.languages];
    updated[index][field] = value;
    updateResume('languages', updated);
  };

  const removeLanguage = (index) => {
    const updated = resume.languages.filter((_, i) => i !== index);
    updateResume('languages', updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Languages</h3>
        <button onClick={addLanguage} className="btn-primary text-sm">
          Add Language
        </button>
      </div>
      {resume.languages?.map((lang, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center gap-3">
            <input
              type="text"
              value={lang.name}
              onChange={(e) => updateLanguage(index, 'name', e.target.value)}
              className="input-field flex-1"
              placeholder="Language Name (e.g., English)"
            />
            <button
              onClick={() => removeLanguage(index)}
              className="text-red-600 hover:text-red-700 text-sm whitespace-nowrap"
            >
              Remove
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Proficiency: {lang.progress}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={lang.progress}
              onChange={(e) => updateLanguage(index, 'progress', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// Theme Section
const ThemeSection = ({ resume, updateResume }) => {
  const themes = ['Classic Blue', 'ATS Clean', 'Modern Navy', 'Minimal Grey', 'Accent Orange', 'Academic Grey', 'Tech Serif'];
  const colors = [
    ['#1e40af', '#3b82f6', '#60a5fa'],
    ['#0f172a', '#334155', '#64748b'],
    ['#059669', '#10b981', '#34d399'],
    ['#dc2626', '#ef4444', '#f87171'],
    ['#ea580c', '#f97316', '#fb923c'],
    
  ];

  const handleThemeChange = (theme) => {
    updateResume('template', {
      ...resume.template,
      theme: theme,
    });
  };

  const handleColorChange = (colorPalette) => {
    updateResume('template', {
      ...resume.template,
      colorPalette: colorPalette,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Select Template</h3>
        <div className="grid grid-cols-3 gap-4">
          {themes.map((theme) => (
            <button
              key={theme}
              onClick={() => handleThemeChange(theme)}
              className={`p-4 border-2 rounded-lg transition-all ${
                resume.template?.theme === theme
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="aspect-[3/4] bg-gray-100 rounded mb-2 flex items-center justify-center">
                <span className="text-xs text-gray-500">{theme}</span>
              </div>
              <p className="text-sm font-medium text-center">{theme}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Color Palette</h3>
        <div className="grid grid-cols-5 gap-4">
          {colors.map((palette, index) => (
            <button
              key={index}
              onClick={() => handleColorChange(palette)}
              className={`p-3 border-2 rounded-lg transition-all ${
                JSON.stringify(resume.template?.colorPalette) === JSON.stringify(palette)
                  ? 'border-primary-600'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex space-x-1">
                {palette.map((color, i) => (
                  <div
                    key={i}
                    className="flex-1 h-12 rounded"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
