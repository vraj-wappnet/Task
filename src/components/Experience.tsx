import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Experience {
  id: string;
  jobTitle: string;
  companyName: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  responsibilities: string;
}

const Experience = () => {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "1",
      jobTitle: "",
      companyName: "",
      employmentType: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      responsibilities: "",
    },
  ]);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Load saved experience data from localStorage
  useEffect(() => {
    const savedExperiences = localStorage.getItem("experiences");
    if (savedExperiences) {
      setExperiences(JSON.parse(savedExperiences));
    }
  }, []);

  const validateDates = (
    startDate: string,
    endDate: string,
    currentlyWorking: boolean
  ) => {
    if (currentlyWorking) return true;
    if (!startDate || !endDate) return false;
    return new Date(startDate) <= new Date(endDate);
  };

  const handleExperienceChange = (
    id: string,
    field: keyof Experience,
    value: string | boolean
  ) => {
    setExperiences((prev) =>
      prev.map((exp) => {
        if (exp.id === id) {
          const updatedExp = { ...exp, [field]: value };

          if (
            field === "startDate" ||
            field === "endDate" ||
            field === "currentlyWorking"
          ) {
            const isValid = validateDates(
              field === "startDate" ? (value as string) : updatedExp.startDate,
              field === "endDate" ? (value as string) : updatedExp.endDate,
              field === "currentlyWorking"
                ? (value as boolean)
                : updatedExp.currentlyWorking
            );

            setErrors((prev) => ({
              ...prev,
              [`${id}-dates`]: isValid
                ? ""
                : "End date must be after start date",
            }));
          }

          return updatedExp;
        }
        return exp;
      })
    );
  };

  const addExperience = () => {
    setExperiences((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        jobTitle: "",
        companyName: "",
        employmentType: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        responsibilities: "",
      },
    ]);
  };

  const removeExperience = (id: string) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // check error
    const newErrors: { [key: string]: string } = {};
    experiences.forEach((exp) => {
      if (!exp.jobTitle)
        newErrors[`${exp.id}-jobTitle`] = "Job title is required";
      if (!exp.companyName)
        newErrors[`${exp.id}-companyName`] = "Company name is required";
      if (!exp.employmentType)
        newErrors[`${exp.id}-employmentType`] = "Employment type is required";
      if (!exp.startDate)
        newErrors[`${exp.id}-startDate`] = "Start date is required";
      if (!exp.currentlyWorking && !exp.endDate)
        newErrors[`${exp.id}-endDate`] = "End date is required";
      if (!validateDates(exp.startDate, exp.endDate, exp.currentlyWorking)) {
        newErrors[`${exp.id}-dates`] = "End date must be after start date";
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      localStorage.setItem("experiences", JSON.stringify(experiences));
      navigate("/education");
    }
  };

  const handlePrevious = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center text-secondary">
          Work Experience
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {experiences.map((exp, index) => (
            <div key={exp.id} className=" rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  Experience {index + 1}
                </h3>
                {experiences.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(exp.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={exp.jobTitle}
                    onChange={(e) =>
                      handleExperienceChange(exp.id, "jobTitle", e.target.value)
                    }
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors[`${exp.id}-jobTitle`]
                        ? "border-primary"
                        : "border-gray-300"
                    } focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200`}
                    required
                  />
                  {errors[`${exp.id}-jobTitle`] && (
                    <p className="text-primary text-sm mt-1">
                      {errors[`${exp.id}-jobTitle`]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={exp.companyName}
                    onChange={(e) =>
                      handleExperienceChange(
                        exp.id,
                        "companyName",
                        e.target.value
                      )
                    }
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors[`${exp.id}-companyName`]
                        ? "border-primary"
                        : "border-gray-300"
                    } focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200`}
                    required
                  />
                  {errors[`${exp.id}-companyName`] && (
                    <p className="text-primary text-sm mt-1">
                      {errors[`${exp.id}-companyName`]}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employment Type *
                  </label>
                  <select
                    value={exp.employmentType}
                    onChange={(e) =>
                      handleExperienceChange(
                        exp.id,
                        "employmentType",
                        e.target.value
                      )
                    }
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors[`${exp.id}-employmentType`]
                        ? "border-primary"
                        : "border-gray-300"
                    } focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200`}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="internship">Internship</option>
                    <option value="contract">Contract</option>
                    <option value="freelance">Freelance</option>
                  </select>
                  {errors[`${exp.id}-employmentType`] && (
                    <p className="text-primary text-sm mt-1">
                      {errors[`${exp.id}-employmentType`]}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`currentlyWorking-${exp.id}`}
                      checked={exp.currentlyWorking}
                      onChange={(e) =>
                        handleExperienceChange(
                          exp.id,
                          "currentlyWorking",
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`currentlyWorking-${exp.id}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      Currently Working
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) =>
                      handleExperienceChange(
                        exp.id,
                        "startDate",
                        e.target.value
                      )
                    }
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors[`${exp.id}-startDate`]
                        ? "border-primary"
                        : "border-gray-300"
                    } focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200`}
                    required
                  />
                  {errors[`${exp.id}-startDate`] && (
                    <p className="text-primary text-sm mt-1">
                      {errors[`${exp.id}-startDate`]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date {!exp.currentlyWorking && "*"}
                  </label>
                  <input
                    type="date"
                    value={exp.endDate}
                    onChange={(e) =>
                      handleExperienceChange(exp.id, "endDate", e.target.value)
                    }
                    disabled={exp.currentlyWorking}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors[`${exp.id}-endDate`]
                        ? "border-primary"
                        : "border-gray-300"
                    } focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200`}
                    required={!exp.currentlyWorking}
                  />
                  {errors[`${exp.id}-endDate`] && (
                    <p className="text-primary text-sm mt-1">
                      {errors[`${exp.id}-endDate`]}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Responsibilities
                </label>
                <textarea
                  value={exp.responsibilities}
                  onChange={(e) =>
                    handleExperienceChange(
                      exp.id,
                      "responsibilities",
                      e.target.value
                    )
                  }
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200"
                  placeholder="Describe your responsibilities and achievements..."
                />
              </div>

              {errors[`${exp.id}-dates`] && (
                <p className="text-primary text-sm mt-1">
                  {errors[`${exp.id}-dates`]}
                </p>
              )}
            </div>
          ))}

          <div className="flex justify-between">
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handlePrevious}
                className="px-4 py-2 text-secondary border border-secondary rounded-lg hover:bg-secondary hover:text-white transition-all duration-200"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={addExperience}
                className="px-4 py-2 text-secondary border border-secondary rounded-lg hover:bg-secondary hover:text-white transition-all duration-200"
              >
                Add Another Experience
              </button>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-all duration-200"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Experience;
