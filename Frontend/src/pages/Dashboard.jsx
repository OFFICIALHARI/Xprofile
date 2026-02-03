import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, LogOut, User, Crown, Loader, Eye, Edit, Trash2, Layout, Mail, Linkedin, Github, Heart, GitBranch } from 'lucide-react';
import { authAPI, resumeAPI } from '../utils/api';
import ResumePreview from '../components/ResumePreview';
import CustomModal from '../components/CustomModal';
import ThemeToggle from '../components/ThemeToggle';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewResumeModal, setShowNewResumeModal] = useState(false);
  const [newResumeTitle, setNewResumeTitle] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('Classic Blue');
  const [activeTab, setActiveTab] = useState('my-resumes');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [modalState, setModalState] = useState({ show: false, type: 'info', title: '', message: '', onConfirm: null, onCancel: null });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', profileImageUrl: '' });
  const [uploadingProfileImage, setUploadingProfileImage] = useState(false);

  const sampleResume = {
    title: 'Sample Resume',
    template: { theme: 'Classic Blue', colorPalette: ['#1e40af', '#3b82f6'] },
    profileInfo: {
      fullName: 'Your Name',
      designation: 'Your Designation',
      summary: 'Brief summary about yourself.',
    },
    contactInfo: {
      email: 'you@email.com',
      phone: '+1 234 567 890',
      location: 'City, Country',
      linkedIn: 'linkedin.com/in/you',
      github: 'github.com/you',
      website: 'yourwebsite.com',
    },
    workExperience: [
      {
        company: 'Company Name',
        role: 'Role Title',
        startDate: 'Jan 2022',
        endDate: 'Present',
        description: 'Key achievement or responsibility.',
      },
    ],
    education: [
      {
        degree: 'B.Sc. in Computer Science',
        institution: 'University Name',
        startDate: '2018',
        endDate: '2022',
      },
    ],
    skills: [
      { name: 'JavaScript' },
      { name: 'React' },
      { name: 'Node.js' },
    ],
    projects: [
      {
        title: 'Project Title',
        description: 'Short project description.',
        github: 'github.com/you/project',
      },
    ],
    certifications: [
      { title: 'Certification Name', issuer: 'Issuer', year: '2023' },
    ],
    languages: [
      { name: 'English' },
    ],
    interests: ['Open Source', 'UI Design'],
  };

  useEffect(() => {
    fetchUserData();
    fetchResumes();
    
    // Refetch user data when page becomes visible (e.g., after payment)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchUserData();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        profileImageUrl: user.profileImageUrl || '',
      });
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const response = await authAPI.getProfile();
      console.log('User data response:', response.data);
      // Backend returns user data directly, not wrapped in a 'user' field
      setUser(response.data);
    } catch (err) {
      console.error('Failed to fetch user data', err);
      // Set user from localStorage as fallback
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          console.log('Using stored user:', parsedUser);
          setUser(parsedUser);
        } catch (parseErr) {
          console.error('Failed to parse stored user', parseErr);
        }
      }
    }
  };

  const fetchResumes = async () => {
    try {
      const response = await resumeAPI.getUserResumes();
      setResumes(response.data);
    } catch (err) {
      console.error('Failed to fetch resumes', err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateResumeModal = (template = 'Classic Blue') => {
    setSelectedTemplate(template);
    setShowNewResumeModal(true);
  };

  const handleCreateResume = async () => {
    if (!newResumeTitle.trim()) {
      setModalState({
        show: true,
        type: 'warning',
        title: 'Missing Title',
        message: 'Please enter a resume title to continue.',
        onConfirm: () => setModalState({ ...modalState, show: false })
      });
      return;
    }

    try {
      const response = await resumeAPI.createResume({
        title: newResumeTitle,
        templateTheme: selectedTemplate,
      });
      setShowNewResumeModal(false);
      setNewResumeTitle('');
      setSelectedTemplate('Classic Blue');
      navigate(`/builder/${response.data._id}`);
    } catch (err) {
      setModalState({
        show: true,
        type: 'error',
        title: 'Creation Failed',
        message: 'Failed to create resume. Please try again.',
        onConfirm: () => setModalState({ ...modalState, show: false })
      });
    }
  };

  const handleDeleteResume = async (resumeId, resumeTitle) => {
    setModalState({
      show: true,
      type: 'confirm',
      title: 'Delete Resume',
      message: `Are you sure you want to delete "${resumeTitle}"? This action cannot be undone.`,
      onConfirm: async () => {
        setModalState({ ...modalState, show: false });
        try {
          await resumeAPI.deleteResume(resumeId);
          setResumes(resumes.filter(resume => resume._id !== resumeId));
        } catch (err) {
          console.error('Failed to delete resume', err);
          setModalState({
            show: true,
            type: 'error',
            title: 'Deletion Failed',
            message: 'Failed to delete resume. Please try again.',
            onConfirm: () => setModalState({ ...modalState, show: false })
          });
        }
      },
      onCancel: () => setModalState({ ...modalState, show: false })
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleProfileImageUpload = async (file) => {
    if (!file) return;
    setUploadingProfileImage(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const response = await authAPI.uploadImage(formData);
      console.log('Upload response:', response.data);
      setProfileForm((prev) => ({ ...prev, profileImageUrl: response.data.imageUrl }));
    } catch (err) {
      console.error('Upload error:', err);
      setModalState({
        show: true,
        type: 'error',
        title: 'Upload Failed',
        message: err.response?.data?.message || 'Failed to upload image. Please try again.',
        onConfirm: () => setModalState({ ...modalState, show: false })
      });
    } finally {
      setUploadingProfileImage(false);
    }
  };

  const handleProfileSave = async () => {
    if (!profileForm.name.trim()) {
      setModalState({
        show: true,
        type: 'warning',
        title: 'Name Required',
        message: 'Please enter a name.',
        onConfirm: () => setModalState({ ...modalState, show: false })
      });
      return;
    }
    try {
      const response = await authAPI.updateProfile({
        name: profileForm.name,
        profileImageUrl: profileForm.profileImageUrl,
      });
      console.log('Update response:', response.data);
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      setIsEditingProfile(false);
    } catch (err) {
      console.error('Update error:', err);
      setModalState({
        show: true,
        type: 'error',
        title: 'Update Failed',
        message: err.response?.data?.message || 'Failed to update profile. Please try again.',
        onConfirm: () => setModalState({ ...modalState, show: false })
      });
    }
  };

  const isPremium = user?.subscriptionPlan === 'Premium';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm sticky top-0 z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="Xprofile" className="w-8 h-8" />
              <span className="text-2xl font-bold text-foreground">Xprofile</span>
            </div>

            {/* Navigation Tabs */}
            <nav className="hidden md:flex items-center space-x-1">
              <button
                onClick={() => setActiveTab('my-resumes')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'my-resumes'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                My Resumes
              </button>
              <button
                onClick={() => setActiveTab('templates')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'templates'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Layout className="w-4 h-4 inline mr-2" />
                Templates
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'contact'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Contact Us
              </button>
              {!isPremium && (
                <button
                  onClick={() => navigate('/upgrade')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'premium'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Crown className="w-4 h-4 inline mr-2" />
                  Get Premium
                </button>
              )}
            </nav>

            {/* Right Section: Theme Toggle & User Profile */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              
              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-colors"
                >
                {user?.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                )}
                <span className="hidden md:block font-medium text-foreground">{user?.name}</span>
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-card rounded-lg shadow-xl border border-border py-2 z-50">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-semibold text-foreground">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                    {isPremium && (
                      <div className="mt-2 inline-flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs px-2 py-1 rounded">
                        <Crown className="w-3 h-3" />
                        <span>Premium</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('profile');
                      setShowProfileDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile Details</span>
                  </button>
                  {!isPremium && (
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        navigate('/upgrade');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <Crown className="w-4 h-4" />
                      <span>Upgrade to Premium</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* My Resumes Tab */}
        {activeTab === 'my-resumes' && (
          <>
            {/* Resumes Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-foreground">My Resumes</h3>
                <button
                  onClick={() => openCreateResumeModal()}
                  className="flex items-center space-x-2 btn-primary"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create New Resume</span>
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader className="w-8 h-8 animate-spin text-primary-600" />
                </div>
              ) : resumes.length === 0 ? (
                <div className="bg-card rounded-xl shadow-sm p-12 text-center border border-border">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-foreground mb-2">No resumes yet</h4>
                  <p className="text-muted-foreground mb-6">Create your first resume to get started</p>
                  <button
                    onClick={() => openCreateResumeModal()}
                    className="btn-primary"
                  >
                    Create Resume
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {resumes.map((resume) => (
                    <ResumeCard
                      key={resume._id}
                      resume={resume}
                      onEdit={() => navigate(`/builder/${resume._id}`)}
                      onDelete={() => handleDeleteResume(resume._id, resume.title)}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-8">Choose Templates</h3>
            
            {/* Basic Templates Section */}
            <div className="mb-12">
              <h4 className="text-lg font-semibold text-foreground mb-4">Basic Templates</h4>
              <div className="grid md:grid-cols-4 gap-4">
                {['Classic Blue', 'ATS Clean', 'Minimal Grey', 'Tech Serif'].map((template, idx) => (
                  <div key={idx} className="bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-border">
                    <div className="aspect-[4/3] bg-muted rounded-t-lg overflow-hidden">
                      <div className="origin-top-left scale-[0.25] w-[400%] h-[400%]">
                        <ResumePreview resume={{ ...sampleResume, template: { ...sampleResume.template, theme: template } }} />
                      </div>
                    </div>
                    <div className="p-4">
                      <h5 className="font-semibold text-foreground mb-1">{template}</h5>
                      <p className="text-xs text-muted-foreground mb-3">Professional template for your resume</p>
                      <button
                        onClick={() => openCreateResumeModal(template)}
                        className="w-full btn-primary text-sm py-2"
                      >
                        Use Template
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Templates Section */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <h4 className="text-lg font-semibold text-foreground">Premium Templates</h4>
                <span className="inline-flex items-center space-x-1 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                  <Crown className="w-3 h-3" />
                  <span>Premium</span>
                </span>
              </div>
              <div className="grid md:grid-cols-4 gap-4">
                {['Modern Navy', 'Accent Orange', 'Academic Grey'].map((template, idx) => (
                  <div key={idx} className="relative bg-card rounded-lg shadow-sm overflow-hidden group border border-border">
                    <div className={`aspect-[4/3] bg-muted rounded-t-lg overflow-hidden ${!isPremium ? 'blur-sm' : ''}`}>
                      <div className="origin-top-left scale-[0.25] w-[400%] h-[400%]">
                        <ResumePreview resume={{ ...sampleResume, template: { ...sampleResume.template, theme: template } }} />
                      </div>
                    </div>
                    <div className="p-4">
                      <h5 className="font-semibold text-foreground mb-1">{template}</h5>
                      <p className="text-xs text-muted-foreground mb-3">Professional template for your resume</p>
                      {isPremium ? (
                        <button
                          onClick={() => openCreateResumeModal(template)}
                          className="w-full btn-primary text-sm py-2"
                        >
                          Use Template
                        </button>
                      ) : (
                        <button
                          onClick={() => navigate('/upgrade')}
                          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold text-sm py-2 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all"
                        >
                          Unlock Premium
                        </button>
                      )}
                    </div>
                    
                    {/* Hover Overlay for non-premium users */}
                    {!isPremium && (
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="bg-card text-center px-4 py-3 rounded-lg shadow-lg border border-border">
                          <Crown className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                          <p className="text-sm font-semibold text-foreground">Unlock Premium</p>
                          <p className="text-xs text-muted-foreground">to use this template</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact Us Tab */}
        {activeTab === 'contact' && (
          <div className="mb-8">
            <div className="max-w-4xl mx-auto">
              {/* About Xprofile */}
              <div className="text-center mb-12">
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
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl shadow-lg p-8 mb-8 border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <GitBranch className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Want to Contribute?
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      We welcome contributions from the community! If you'd like to help improve Xprofile,
                      kindly visit our GitHub repository and make your contributions.
                    </p>
                    <a
                      href="https://github.com/officialhari"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium"
                    >
                      <Github className="w-5 h-5" />
                      Visit GitHub Repository
                    </a>
                  </div>
                </div>
              </div>

              {/* Help Others Section */}
              <div className="bg-gradient-to-r from-destructive/10 to-destructive/20 rounded-xl shadow-lg p-8 text-center border border-border">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-destructive rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-destructive-foreground" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Help Others
                </h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  If you want to give something to me, kindly give it to the people who really want it.
                  Help others and make a difference in their lives. Together, we can build a better community.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">Profile Details</h3>
            {!user ? (
              <div className="bg-card rounded-xl shadow-sm p-8 max-w-2xl border border-border">
                <p className="text-muted-foreground">Loading profile...</p>
              </div>
            ) : (
              <div className="bg-card rounded-xl shadow-sm p-8 max-w-2xl border border-border">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="relative">
                    {profileForm.profileImageUrl ? (
                      <img
                        src={profileForm.profileImageUrl}
                        alt={profileForm.name || 'User'}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-12 h-12 text-primary" />
                      </div>
                    )}
                    {isEditingProfile && (
                      <label className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs bg-card border border-border rounded-full px-2 py-1 cursor-pointer shadow">
                        {uploadingProfileImage ? 'Uploading...' : 'Change'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleProfileImageUpload(e.target.files?.[0])}
                          disabled={uploadingProfileImage}
                        />
                      </label>
                    )}
                  </div>
                  <div>
                    {isEditingProfile ? (
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm((prev) => ({ ...prev, name: e.target.value }))}
                        className="input-field max-w-xs"
                        placeholder="Your Name"
                      />
                    ) : (
                      <h2 className="text-2xl font-bold text-foreground">{user.name || 'User'}</h2>
                    )}
                    <p className="text-muted-foreground">{user.email || 'No email'}</p>
                    {isPremium && (
                      <div className="mt-2 inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-lg">
                        <Crown className="w-4 h-4" />
                        <span className="font-semibold">Premium Member</span>
                      </div>
                    )}
                  </div>
                  <div className="ml-auto">
                    {isEditingProfile ? (
                      <div className="flex gap-2">
                        <button onClick={handleProfileSave} className="btn-primary text-sm">
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setIsEditingProfile(false);
                            setProfileForm({
                              name: user?.name || '',
                              profileImageUrl: user?.profileImageUrl || '',
                            });
                          }}
                          className="btn-secondary text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setIsEditingProfile(true)}
                        className="btn-secondary text-sm"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>
                <div className="border-t border-border pt-6">
                  <h4 className="font-semibold text-foreground mb-4">Account Information</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-muted-foreground">Full Name:</span>
                      <p className="text-foreground font-medium">{user.name || 'Not available'}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Email:</span>
                      <p className="text-foreground font-medium">{user.email || 'Not available'}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Subscription Plan:</span>
                      <p className="text-foreground font-medium">{user.subscriptionPlan || 'Basic'}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Email Verified:</span>
                      <p className="text-foreground font-medium">{user.emailVerified ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                  {!isPremium && (
                    <button
                      onClick={() => navigate('/upgrade')}
                      className="mt-6 w-full btn-primary flex items-center justify-center space-x-2"
                    >
                      <Crown className="w-5 h-5" />
                      <span>Upgrade to Premium</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* New Resume Modal */}
      {showNewResumeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Create New Resume</h3>
            <p className="text-sm text-gray-600 mb-4">
              Selected Template: <span className="font-semibold text-gray-900">{selectedTemplate}</span>
            </p>
            <input
              type="text"
              value={newResumeTitle}
              onChange={(e) => setNewResumeTitle(e.target.value)}
              placeholder="Enter resume title (e.g., Software Engineer Resume)"
              className="input-field mb-6"
              onKeyPress={(e) => e.key === 'Enter' && handleCreateResume()}
            />
            <div className="flex gap-4">
              <button
                onClick={handleCreateResume}
                className="flex-1 btn-primary"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowNewResumeModal(false);
                  setNewResumeTitle('');
                  setSelectedTemplate('Classic Blue');
                }}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Modal */}
      {modalState.show && (
        <CustomModal
          type={modalState.type}
          title={modalState.title}
          message={modalState.message}
          onConfirm={modalState.onConfirm}
          onCancel={modalState.onCancel}
        />
      )}
    </div>
  );
};

const ResumeCard = ({ resume, onEdit, onDelete }) => {
  const primaryColor = resume.template?.colorPalette?.[0] || '#1e40af';
  const secondaryColor = resume.template?.colorPalette?.[1] || '#3b82f6';

  return (
    <div className="bg-card rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group border border-border">
      <div className="aspect-[2/3] bg-background relative overflow-hidden border-b border-border">
        {resume.thumbnailLink ? (
          <img
            src={resume.thumbnailLink}
            alt={resume.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="h-full overflow-hidden p-3 text-[0.35rem] leading-tight">
            {/* Mini Resume Preview */}
            <div className="border-b pb-2 mb-2" style={{ borderColor: primaryColor, borderBottomWidth: '2px' }}>
              <div className="font-bold text-[0.5rem] mb-0.5" style={{ color: primaryColor }}>
                {resume.profileInfo?.fullName || 'Your Name'}
              </div>
              <div className="text-[0.35rem] text-gray-600 mb-1">
                {resume.profileInfo?.designation || 'Your Designation'}
              </div>
              <div className="text-[0.25rem] text-gray-500 space-y-0.5">
                {resume.contactInfo?.email && <div>{resume.contactInfo.email}</div>}
                {resume.contactInfo?.phone && <div>{resume.contactInfo.phone}</div>}
              </div>
            </div>

            {resume.profileInfo?.summary && (
              <div className="mb-2">
                <div className="font-bold text-[0.4rem] mb-0.5" style={{ color: secondaryColor }}>
                  Summary
                </div>
                <div className="text-[0.3rem] text-gray-700 line-clamp-2">
                  {resume.profileInfo.summary}
                </div>
              </div>
            )}

            {resume.experience && resume.experience.length > 0 && (
              <div className="mb-2">
                <div className="font-bold text-[0.4rem] mb-0.5" style={{ color: secondaryColor }}>
                  Experience
                </div>
                <div className="space-y-1">
                  {resume.experience.slice(0, 2).map((exp, idx) => (
                    <div key={idx} className="text-[0.3rem]">
                      <div className="font-semibold">{exp.jobTitle}</div>
                      <div className="text-gray-600">{exp.company}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {resume.education && resume.education.length > 0 && (
              <div className="mb-2">
                <div className="font-bold text-[0.4rem] mb-0.5" style={{ color: secondaryColor }}>
                  Education
                </div>
                <div className="space-y-1">
                  {resume.education.slice(0, 1).map((edu, idx) => (
                    <div key={idx} className="text-[0.3rem]">
                      <div className="font-semibold">{edu.degree}</div>
                      <div className="text-gray-600">{edu.institution}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {resume.skills && resume.skills.length > 0 && (
              <div>
                <div className="font-bold text-[0.4rem] mb-0.5" style={{ color: secondaryColor }}>
                  Skills
                </div>
                <div className="flex flex-wrap gap-0.5">
                  {resume.skills.slice(0, 6).map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="text-[0.25rem] px-1 py-0.5 rounded"
                      style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <button
            onClick={onEdit}
            className="bg-card text-foreground px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:bg-muted transition-colors shadow-lg"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:opacity-90 transition-opacity shadow-lg"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
      <div className="p-3">
        <h4 className="font-semibold text-foreground mb-1 truncate text-sm">{resume.title}</h4>
        <p className="text-xs text-muted-foreground">
          Updated {new Date(resume.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
