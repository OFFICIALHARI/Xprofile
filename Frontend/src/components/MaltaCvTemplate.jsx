const MaltaCvTemplate = ({ resume }) => {
  const contactItems = [
    resume.contactInfo?.email && `✉️ ${resume.contactInfo.email}`,
    resume.contactInfo?.linkedIn && `in ${resume.contactInfo.linkedIn}`,
    resume.contactInfo?.github && ` ${resume.contactInfo.github}`,
    resume.contactInfo?.phone && `📞 ${resume.contactInfo.phone}`,
  ].filter(Boolean);

  return (
    <div className="bg-white rounded-lg shadow-2xl min-h-[1000px]" style={{ color: '#2b2b2b' }}>
      {/* Header */}
      <div className="p-8">
        <h1 className="text-3xl font-bold">{resume.profileInfo?.fullName || 'Your Name'}</h1>
        <p className="text-sm italic text-gray-600">{resume.profileInfo?.designation || 'Your Designation'}</p>
        {resume.profileInfo?.summary && (
          <p className="text-xs text-gray-600 mt-2 max-w-3xl">{resume.profileInfo.summary}</p>
        )}
      </div>

      {/* Contact Bar */}
      <div className="px-8 py-2 text-white text-xs" style={{ backgroundColor: '#e95d2a' }}>
        <div className="flex flex-wrap gap-3">
          {contactItems.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Skills */}
        {resume.skills?.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase text-orange-600 mb-2">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
              {resume.skills.map((skill, index) => (
                <span key={index} className="text-gray-700">{skill.name}</span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resume.education?.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase text-orange-600 mb-2">Education</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {resume.education.map((edu, index) => (
                <div key={index}>
                  <p className="font-semibold text-gray-900">{edu.degree}</p>
                  <p className="text-gray-700">{edu.institution}</p>
                  <p className="text-gray-500">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {resume.workExperience?.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase text-orange-600 mb-2">Experience</h2>
            <div className="space-y-3 text-xs">
              {resume.workExperience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">{exp.role}</span>
                    <span className="text-gray-500">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="text-gray-700">{exp.company}</p>
                  {exp.description && (
                    <p className="text-gray-600 mt-1">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resume.projects?.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase text-orange-600 mb-2">Other Activities & Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {resume.projects.map((project, index) => (
                <div key={index}>
                  <p className="font-semibold text-gray-900">{project.title}</p>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resume.certifications?.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase text-orange-600 mb-2">Awards</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {resume.certifications.map((cert, index) => (
                <div key={index}>
                  <p className="font-semibold text-gray-900">{cert.title}</p>
                  <p className="text-gray-600">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {resume.languages?.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase text-orange-600 mb-2">Languages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {resume.languages.map((lang, index) => (
                <div key={index}>
                  <p className="font-semibold text-gray-900">{lang.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaltaCvTemplate;
