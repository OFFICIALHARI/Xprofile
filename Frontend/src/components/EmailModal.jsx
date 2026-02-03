import { useState } from 'react';
import { X, Mail, Loader } from 'lucide-react';
import { emailAPI } from '../utils/api';
import CustomModal from './CustomModal';

const EmailModal = ({ resume, onClose }) => {
  const [formData, setFormData] = useState({
    recipientEmail: '',
    subject: `Resume - ${resume.profileInfo?.fullName || 'Application'}`,
    message: 'Please find my resume attached for your review.',
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [modalState, setModalState] = useState({ show: false, type: 'info', title: '', message: '', onConfirm: null });

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pdfFile) {
      setModalState({
        show: true,
        type: 'warning',
        title: 'Missing File',
        message: 'Please upload a PDF file before sending.',
        onConfirm: () => setModalState({ ...modalState, show: false })
      });
      return;
    }

    setLoading(true);

    try {
      const emailFormData = new FormData();
      emailFormData.append('recipientEmail', formData.recipientEmail);
      emailFormData.append('subject', formData.subject);
      emailFormData.append('message', formData.message);
      emailFormData.append('pdfFile', pdfFile);

      await emailAPI.sendResume(emailFormData);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setModalState({
        show: true,
        type: 'error',
        title: 'Send Failed',
        message: 'Failed to send email. Please try again.',
        onConfirm: () => setModalState({ ...modalState, show: false })
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Email Sent!</h3>
          <p className="text-gray-600">Your resume has been sent successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Email Resume</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipient Email *
            </label>
            <input
              type="email"
              required
              value={formData.recipientEmail}
              onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
              className="input-field"
              placeholder="recruiter@company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="input-field min-h-[100px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Resume PDF *
            </label>
            <input
              type="file"
              accept=".pdf"
              required
              onChange={handleFileChange}
              className="input-field"
            />
            {pdfFile && (
              <p className="text-sm text-gray-600 mt-2">
                Selected: {pdfFile.name}
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5 mr-2" />
                  Send Email
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      {/* Custom Modal */}
      {modalState.show && (
        <CustomModal
          type={modalState.type}
          title={modalState.title}
          message={modalState.message}
          onConfirm={modalState.onConfirm}
        />
      )}    </div>
  );
};

export default EmailModal;
