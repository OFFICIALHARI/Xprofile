import HarshibarTemplate from './HarshibarTemplate';
import MaltaCvTemplate from './MaltaCvTemplate';
import IsiTemplate from './IsiTemplate';
import FaangPathTemplate from './FaangPathTemplate';

const ResumePreview = ({ resume }) => {
  if (!resume) {
    return <div className="bg-white rounded-lg shadow-lg p-8">Loading...</div>;
  }

  const primaryColor = resume.template?.colorPalette?.[0] || '#1e40af';
  const secondaryColor = resume.template?.colorPalette?.[1] || '#3b82f6';
  const theme = resume.template?.theme || 'Classic Blue';

  // Render different templates based on theme
  if (theme === 'ATS Clean' || theme === 'ATS Friendly') {
    return <ATSFriendlyTemplate resume={resume} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
  }

  if (theme === 'Modern Navy' || theme === 'HR Friendly') {
    return <HRFriendlyTemplate resume={resume} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
  }

  if (theme === 'Minimal Grey' || theme === 'Harshibar') {
    return <HarshibarTemplate resume={resume} />;
  }

  if (theme === 'Accent Orange' || theme === 'MaltaCV') {
    return <MaltaCvTemplate resume={resume} />;
  }

  if (theme === 'Academic Grey' || theme === 'ISI') {
    return <IsiTemplate resume={resume} />;
  }

  if (theme === 'Tech Serif' || theme === 'FAANGPath') {
    return <FaangPathTemplate resume={resume} />;
  }

  // Default Template
  return (
    <div className="bg-white rounded-lg shadow-2xl p-8 min-h-[1000px]">
      {/* Header */}
      <div className="border-b-4 pb-6 mb-6" style={{ borderColor: primaryColor }}>
        <h1 className="text-4xl font-bold mb-2" style={{ color: primaryColor }}>
          {resume.profileInfo?.fullName || 'Your Name'}
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          {resume.profileInfo?.designation || 'Your Designation'}
        </p>
        
        {/* Contact Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {resume.contactInfo?.email && (
            <span>{resume.contactInfo.email}</span>
          )}
          {resume.contactInfo?.phone && (
            <span>{resume.contactInfo.phone}</span>
          )}
          {resume.contactInfo?.location && (
            <span>{resume.contactInfo.location}</span>
          )}
          {resume.contactInfo?.linkedIn && (
            <a href={resume.contactInfo.linkedIn} className="text-blue-600 hover:underline">
              LinkedIn
            </a>
          )}
          {resume.contactInfo?.github && (
            <a href={resume.contactInfo.github} className="text-blue-600 hover:underline">
              GitHub
            </a>
          )}
          {resume.contactInfo?.website && (
            <a href={resume.contactInfo.website} className="text-blue-600 hover:underline">
              Website
            </a>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {resume.profileInfo?.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3" style={{ color: primaryColor }}>
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {resume.profileInfo.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {resume.workExperience && resume.workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3" style={{ color: primaryColor }}>
            Work Experience
          </h2>
          <div className="space-y-4">
            {resume.workExperience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                  <span className="text-sm text-gray-600">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-gray-700 font-medium mb-2">{exp.company}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3" style={{ color: primaryColor }}>
            Education
          </h2>
          <div className="space-y-3">
            {resume.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <span className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p className="text-gray-700">{edu.institution}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3" style={{ color: primaryColor }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resume.projects && resume.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3" style={{ color: primaryColor }}>
            Projects
          </h2>
          <div className="space-y-4">
            {resume.projects.map((project, index) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-900 mb-1">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                <div className="flex gap-4 text-sm">
                  {project.github && (
                    <a href={project.github} className="text-blue-600 hover:underline">
                      GitHub
                    </a>
                  )}
                  {project.liveDemo && (
                    <a href={project.liveDemo} className="text-blue-600 hover:underline">
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {resume.certifications && resume.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3" style={{ color: primaryColor }}>
            Certifications
          </h2>
          <div className="space-y-2">
            {resume.certifications.map((cert, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{cert.title}</h3>
                  <p className="text-gray-600 text-sm">{cert.issuer}</p>
                </div>
                <span className="text-sm text-gray-600">{cert.year}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {resume.languages && resume.languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3" style={{ color: primaryColor }}>
            Languages
          </h2>
          <div className="space-y-3">
            {resume.languages.map((lang, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-900">{lang.name}</span>
                  <span className="text-sm text-gray-600">{lang.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${lang.progress}%`,
                      backgroundColor: secondaryColor,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ATS Friendly Template - Simple, clean, no colors for ATS parsing
const ATSFriendlyTemplate = ({ resume }) => {
  return (
    <div className="bg-white rounded-lg shadow-2xl p-8 min-h-[1000px]">
      {/* Header - Simple text only */}
      <div className="text-center border-b-2 border-black pb-4 mb-6">
        <h1 className="text-3xl font-bold text-black mb-1">
          {resume.profileInfo?.fullName || 'YOUR NAME'}
        </h1>
        <p className="text-base text-black mb-2">
          {resume.profileInfo?.designation || 'Your Designation'}
        </p>
        <div className="text-sm text-black space-x-2">
          {resume.contactInfo?.email && <span>{resume.contactInfo.email}</span>}
          {resume.contactInfo?.phone && <span>| {resume.contactInfo.phone}</span>}
          {resume.contactInfo?.location && <span>| {resume.contactInfo.location}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {resume.profileInfo?.summary && (
        <div className="mb-5">
          <h2 className="text-lg font-bold text-black mb-2 uppercase border-b border-black">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-black text-sm leading-relaxed">
            {resume.profileInfo.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {resume.workExperience && resume.workExperience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg font-bold text-black mb-2 uppercase border-b border-black">
            WORK EXPERIENCE
          </h2>
          <div className="space-y-3">
            {resume.workExperience.map((exp, index) => (
              <div key={index}>
                <div className="mb-1">
                  <h3 className="font-bold text-black">{exp.role}</h3>
                  <p className="text-black text-sm">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                </div>
                <p className="text-black text-sm leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg font-bold text-black mb-2 uppercase border-b border-black">
            EDUCATION
          </h2>
          <div className="space-y-2">
            {resume.education.map((edu, index) => (
              <div key={index}>
                <h3 className="font-bold text-black">{edu.degree}</h3>
                <p className="text-black text-sm">{edu.institution} | {edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg font-bold text-black mb-2 uppercase border-b border-black">
            SKILLS
          </h2>
          <p className="text-black text-sm">
            {resume.skills.map(skill => skill.name).join(', ')}
          </p>
        </div>
      )}

      {/* Projects */}
      {resume.projects && resume.projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg font-bold text-black mb-2 uppercase border-b border-black">
            PROJECTS
          </h2>
          <div className="space-y-2">
            {resume.projects.map((project, index) => (
              <div key={index}>
                <h3 className="font-bold text-black">{project.title}</h3>
                <p className="text-black text-sm">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {resume.certifications && resume.certifications.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg font-bold text-black mb-2 uppercase border-b border-black">
            CERTIFICATIONS
          </h2>
          <div className="space-y-1">
            {resume.certifications.map((cert, index) => (
              <div key={index}>
                <p className="text-black text-sm"><span className="font-semibold">{cert.title}</span> - {cert.issuer} ({cert.year})</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {resume.languages && resume.languages.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg font-bold text-black mb-2 uppercase border-b border-black">
            LANGUAGES
          </h2>
          <p className="text-black text-sm">
            {resume.languages.map(lang => lang.name).join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

// HR Friendly Template - Colorful and visually appealing
const HRFriendlyTemplate = ({ resume, primaryColor, secondaryColor }) => {
  return (
    <div className="bg-white rounded-lg shadow-2xl overflow-hidden min-h-[1000px]">
      {/* Header with colored background */}
      <div className="p-8 text-white" style={{ backgroundColor: primaryColor }}>
        <h1 className="text-4xl font-bold mb-2">
          {resume.profileInfo?.fullName || 'Your Name'}
        </h1>
        <p className="text-xl mb-4 opacity-90">
          {resume.profileInfo?.designation || 'Your Designation'}
        </p>
        <div className="flex flex-wrap gap-3 text-sm opacity-90">
          {resume.contactInfo?.email && <span>📧 {resume.contactInfo.email}</span>}
          {resume.contactInfo?.phone && <span>📱 {resume.contactInfo.phone}</span>}
          {resume.contactInfo?.location && <span>📍 {resume.contactInfo.location}</span>}
        </div>
      </div>

      <div className="p-8">
        {/* Professional Summary */}
        {resume.profileInfo?.summary && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <div className="w-1 h-6 mr-3" style={{ backgroundColor: primaryColor }}></div>
              <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>
                About Me
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed pl-4">
              {resume.profileInfo.summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {resume.workExperience && resume.workExperience.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <div className="w-1 h-6 mr-3" style={{ backgroundColor: primaryColor }}></div>
              <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>
                Work Experience
              </h2>
            </div>
            <div className="space-y-4 pl-4">
              {resume.workExperience.map((exp, index) => (
                <div key={index} className="relative pl-6 border-l-2" style={{ borderColor: secondaryColor }}>
                  <div className="absolute w-3 h-3 rounded-full -left-[7px] top-1" style={{ backgroundColor: secondaryColor }}></div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900 text-lg">{exp.role}</h3>
                    <span className="text-sm px-2 py-1 rounded" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <p className="text-gray-700 font-semibold mb-2">{exp.company}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resume.education && resume.education.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <div className="w-1 h-6 mr-3" style={{ backgroundColor: primaryColor }}></div>
              <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>
                Education
              </h2>
            </div>
            <div className="space-y-3 pl-4">
              {resume.education.map((edu, index) => (
                <div key={index} className="p-3 rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <span className="text-sm text-gray-600">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <p className="text-gray-700">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {resume.skills && resume.skills.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <div className="w-1 h-6 mr-3" style={{ backgroundColor: primaryColor }}></div>
              <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>
                Skills
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 pl-4">
              {resume.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ backgroundColor: `${primaryColor}10`, color: primaryColor }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resume.projects && resume.projects.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <div className="w-1 h-6 mr-3" style={{ backgroundColor: primaryColor }}></div>
              <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>
                Projects
              </h2>
            </div>
            <div className="space-y-3 pl-4">
              {resume.projects.map((project, index) => (
                <div key={index} className="border-l-4 pl-3" style={{ borderColor: secondaryColor }}>
                  <h3 className="font-bold text-gray-900 mb-1">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                  <div className="flex gap-3 text-sm">
                    {project.github && (
                      <a href={project.github} className="hover:underline" style={{ color: primaryColor }}>
                        🔗 GitHub
                      </a>
                    )}
                    {project.liveDemo && (
                      <a href={project.liveDemo} className="hover:underline" style={{ color: primaryColor }}>
                        🌐 Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resume.certifications && resume.certifications.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <div className="w-1 h-6 mr-3" style={{ backgroundColor: primaryColor }}></div>
              <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>
                Certifications
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-2 pl-4">
              {resume.certifications.map((cert, index) => (
                <div key={index} className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: `${primaryColor}08` }}>
                  <div>
                    <h3 className="font-semibold text-gray-900">{cert.title}</h3>
                    <p className="text-gray-600 text-sm">{cert.issuer}</p>
                  </div>
                  <span className="text-sm font-semibold" style={{ color: primaryColor }}>{cert.year}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {resume.languages && resume.languages.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <div className="w-1 h-6 mr-3" style={{ backgroundColor: primaryColor }}></div>
              <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>
                Languages
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 pl-4">
              {resume.languages.map((lang, index) => (
                <div key={index} className="px-4 py-2 rounded-full text-white font-medium" style={{ backgroundColor: secondaryColor }}>
                  {lang.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
