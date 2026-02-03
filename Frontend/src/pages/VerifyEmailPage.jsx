import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { FileText, Mail, CheckCircle, Loader } from 'lucide-react';
import { authAPI } from '../utils/api';

const VerifyEmailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('pending'); // pending, success, error
  const [message, setMessage] = useState('');
  const email = location.state?.email || '';
  const token = searchParams.get('token');

  useEffect(() => {
    // If token is present in URL, verify it
    if (token) {
      verifyEmail(token);
    }
  }, [token]);

  const verifyEmail = async (verificationToken) => {
    try {
      await authAPI.verifyEmail(verificationToken);
      setStatus('success');
      setMessage('Email verified successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Verification failed. Please try again.');
    }
  };

  const handleResendEmail = async () => {
    try {
      await authAPI.resendVerification(email);
      setMessage('Verification email sent successfully! Please check your inbox.');
      setStatus('pending');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to resend email.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Verified!</h2>
          <p className="text-gray-600 mb-6">{message}</p>
          <Loader className="w-6 h-6 animate-spin text-primary-600 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md text-center">
        <FileText className="w-16 h-16 text-primary-600 mx-auto mb-4" />
        <Mail className="w-12 h-12 text-primary-400 mx-auto mb-6" />
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>
        
        {email && (
          <p className="text-gray-600 mb-6">
            We've sent a verification link to <strong>{email}</strong>
          </p>
        )}
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            Please click the verification link in your email to activate your account.
          </p>
        </div>

        {message && (
          <div className={`border rounded-lg p-4 mb-6 ${
            status === 'error' 
              ? 'bg-red-50 border-red-200 text-red-700' 
              : 'bg-green-50 border-green-200 text-green-700'
          }`}>
            {message}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleResendEmail}
            className="w-full btn-secondary"
          >
            Resend Verification Email
          </button>

          <button
            onClick={() => navigate('/login')}
            className="w-full text-primary-600 hover:text-primary-700 font-semibold"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
