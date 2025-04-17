import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const steps = [
  {
    path: "/",
    label: "Information",
    status: "Personal information in progress",
  },
  {
    path: "/experience",
    label: "Experience",
    status: "Experience in progress",
  },
  {
    path: "/education",
    label: "Education",
    status: "Education in progress",
  },
  {
    path: "/skills",
    label: "Skills",
    status: "Skills in progress",
  },
  {
    path: "/references",
    label: "References",
    status: "References in progress",
  },
  {
    path: "/summary",
    label: "Summary",
    status: "Summary in progress",
  },
];

const FormStepper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentStepIndex = steps.findIndex(
    (step) => step.path === location.pathname
  );

  const handleStepClick = (path: string, index: number) => {
    // Allow navigation only to completed or current steps
    if (index <= currentStepIndex) {
      navigate(path);
    } else {
      console.log(`Cannot navigate to future step: ${steps[index].label}`);
    }
  };

  const getIconForLabel = (label: string) => {
    switch (label) {
      case "Information":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        );
      case "Experience":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        );
      case "Education":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
            />
          </svg>
        );
      case "Skills":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        );
      case "References":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        );
      case "Summary":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
        );
      default:
        return <div className="w-3 h-3 rounded-full bg-current" />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto mb-12 p-6 bg-gray-50 rounded-xl shadow-sm">
      {/* Mobile View - Step Pills */}
      <div className="md:hidden">
        <div className="flex items-center mb-2">
          <div className="font-medium text-gray-700">
            Step {currentStepIndex + 1} of {steps.length}:
          </div>
          <button
            className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() =>
              handleStepClick(steps[currentStepIndex].path, currentStepIndex)
            }
            aria-current="step"
            aria-label={`Go to ${steps[currentStepIndex].label} step`}
          >
            {steps[currentStepIndex].label}
          </button>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          />
        </div>
      </div>

      {/* Desktop View - Full Stepper */}
      <div className="hidden md:block">
        <div className="relative flex items-center justify-between">
          {/* Progress Line */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            />
          </div>

          {/* Steps */}
          {steps.map((step, index) => (
            <div
              key={step.path}
              className="relative flex flex-col items-center group"
            >
              {/* Step Circle */}
              <motion.button
                initial={{ scale: 0.8 }}
                animate={{
                  scale: index <= currentStepIndex ? 1 : 0.8,
                  boxShadow:
                    index <= currentStepIndex
                      ? "0 0 0 4px rgba(59, 130, 246, 0.2)"
                      : "none",
                }}
                transition={{ duration: 0.3 }}
                className={`w-12 h-12 rounded-full flex items-center justify-center z-10 border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  index < currentStepIndex
                    ? "bg-purple-500 border-purple-500 text-white hover:bg-purple-600 cursor-pointer"
                    : index === currentStepIndex
                    ? "bg-white border-blue-500 text-blue-500 shadow-md hover:bg-blue-50 cursor-pointer"
                    : "bg-white border-gray-300 text-gray-400 cursor-not-allowed"
                }`}
                onClick={() => handleStepClick(step.path, index)}
                disabled={index > currentStepIndex}
                aria-current={index === currentStepIndex ? "step" : undefined}
                aria-label={`Go to ${step.label} step`}
                aria-disabled={index > currentStepIndex}
              >
                {index < currentStepIndex ? (
                  <svg
                    className="w-6 h-6"
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
                ) : (
                  getIconForLabel(step.label)
                )}
              </motion.button>

              {/* Label with Status */}
              <div className="absolute -bottom-12 w-36 text-center">
                <p
                  className={`text-sm font-semibold mb-1 ${
                    index <= currentStepIndex
                      ? "text-gray-900"
                      : "text-gray-500"
                  }`}
                >
                  {step.label}
                </p>
                <p
                  className={`text-xs ${
                    index < currentStepIndex
                      ? "text-purple-600"
                      : index === currentStepIndex
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                >
                  {index < currentStepIndex
                    ? "Completed"
                    : index === currentStepIndex
                    ? "In progress"
                    : "Pending"}
                </p>
              </div>

              {/* Tooltip - shown on hover */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-2 px-3 w-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="font-semibold mb-1">{step.label}</div>
                <div>{step.status}</div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormStepper;
