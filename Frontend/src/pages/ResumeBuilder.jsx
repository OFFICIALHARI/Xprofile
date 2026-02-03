import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader, Eye, Mail, Download, CheckCircle, XCircle } from 'lucide-react';
import { resumeAPI } from '../utils/api';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import EmailModal from '../components/EmailModal';
import CustomModal from '../components/CustomModal';
import html2pdf from 'html2pdf.js';

const ResumeBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalState, setModalState] = useState({ show: false, type: 'info', title: '', message: '', onConfirm: null });
  const [activeSection, setActiveSection] = useState('profile');
  const previewRef = useRef(null);
  const contentRef = useRef(null);
  const [previewScale, setPreviewScale] = useState(1);

  useEffect(() => {
    fetchResume();
  }, [id]);

  useLayoutEffect(() => {
    if (!contentRef.current) return;
    const A4_WIDTH = 794;
    const A4_HEIGHT = 1123;

    const measureAndScale = () => {
      const contentWidth = contentRef.current.scrollWidth || A4_WIDTH;
      const contentHeight = contentRef.current.scrollHeight || A4_HEIGHT;
      const scaleX = A4_WIDTH / contentWidth;
      const scaleY = A4_HEIGHT / contentHeight;
      const nextScale = Math.min(1, scaleX, scaleY);
      setPreviewScale(nextScale);
    };

    const rafId = requestAnimationFrame(measureAndScale);
    return () => cancelAnimationFrame(rafId);
  }, [resume]);

  const fetchResume = async () => {
    try {
      const response = await resumeAPI.getResumeById(id);
      setResume(response.data);
    } catch (err) {
      console.error('Failed to fetch resume', err);
      setModalState({
        show: true,
        type: 'error',
        title: 'Load Failed',
        message: 'Failed to load resume. Redirecting to dashboard...',
        onConfirm: () => navigate('/dashboard')
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await resumeAPI.updateResume(id, resume);
      setResume(response.data);
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 3000);
    } catch (err) {
      console.error('Failed to save resume', err);
      setErrorMessage('Failed to save resume. Please try again.');
      setShowErrorModal(true);
      setTimeout(() => setShowErrorModal(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const updateResume = (field, value) => {
    setResume({
      ...resume,
      [field]: value,
    });
  };

  const handleDownload = async () => {
    if (!previewRef.current) {
      setModalState({
        show: true,
        type: 'warning',
        title: 'Not Ready',
        message: 'Resume preview is not ready yet. Please wait a moment.',
        onConfirm: () => setModalState({ ...modalState, show: false })
      });
      return;
    }

    setDownloading(true);
    try {
      const fileName = `${resume?.title || 'resume'}.pdf`;
      const options = {
        margin: 0,
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          windowWidth: previewRef.current.scrollWidth,
          windowHeight: previewRef.current.scrollHeight,
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      await html2pdf().set(options).from(previewRef.current).save();
    } catch (err) {
      console.error('Failed to download PDF', err);
      setModalState({
        show: true,
        type: 'error',
        title: 'Download Failed',
        message: 'Failed to download PDF. Please try again.',
        onConfirm: () => setModalState({ ...modalState, show: false })
      });
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-full px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-xl font-bold text-gray-900">{resume?.title}</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowEmailModal(true)}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <Mail className="w-5 h-5" />
              <span>Email</span>
            </button>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              {downloading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Download</span>
                </>
              )}
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary flex items-center space-x-2"
            >
              {saving ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Save</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Split Screen Layout */}
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Side - Form */}
        <div className="w-1/2 overflow-y-auto bg-white p-6 border-r">
          <ResumeForm
            resume={resume}
            updateResume={updateResume}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>

        {/* Right Side - Preview */}
        <div className="w-1/2 overflow-y-auto bg-gray-100 p-6">
          <div className="mx-auto flex justify-center">
            <div ref={previewRef} className="resume-page bg-white shadow-lg">
              <div
                ref={contentRef}
                className="resume-content"
                style={{
                  transform: `scale(${previewScale})`,
                  width: `${Math.round(794 / previewScale)}px`,
                }}
              >
                <ResumePreview resume={resume} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <EmailModal
          resume={resume}
          onClose={() => setShowEmailModal(false)}
        />
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all animate-bounce-in">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Success!</h3>
              <p className="text-gray-600 mb-6">Resume saved successfully!</p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="btn-primary px-8"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Error</h3>
              <p className="text-gray-600 mb-6">{errorMessage}</p>
              <button
                onClick={() => setShowErrorModal(false)}
                className="btn-secondary px-8"
              >
                Close
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
        />
      )}
    </div>
  );
};

export default ResumeBuilder;
