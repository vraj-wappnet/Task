import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Skill } from "./Skills";
import { Education } from "./Education";
import SubmitModal from "./SubmitModal";
import FormContainer from "./FormContainer";

interface Reference {
  id: string;
  name: string;
  relationship: string;
  company: string;
  contact: string;
}

const Summary: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const personalInfo = useSelector((state: RootState) => state.personalInfo);
  const references = useSelector((state: RootState) => state.references);
  const education = useSelector(
    (state: RootState) => state.education.educations
  );
  const skills = useSelector((state: RootState) => state.skills.skills);

  const totalExperienceYears = education.reduce((total, edu) => {
    const start = parseInt(edu.startYear);
    const end = parseInt(edu.endYear);
    return total + (end - start);
  }, 0);

  // Calculate age from DOB
  const calculateAge = (dob: string) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const age = calculateAge(personalInfo.dob);

  const handleSubmit = () => {
    console.log("Form submitted successfully!");
  };

  const handlePrevious = () => {
    navigate("/references");
    window.scrollTo(0, 0);
  };
  const SectionHeader = ({
    title,
    editPath,
  }: {
    title: string;
    editPath: string;
  }) => (
    <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-6">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <button
        onClick={() => navigate(editPath)}
        className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        aria-label={`Edit ${title}`}
      >
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
        Edit
      </button>
    </div>
  );

  return (
    <FormContainer title="Profile Summary">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
          <SectionHeader title="Personal Information" editPath="/" />
          <div className="flex items-center mb-6">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <svg
                className="w-6 h-6 text-indigo-600"
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
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              {personalInfo.fullName}
            </h3>
          </div>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm">{personalInfo.email}</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-sm">{personalInfo.phone}</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm">Age: {age} years</span>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
          <SectionHeader title="Education" editPath="/education" />
          {education.length > 0 ? (
            <>
              <div className="space-y-4">
                {education.map((edu: Education, index: number) => (
                  <div
                    key={`${edu.schoolName}-${index}`}
                    className="p-4 border-l-4 border-indigo-500 bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100"
                  >
                    <h4 className="font-semibold text-gray-800 text-lg">
                      {edu.schoolName}
                    </h4>
                    <p className="text-gray-600">{edu.degree}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {edu.startYear} - {edu.endYear}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                  Total Education: {totalExperienceYears} years
                </span>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-4">No education information added yet.</p>
              <button
                onClick={() => navigate("/education")}
                className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200"
                aria-label="Add Education"
              >
                Add Education
              </button>
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
          <SectionHeader title="Skills" editPath="/skills" />
          {skills.length > 0 ? (
            <>
              <div className="flex flex-wrap gap-3 mb-4">
                {skills.map((skill: Skill) => (
                  <span
                    key={skill.id}
                    className="bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center transition-all duration-200 hover:shadow-md"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {skill.name}
                  </span>
                ))}
              </div>
              <div className="text-gray-600 text-sm">
                You have listed{" "}
                <span className="font-semibold text-indigo-600">
                  {skills.length}
                </span>{" "}
                skills in your profile.
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-4">No skills added yet.</p>
              <button
                onClick={() => navigate("/skills")}
                className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200"
                aria-label="Add Skills"
              >
                Add Skills
              </button>
            </div>
          )}
        </div>

        {/* References */}
        {!references.skipReferences && (
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <SectionHeader title="References" editPath="/references" />
            {references.references.length > 0 ? (
              <div className="space-y-4">
                {references.references.map((ref: Reference) => (
                  <div
                    key={ref.id}
                    className="p-4 border-l-4 border-indigo-500 bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100"
                  >
                    <h4 className="font-semibold text-gray-800 text-lg">
                      {ref.name}
                    </h4>
                    <p className="text-gray-600">
                      {ref.relationship} at {ref.company}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      {ref.contact}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-4">No references added yet.</p>
                <button
                  onClick={() => navigate("/references")}
                  className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200"
                  aria-label="Add References"
                >
                  Add References
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 pt-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={handlePrevious}
            className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label="Back to References"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to References
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-colors duration-200 shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label="Submit Application"
          >
            Submit Application
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <SubmitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </FormContainer>
  );
};

export default Summary;
