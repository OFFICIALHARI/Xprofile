import { Link } from 'react-router-dom';
import { FileText, Eye, Download, Mail, Palette, Zap, Linkedin, Github, Heart, GitBranch } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background transition-colors">
      {/* Header */}
      <header className="bg-card shadow-sm sticky top-0 z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="Xprofile" className="w-8 h-8" />
            <span className="text-2xl font-bold text-foreground">Xprofile</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a 
              href="#contact" 
              className="text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              Contact Us
            </a>
            <Link 
              to="/register" 
              className="btn-primary"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Build Your Professional Resume
            <span className="block text-primary mt-2">In Minutes</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create stunning, ATS-friendly resumes with our intuitive builder. 
            Choose from professional templates, customize colors, and export to PDF instantly.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register" className="btn-primary text-lg px-8 py-3">
              Start Building Free
            </Link>
            <Link to="/login" className="btn-secondary text-lg px-8 py-3">
              Sign In
            </Link>
          </div>
        </div>

        {/* Hero Image Placeholder */}
        <div className="mt-16 rounded-xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-br from-primary/10 to-primary/20 h-96 flex items-center justify-center">
            <div className="text-center">
              <FileText className="w-24 h-24 text-primary mx-auto mb-4" />
              <p className="text-primary text-lg font-semibold">Preview of Xprofile</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-card py-20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything You Need to Stand Out
            </h2>
            <p className="text-xl text-muted-foreground">
              Powerful features to help you land your dream job
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Eye className="w-12 h-12 text-primary" />}
              title="Live Preview"
              description="See your resume update in real-time as you type. What you see is what you get."
            />
            <FeatureCard
              icon={<Palette className="w-12 h-12 text-primary" />}
              title="Multi-theme Support"
              description="Choose from professional templates and customize colors to match your style."
            />
            <FeatureCard
              icon={<Download className="w-12 h-12 text-primary" />}
              title="PDF Generation"
              description="Export your resume as a high-quality PDF ready for submission."
            />
            <FeatureCard
              icon={<Mail className="w-12 h-12 text-primary" />}
              title="Email Resume"
              description="Send your resume directly to recruiters with a professional email attachment."
            />
            <FeatureCard
              icon={<Zap className="w-12 h-12 text-primary" />}
              title="Fast & Easy"
              description="Build a complete resume in under 10 minutes with our intuitive interface."
            />
            <FeatureCard
              icon={<FileText className="w-12 h-12 text-primary" />}
              title="ATS Friendly"
              description="All templates are optimized to pass Applicant Tracking Systems."
            />
          </div>
        </div>
      </section>

      {/* About & Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* About Xprofile */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-foreground mb-6">Xprofile</h2>
            <p className="text-xl text-muted-foreground mb-4">
              A modern resume builder designed to help professionals create stunning, 
              ATS-friendly resumes in minutes.
            </p>
            <p className="text-xl text-muted-foreground">
              Built with cutting-edge technology to simplify your job search journey 
              and help you land your dream role.
            </p>
          </div>

          {/* Company Info */}
          <div className="bg-gradient-to-br from-muted to-secondary rounded-xl shadow-lg p-8 mb-8 border border-border">
            <p className="text-lg text-foreground text-center mb-8">
              This platform belongs to{' '}
              <span className="text-2xl font-bold text-foreground">HX Global Technologies</span>
            </p>

            {/* Founder Section */}
            <div className="border-t border-border pt-8">
              <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
                Connect with the Founder & CEO of HX Global Technologies
              </h3>

              <div className="flex flex-col gap-4 max-w-md mx-auto">
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/harikrishnan2006/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
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
                  <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
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
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
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
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <img src="/logo.png" alt="Xprofile" className="w-6 h-6" />
              <span className="text-xl font-bold">Xprofile</span>
            </div>
            <p className="text-primary-foreground/80 mb-4">
              Create professional resumes that get you hired.
            </p>
            <p className="text-primary-foreground/80">
              © {new Date().getFullYear()} <span className="font-bold">HX Global Technologies</span>. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 border border-border rounded-xl hover:shadow-lg transition-shadow bg-background">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const PricingFeature = ({ text }) => (
  <li className="flex items-center">
    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
    <span className="text-gray-700">{text}</span>
  </li>
);

export default LandingPage;
