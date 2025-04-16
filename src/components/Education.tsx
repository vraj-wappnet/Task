import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export interface Education {
  id: string;
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  grade: string;
  certificates: File[];
}

const Education = () => {
  const navigate = useNavigate();
  const personalInfo = useSelector((state: RootState) => state.personalInfo);
  const [educations, setEducations] = useState<Education[]>([
    {
      id: "1",
      schoolName: "",
      degree: "",
      fieldOfStudy: "",
      startYear: "",
      endYear: "",
      grade: "",
      certificates: [],
    },
  ]);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Load saved education data from localStorage when component mounts
  useEffect(() => {
    const savedEducations = localStorage.getItem("educations");
    if (savedEducations) {
      const parsedEducations = JSON.parse(savedEducations) as Education[];
      setEducations(parsedEducations);
    }
  }, []);

  const handleEducationChange = (
    id: string,
    field: keyof Education,
    value: string
  ) => {
    setEducations((prev) =>
      prev.map((edu) => {
        if (edu.id === id) {
          return { ...edu, [field]: value };
        }
        return edu;
      })
    );
  };

  const handleCertificateChange = (id: string, files: FileList | null) => {
    if (!files) return;

    setEducations((prev) =>
      prev.map((edu) => {
        if (edu.id === id) {
          return { ...edu, certificates: Array.from(files) };
        }
        return edu;
      })
    );
  };

  const addEducation = () => {
    setEducations((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        schoolName: "",
        degree: "",
        fieldOfStudy: "",
        startYear: "",
        endYear: "",
        grade: "",
        certificates: [],
      },
    ]);
  };

  const removeEducation = (id: string) => {
    if (educations.length > 1) {
      setEducations((prev) => prev.filter((edu) => edu.id !== id));
    }
  };

  const handlePrevious = () => {
    navigate("/experience");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all educations
    const newErrors: { [key: string]: string } = {};
    educations.forEach((edu) => {
      if (!edu.schoolName)
        newErrors[`${edu.id}-schoolName`] = "School name is required";
      if (!edu.degree) newErrors[`${edu.id}-degree`] = "Degree is required";
      if (!edu.startYear)
        newErrors[`${edu.id}-startYear`] = "Start year is required";
      if (!edu.endYear) newErrors[`${edu.id}-endYear`] = "End year is required";
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Save to local storage
      localStorage.setItem("educations", JSON.stringify(educations));
      // Navigate to skills page
      navigate("/skills");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center text-secondary">
          Education
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {educations.map((edu, index) => (
            <div key={edu.id} className=" rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Education {index + 1}</h3>
                {educations.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(edu.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    School/University Name *
                  </label>
                  <input
                    type="text"
                    value={edu.schoolName}
                    onChange={(e) =>
                      handleEducationChange(
                        edu.id,
                        "schoolName",
                        e.target.value
                      )
                    }
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors[`${edu.id}-schoolName`]
                        ? "border-primary"
                        : "border-gray-300"
                    } focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200`}
                    required
                  />
                  {errors[`${edu.id}-schoolName`] && (
                    <p className="text-primary text-sm mt-1">
                      {errors[`${edu.id}-schoolName`]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Degree *
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) =>
                      handleEducationChange(edu.id, "degree", e.target.value)
                    }
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors[`${edu.id}-degree`]
                        ? "border-primary"
                        : "border-gray-300"
                    } focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200`}
                    required
                  />
                  {errors[`${edu.id}-degree`] && (
                    <p className="text-primary text-sm mt-1">
                      {errors[`${edu.id}-degree`]}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy}
                    onChange={(e) =>
                      handleEducationChange(
                        edu.id,
                        "fieldOfStudy",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Grade/GPA
                  </label>
                  <input
                    type="text"
                    value={edu.grade}
                    onChange={(e) =>
                      handleEducationChange(edu.id, "grade", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Year *
                  </label>
                  <input
                    type="number"
                    value={edu.startYear}
                    onChange={(e) =>
                      handleEducationChange(edu.id, "startYear", e.target.value)
                    }
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors[`${edu.id}-startYear`]
                        ? "border-primary"
                        : "border-gray-300"
                    } focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200`}
                    required
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                  {errors[`${edu.id}-startYear`] && (
                    <p className="text-primary text-sm mt-1">
                      {errors[`${edu.id}-startYear`]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Year *
                  </label>
                  <input
                    type="number"
                    value={edu.endYear}
                    onChange={(e) =>
                      handleEducationChange(edu.id, "endYear", e.target.value)
                    }
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors[`${edu.id}-endYear`]
                        ? "border-primary"
                        : "border-gray-300"
                    } focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200`}
                    required
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                  {errors[`${edu.id}-endYear`] && (
                    <p className="text-primary text-sm mt-1">
                      {errors[`${edu.id}-endYear`]}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Certificates
                </label>
                <input
                  type="file"
                  multiple
                  onChange={(e) =>
                    handleCertificateChange(edu.id, e.target.files)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200"
                />
                {edu.certificates.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Selected files:</p>
                    <ul className="list-disc list-inside">
                      {edu.certificates.map((file, index) => (
                        <li key={index} className="text-sm text-gray-600">
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
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
              {(personalInfo.educationLevel === "bachelors" ||
                personalInfo.educationLevel === "graduate") && (
                <button
                  type="button"
                  onClick={addEducation}
                  className="px-4 py-2 text-secondary border border-secondary rounded-lg hover:bg-secondary hover:text-white transition-all duration-200"
                >
                  Add Another Education
                </button>
              )}
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

export default Education;
