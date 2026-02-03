const FaangPathTemplate = ({ resume }) => {
  return (
    <div className="bg-white rounded-lg shadow-2xl p-8 min-h-[1000px]" style={{ color: '#111' }}>
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold tracking-wide">{resume.profileInfo?.fullName || 'FIRSTNAME LASTNAME'}</h1>
        <p className="text-xs text-gray-600">
          {resume.contactInfo?.phone || '+1(123) 456-7890'} • {resume.contactInfo?.location || 'San Francisco, CA'}
        </p>
        <p className="text-xs text-blue-700">
          {resume.contactInfo?.email || 'contact@email.com'} • {resume.contactInfo?.linkedIn || 'linkedin.com/company/example'} • {resume.contactInfo?.website || 'www.example.com'}
        </p>
      </div>

      {/* Objective */}
      {resume.profileInfo?.summary && (
        <div className="mb-4">
          <h2 className="text-sm font-bold border-b pb-1 mb-2">OBJECTIVE</h2>
          <p className="text-xs text-gray-700">{resume.profileInfo.summary}</p>
        </div>
      )}

      {/* Education */}
      {resume.education?.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold border-b pb-1 mb-2">EDUCATION</h2>
          <div className="space-y-2 text-xs">
            {resume.education.map((edu, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <span className="font-semibold">{edu.degree}</span>, {edu.institution}
                </div>
                <span className="text-gray-500">{edu.startDate} - {edu.endDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.skills?.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold border-b pb-1 mb-2">SKILLS</h2>
          <p className="text-xs text-gray-700">
            {resume.skills.map((skill) => skill.name).join(', ')}
          </p>
        </div>
      )}

      {/* Experience */}
      {resume.workExperience?.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold border-b pb-1 mb-2">EXPERIENCE</h2>
          <div className="space-y-3 text-xs">
            {resume.workExperience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <span className="font-semibold">{exp.role}</span>
                  <span className="text-gray-500">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="flex justify-between text-gray-600 italic">
                  <span>{exp.company}</span>
                  <span>{resume.contactInfo?.location || ''}</span>
                </div>
                {exp.description && (
                  <ul className="list-disc ml-4 mt-1 text-gray-700">
                    {exp.description.split('\n').map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resume.projects?.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold border-b pb-1 mb-2">PROJECTS</h2>
          <div className="space-y-2 text-xs">
            {resume.projects.map((project, index) => (
              <div key={index}>
                <span className="font-semibold">{project.title}. </span>
                <span className="text-gray-700">{project.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Extra-Curricular */}
      {resume.interests?.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-bold border-b pb-1 mb-2">EXTRA-CURRICULAR ACTIVITIES</h2>
          <ul className="list-disc ml-4 text-xs text-gray-700">
            {resume.interests.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Leadership */}
      {resume.certifications?.length > 0 && (
        <div>
          <h2 className="text-sm font-bold border-b pb-1 mb-2">LEADERSHIP</h2>
          <ul className="list-disc ml-4 text-xs text-gray-700">
            {resume.certifications.map((cert, index) => (
              <li key={index}>{cert.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FaangPathTemplate;
