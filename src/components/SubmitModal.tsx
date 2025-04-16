import React, { useState } from "react";

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const SubmitModal: React.FC<SubmitModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    if (isChecked) {
      setShowSuccess(true);
      setTimeout(() => {
        onSubmit();
        onClose();
      }, 2000);
    }
  };

  if (!isOpen) return null;

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white  p-6 rounded-lg shadow-xl max-w-md w-full">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
              Success!
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Your resume has been submitted successfully.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-semibold text-gray-900  mb-4">
          Terms & Conditions
        </h2>
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
          <p className="mb-2">
            By submitting your resume, you agree to the following terms:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>All information provided is accurate and truthful</li>
            <li>You consent to the processing of your personal data</li>
            <li>
              You understand that this information will be stored securely
            </li>
          </ul>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="terms"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
          />
          <label
            htmlFor="terms"
            className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
          >
            I agree to the Terms & Conditions
          </label>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isChecked}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
              isChecked
                ? "bg-secondary hover:bg-secondary"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;
