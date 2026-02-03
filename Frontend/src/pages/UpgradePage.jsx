import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Check, ArrowLeft, Loader } from 'lucide-react';
import { paymentAPI, authAPI } from '../utils/api';
import CustomModal from '../components/CustomModal';

const UpgradePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [modalState, setModalState] = useState({ show: false, type: 'info', title: '', message: '', onConfirm: null });

  useEffect(() => {
    fetchUser();
    loadRazorpayScript();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data);
    } catch (err) {
      console.error('Failed to fetch user', err);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleUpgrade = async () => {
    setLoading(true);

    try {
      // Step 1: Create order
      const orderResponse = await paymentAPI.createOrder('PREMIUM');
      const { orderId, amount, currency } = orderResponse.data;

      // Step 2: Open Razorpay checkout
      const options = {
        key: 'rzp_test_S6lEuZLjf08qJs',
        amount: amount,
        currency: currency,
        name: 'Xprofile',
        description: 'Premium Plan Upgrade',
        order_id: orderId,
        handler: async function (response) {
          try {
            // Step 3: Verify payment
            const verifyData = {
              razorpay_order_id: orderId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };
            
            console.log('Verifying payment...');
            await paymentAPI.verifyPayment(verifyData);
            console.log('Payment verified successfully');
            
            // Refresh user data to get updated subscription plan
            console.log('Fetching updated user profile...');
            const updatedUser = await authAPI.getProfile();
            console.log('Updated user data:', updatedUser.data);
            localStorage.setItem('user', JSON.stringify(updatedUser.data));
            
            setModalState({
              show: true,
              type: 'success',
              title: 'Payment Successful!',
              message: 'You are now a Premium member. Enjoy all the premium features!',
              onConfirm: () => {
                window.location.href = '/dashboard'; // Force reload to update UI
              }
            });
          } catch (err) {
            console.error('Payment verification error:', err);
            setModalState({
              show: true,
              type: 'error',
              title: 'Verification Failed',
              message: 'Payment verification failed. Please contact support.',
              onConfirm: () => setModalState({ ...modalState, show: false })
            });
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
        },
        theme: {
          color: '#0ea5e9',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error('Payment error', err);
      setModalState({
        show: true,
        type: 'error',
        title: 'Payment Failed',
        message: 'Failed to initiate payment. Please try again.',
        onConfirm: () => setModalState({ ...modalState, show: false })
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upgrade to Premium
          </h1>
          <p className="text-xl text-gray-600">
            Unlock all features and create unlimited resumes
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Basic Plan */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Basic</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">₹0</span>
              <span className="text-gray-600">/forever</span>
            </div>
            <ul className="space-y-4 mb-8">
              <Feature text="3 Basic Templates" />
              <Feature text="Live Preview" />
              <Feature text="PDF Export" />
              <Feature text="Save Up to 3 Resumes" />
            </ul>
            <button className="w-full btn-secondary" disabled>
              Current Plan
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-xl shadow-2xl p-8 transform scale-105">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">Premium</h3>
              <Crown className="w-6 h-6" />
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold">₹999</span>
              <span className="text-primary-100">/lifetime</span>
            </div>
            <ul className="space-y-4 mb-8">
              <Feature text="All Basic Features" light />
              <Feature text="10+ Premium Templates" light />
              <Feature text="Custom Color Palette" light />
              <Feature text="Unlimited Resumes" light />
              <Feature text="Priority Support" light />
              <Feature text="Lifetime Access" light />
            </ul>
            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="w-full bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Crown className="w-5 h-5 mr-2" />
                  Upgrade Now
                </>
              )}
            </button>
          </div>
        </div>

        {/* Features Comparison */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Upgrade to Premium?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-6 h-6 text-primary-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Premium Templates</h4>
              <p className="text-gray-600 text-sm">
                Access exclusive, professionally designed templates
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-6 h-6 text-primary-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Unlimited Resumes</h4>
              <p className="text-gray-600 text-sm">
                Create as many resumes as you need for different roles
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-6 h-6 text-primary-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Lifetime Access</h4>
              <p className="text-gray-600 text-sm">
                Pay once, use forever - no recurring subscriptions
              </p>
            </div>
          </div>
        </div>
      </div>

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

const Feature = ({ text, light = false }) => (
  <li className="flex items-center">
    <Check className={`w-5 h-5 mr-3 ${light ? 'text-white' : 'text-green-500'}`} />
    <span className={light ? 'text-white' : 'text-gray-700'}>{text}</span>
  </li>
);

export default UpgradePage;
