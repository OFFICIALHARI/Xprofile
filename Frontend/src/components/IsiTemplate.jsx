const IsiTemplate = ({ resume }) => {
  const educationRows = resume.education || [];

  return (
    <div className="bg-white rounded-lg shadow-2xl p-8 min-h-[1000px]" style={{ color: '#2b2b2b' }}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-xl font-bold">{resume.profileInfo?.fullName || 'Your Name'}</h1>
          <p className="text-sm text-gray-700">{resume.profileInfo?.designation || 'Your Designation'}</p>
          <p className="text-xs text-gray-500">{resume.contactInfo?.location || ''}</p>
        </div>
        <div className="text-xs text-gray-600 text-right">
          {resume.contactInfo?.phone && <div>Mob. {resume.contactInfo.phone}</div>}
          {resume.contactInfo?.email && <div>{resume.contactInfo.email}</div>}
        </div>
      </div>

      {/* Education Table */}
      {educationRows.length > 0 && (
        <div className="mb-5">
          <div className="bg-gray-200 text-xs font-bold text-center py-1 mb-2">EDUCATION</div>
          <table className="w-full text-xs border-t border-b">
            <thead>
              <tr className="text-left">
                <th className="py-1">Course</th>
                <th className="py-1">College/University</th>
                <th className="py-1">Year</th>
                <th className="py-1">CGPA/%</th>
              </tr>
            </thead>
            <tbody>
              {educationRows.map((edu, index) => (
                <tr key={index} className="border-t">
                  <td className="py-1">{edu.degree}</td>
                  <td className="py-1">{edu.institution}</td>
                  <td className="py-1">{edu.startDate} - {edu.endDate}</td>
                  <td className="py-1">-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Work Experience */}
      {resume.workExperience?.length > 0 && (
        <div className="mb-5">
          <div className="bg-gray-200 text-xs font-bold text-center py-1 mb-2">WORK EXPERIENCE</div>
          <div className="space-y-2 text-xs">
            {resume.workExperience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <span className="font-semibold">{exp.role} | {exp.company}</span>
                  <span className="text-gray-500">[{exp.startDate}-{exp.endDate}]</span>
                </div>
                {exp.description && <p className="text-gray-600">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills & Interests */}
      {(resume.skills?.length > 0 || resume.interests?.length > 0) && (
        <div className="mb-5">
          <div className="bg-gray-200 text-xs font-bold text-center py-1 mb-2">SKILLS & INTERESTS</div>
          <div className="text-xs space-y-1">
            {resume.skills?.length > 0 && (
              <div>
                <span className="font-semibold">Programming Languages: </span>
                {resume.skills.map((skill) => skill.name).join(', ')}
              </div>
            )}
            {resume.interests?.length > 0 && (
              <div>
                <span className="font-semibold">Interests: </span>
                {resume.interests.join(', ')}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Projects */}
      {resume.projects?.length > 0 && (
        <div className="mb-5">
          <div className="bg-gray-200 text-xs font-bold text-center py-1 mb-2">PROJECTS</div>
          <div className="space-y-2 text-xs">
            {resume.projects.map((project, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <span className="font-semibold">{project.title}</span>
                  <span className="text-gray-500">[Apr'22-Jun'22]</span>
                </div>
                <p className="text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications as Achievements */}
      {resume.certifications?.length > 0 && (
        <div className="mb-5">
          <div className="bg-gray-200 text-xs font-bold text-center py-1 mb-2">SCHOLASTIC ACHIEVEMENTS</div>
          <ul className="list-disc ml-4 text-xs space-y-1">
            {resume.certifications.map((cert, index) => (
              <li key={index}>{cert.title}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Extracurricular */}
      {resume.interests?.length > 0 && (
        <div>
          <div className="bg-gray-200 text-xs font-bold text-center py-1 mb-2">EXTRACURRICULAR ACTIVITIES</div>
          <ul className="list-disc ml-4 text-xs space-y-1">
            {resume.interests.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IsiTemplate;
