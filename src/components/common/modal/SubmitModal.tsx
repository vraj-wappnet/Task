import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearPersonalInfo } from "../../../store/slice/personalInfoSlice";
import { clearReferences } from "../../../store/slice/referencesSlice";
import { clearExperienceInfo } from "../../../store/slice/experienceSlice";
import { clearEducations } from "../../../store/slice/educationSlice";
import { clearSkills } from "../../../store/slice/skillsSlice";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableElement = useRef<HTMLInputElement>(null);

  // Handle keyboard navigation and focus trapping
  useEffect(() => {
    if (isOpen && modalRef.current && firstFocusableElement.current) {
      firstFocusableElement.current.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
        if (e.key === "Tab") {
          const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements) {
            const first = focusableElements[0] as HTMLElement;
            const last = focusableElements[
              focusableElements.length - 1
            ] as HTMLElement;
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  const handleSubmit = () => {
    if (isChecked) {
      setShowSuccess(true);
      setTimeout(() => {
        // Clear all Redux stores
        dispatch(clearPersonalInfo());
        dispatch(clearReferences());
        dispatch(clearExperienceInfo());
        dispatch(clearEducations());
        dispatch(clearSkills());

        onSubmit();
        navigate("/");

        onClose();
      }, 2000);
    }
  };

  if (!isOpen) return null;

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
        <div
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-sm w-full transform scale-100 animate-success"
          role="alertdialog"
          aria-labelledby="success-title"
        >
          <div className="text-center">
            <svg
              className="mx-auto h-16 w-16 text-green-500 animate-checkmark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h3
              id="success-title"
              className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              Success!
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Your resume has been submitted successfully.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300"
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 hover:scale-[1.02]"
      >
        <h2 id="modal-title" className="text-2xl font-bold text-gray-900  mb-6">
          Terms & Conditions
        </h2>
        <div className="mb-6 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          <p className="mb-3 font-medium">
            By submitting your resume, you agree to the following terms:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>All information provided is accurate and truthful.</li>
            <li>You consent to the processing of your personal data.</li>
            <li>Your information will be stored securely.</li>
          </ul>
        </div>
        <div className="flex items-center mb-6">
          <input
            ref={firstFocusableElement}
            type="checkbox"
            id="terms"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="h-5 w-5 text-secondary focus:ring-secondary border-gray-300 rounded cursor-pointer transition-colors duration-200"
            aria-checked={isChecked}
            aria-label="Agree to Terms & Conditions"
          />
          <label
            htmlFor="terms"
            className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
          >
            I agree to the Terms & Conditions
          </label>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            aria-label="Cancel submission"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isChecked}
            className={`px-5 py-2.5 text-sm font-medium text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary ${
              isChecked
                ? "bg-secondary hover:bg-opacity-90"
                : "bg-gray-400 cursor-not-allowed animate-shake"
            }`}
            aria-disabled={!isChecked}
            aria-label="Submit resume"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;
