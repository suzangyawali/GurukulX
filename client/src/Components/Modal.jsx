import {
    HiCheckCircle,
    HiExclamationTriangle,
    HiInformationCircle,
    HiXMark
} from "react-icons/hi2";

const Modal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  type = "warning", // warning, danger, info, success
  confirmText = "Confirm", 
  cancelText = "Cancel",
  isLoading = false 
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          icon: HiExclamationTriangle,
          iconColor: "text-red-400",
          iconBg: "bg-red-500/20",
          confirmBtnColor: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
          borderColor: "border-red-500/30"
        };
      case "warning":
        return {
          icon: HiExclamationTriangle,
          iconColor: "text-yellow-400",
          iconBg: "bg-yellow-500/20",
          confirmBtnColor: "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600",
          borderColor: "border-yellow-500/30"
        };
      case "success":
        return {
          icon: HiCheckCircle,
          iconColor: "text-green-400",
          iconBg: "bg-green-500/20",
          confirmBtnColor: "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
          borderColor: "border-green-500/30"
        };
      case "info":
      default:
        return {
          icon: HiInformationCircle,
          iconColor: "text-blue-400",
          iconBg: "bg-blue-500/20",
          confirmBtnColor: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
          borderColor: "border-blue-500/30"
        };
    }
  };

  const typeStyles = getTypeStyles();
  const IconComponent = typeStyles.icon;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-lg rounded-2xl border border-slate-700/50 shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className={`inline-flex items-center justify-center w-10 h-10 ${typeStyles.iconBg} rounded-full ${typeStyles.borderColor} border`}>
              <IconComponent className={`text-lg ${typeStyles.iconColor}`} />
            </div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors duration-200 group"
            disabled={isLoading}
          >
            <HiXMark className="text-lg text-gray-400 group-hover:text-white transition-colors duration-200" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-300 leading-relaxed">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 p-6 pt-0">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-white font-semibold rounded-xl transition-all duration-300 border border-slate-600/50 hover:border-slate-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-6 py-3 ${typeStyles.confirmBtnColor} text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2`}
          >
            {isLoading && (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {confirmText}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Modal;
