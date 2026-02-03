// Harshibar Template - Minimal, clean design with light-grey accents
const HarshibarTemplate = ({ resume }) => {
  return (
    <div className="bg-white rounded-lg shadow-2xl p-12 min-h-[1000px]" style={{ color: '#1a1a1a' }}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-2" style={{ color: '#1a1a1a' }}>
          {resume.profileInfo?.fullName || 'Your Name'}
        </h1>
        
        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-2 text-sm mt-4" style={{ color: '#4d4d4d' }}>
          {resume.contactInfo?.phone && (
            <span>📞 {resume.contactInfo.phone}</span>
          )}
          {resume.contactInfo?.email && (
            <>
              <span>|</span>
              <span>✉️ {resume.contactInfo.email}</span>
            </>
          )}
          {resume.contactInfo?.website && (
            <>
              <span>|</span>
              <a href={resume.contactInfo.website} className="hover:underline">
                🌐 {resume.contactInfo.website}
              </a>
            </>
          )}
          {resume.contactInfo?.location && (
            <>
              <span>|</span>
              <span>📍 {resume.contactInfo.location}</span>
            </>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-b-2 mb-8" style={{ borderColor: '#d4d4d4' }}></div>

      {/* Professional Summary */}
      {resume.profileInfo?.summary && (
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed text-sm">
            {resume.profileInfo.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {resume.workExperience && resume.workExperience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 pb-2" style={{ borderBottom: '2px solid #d4d4d4', color: '#1a1a1a' }}>
            EXPERIENCE
          </h2>
          <div className="space-y-6">
            {resume.workExperience.map((exp, index) => (
              <div key={index}>
                {/* Company and dates */}
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900">{exp.company}</h3>
                  <span className="text-sm" style={{ color: '#666666' }}>
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                
                {/* Job title in italics */}
                <p className="italic text-sm text-gray-700 mb-2">{exp.role}</p>
                
                {/* Description as bullet points */}
                <p className="text-sm text-gray-700 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resume.projects && resume.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 pb-2" style={{ borderBottom: '2px solid #d4d4d4', color: '#1a1a1a' }}>
            PROJECTS
          </h2>
          <div className="space-y-4">
            {resume.projects.map((project, index) => (
              <div key={index}>
                <h3 className="font-bold text-gray-900">{project.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-2">
                  {project.description}
                </p>
                {(project.github || project.liveDemo) && (
                  <div className="flex gap-3 text-sm">
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
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 pb-2" style={{ borderBottom: '2px solid #d4d4d4', color: '#1a1a1a' }}>
            EDUCATION
          </h2>
          <div className="space-y-3">
            {resume.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900">{edu.institution}</h3>
                  <span className="text-sm" style={{ color: '#666666' }}>
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p className="italic text-sm text-gray-700">{edu.degree}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 pb-2" style={{ borderBottom: '2px solid #d4d4d4', color: '#1a1a1a' }}>
            SKILLS
          </h2>
          <div className="text-sm text-gray-700">
            {/* Group skills by category or just list them */}
            <div className="space-y-2">
              {resume.skills.map((skill, index) => (
                <span key={index} className="inline-block mr-3 mb-2">
                  {skill.name}
                  {index < resume.skills.length - 1 && ','}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Languages */}
      {resume.languages && resume.languages.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 pb-2" style={{ borderBottom: '2px solid #d4d4d4', color: '#1a1a1a' }}>
            LANGUAGES
          </h2>
          <div className="text-sm text-gray-700">
            <div className="space-y-1">
              {resume.languages.map((lang, index) => (
                <span key={index} className="block">
                  {lang.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Certifications */}
      {resume.certifications && resume.certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 pb-2" style={{ borderBottom: '2px solid #d4d4d4', color: '#1a1a1a' }}>
            CERTIFICATIONS
          </h2>
          <div className="space-y-2 text-sm">
            {resume.certifications.map((cert, index) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-900">{cert.title}</h3>
                <p className="text-gray-700">{cert.issuer} • {cert.year}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HarshibarTemplate;
