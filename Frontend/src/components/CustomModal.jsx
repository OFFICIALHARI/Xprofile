import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

const CustomModal = ({ type = 'info', title, message, onConfirm, onCancel, confirmText = 'OK', cancelText = 'Cancel' }) => {
  const icons = {
    success: <CheckCircle className="w-12 h-12 text-green-600" />,
    error: <XCircle className="w-12 h-12 text-red-600" />,
    warning: <AlertCircle className="w-12 h-12 text-yellow-600" />,
    info: <Info className="w-12 h-12 text-blue-600" />,
    confirm: <AlertCircle className="w-12 h-12 text-orange-600" />
  };

  const bgColors = {
    success: 'bg-green-100',
    error: 'bg-red-100',
    warning: 'bg-yellow-100',
    info: 'bg-blue-100',
    confirm: 'bg-orange-100'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all animate-slideUp">
        <div className="flex flex-col items-center text-center">
          <div className={`w-16 h-16 ${bgColors[type]} rounded-full flex items-center justify-center mb-4`}>
            {icons[type]}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="flex gap-3 w-full">
            {onCancel && (
              <button
                onClick={onCancel}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {cancelText}
              </button>
            )}
            <button
              onClick={onConfirm}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors ${
                type === 'error' || type === 'confirm'
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-primary-600 hover:bg-primary-700 text-white'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
