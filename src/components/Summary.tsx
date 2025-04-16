import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Skill } from "./Skills";
import { Education } from "./Education";
import SubmitModal from "./SubmitModal";

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

  console.log("references", references);
  // Get data from localStorage
  const education = JSON.parse(
    localStorage.getItem("educations") || "[]"
  ) as Education[];

  const skills = JSON.parse(localStorage.getItem("skills") || "[]") as Skill[];

  const totalExperienceYears = education.reduce((total, edu) => {
    const start = parseInt(edu.startYear);
    const end = parseInt(edu.endYear);
    return total + (end - start);
  }, 0);
  console.log("personalInfo", personalInfo);
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
    // Here you would typically submit the data to a server
    console.log("Form submitted successfully!");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Summary</h1>

      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
          <button
            onClick={() => navigate("/")}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
        </div>
        <p>
          <strong>Name:</strong> {personalInfo.fullName}
        </p>
        <p>
          <strong>Email:</strong> {personalInfo.email}
        </p>
        <p>
          <strong>Phone:</strong> {personalInfo.phone}
        </p>
        <p>
          <strong>Age:</strong> {age} years
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-2">Education</h2>
          <button
            onClick={() => navigate("/education")}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
        </div>
        {education.map((edu: Education, index: number) => (
          <div key={`${edu.schoolName}-${index}`} className="mb-4">
            <p>
              <strong>School:</strong> {edu.schoolName}
            </p>
            <p>
              <strong>Degree:</strong> {edu.degree}
            </p>
            <p>
              <strong>Years:</strong> {edu.startYear} - {edu.endYear}
            </p>
          </div>
        ))}
        <p className="mt-2">
          <strong>Total Education Years:</strong> {totalExperienceYears} years
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <button
            onClick={() => navigate("/skills")}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill: Skill) => {
            console.log("skillmPPING", skill);

            return (
              <span
                key={`${skill?.id}`}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
              >
                {skill?.name}
              </span>
            );
          })}
        </div>
        <p className="mt-2">
          <strong>Total Skills:</strong> {skills.length}
        </p>
      </div>

      {!references.skipReferences && (
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold mb-2">References</h2>
            <button
              onClick={() => navigate("/references")}
              className="text-blue-500 hover:text-blue-700"
            >
              Edit
            </button>
          </div>
          {references.references.map((ref: Reference) => (
            <div key={ref.id} className="mb-4">
              <p>
                <strong>Name:</strong> {ref.name}
              </p>
              <p>
                <strong>Relationship:</strong> {ref.relationship}
              </p>
              <p>
                <strong>Company:</strong> {ref.company}
              </p>
              <p>
                <strong>Contact:</strong> {ref.contact}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={() => navigate("/references")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit
        </button>
      </div>

      <SubmitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Summary;
