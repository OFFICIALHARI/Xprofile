import { Link } from 'react-router-dom';
import { Mail, Github, Linkedin, Heart, GitBranch } from 'lucide-react';

const ContactUsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="Xprofile" className="w-8 h-8" />
            <span className="text-2xl font-bold text-gray-900">Xprofile</span>
          </div>
          <div className="flex gap-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium">
              Home
            </Link>
            <Link to="/login" className="btn-primary">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Platform Name */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Xprofile</h1>
          <p className="text-xl text-gray-700 mb-4">
            A modern resume builder designed to help professionals create stunning, 
            ATS-friendly resumes in minutes.
          </p>
          <p className="text-xl text-gray-700">
            Built with cutting-edge technology to simplify your job search journey 
            and help you land your dream role.
          </p>
        </div>

        {/* Company Info */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <p className="text-lg text-gray-700 text-center mb-8">
            This platform belongs to{' '}
            <span className="text-2xl font-bold text-gray-900">HX Global Technologies</span>
          </p>

          {/* Founder Section */}
          <div className="border-t pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Connect with the Founder & CEO of HX Global Technologies
            </h2>

            <div className="flex flex-col gap-4 max-w-md mx-auto">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/harikrishnan2006/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Linkedin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">LinkedIn</p>
                  <p className="text-blue-600 font-medium group-hover:underline">
                    linkedin.com/in/harikrishnan2006/
                  </p>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/officialhari"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
              >
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                  <Github className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">GitHub</p>
                  <p className="text-gray-900 font-medium group-hover:underline">
                    github.com/officialhari
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:officialharikrishnans@gmail.com"
                className="flex items-center gap-4 p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors group"
              >
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-red-600 font-medium group-hover:underline">
                    officialharikrishnans@gmail.com
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Contribution Section */}
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <GitBranch className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Want to Contribute?
              </h3>
              <p className="text-gray-700 mb-4">
                We welcome contributions from the community! If you'd like to help improve Xprofile,
                kindly visit our GitHub repository and make your contributions.
              </p>
              <a
                href="https://github.com/officialhari"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                <Github className="w-5 h-5" />
                Visit GitHub Repository
              </a>
            </div>
          </div>
        </div>

        {/* Help Others Section */}
        <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-xl shadow-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Help Others
          </h3>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            If you want to give something to me, kindly give it to the people who really want it.
            Help others and make a difference in their lives. Together, we can build a better community.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2026 <span className="font-bold">HX Global Technologies</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ContactUsPage;
