import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface Skill {
  id: string;
  name: string;
  isCustom: boolean;
  yearsOfExperience?: number;
}

const predefinedSkills = [
  "React",
  "Node.js",
  "JavaScript",
  "TypeScript",
  "MongoDB",
  "HTML",
  "CSS",
  "Redux",
  "Express.js",
];

const Skills = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [customSkill, setCustomSkill] = useState("");
  const [selectedPredefinedSkills, setSelectedPredefinedSkills] = useState<
    string[]
  >([]);
  const [editingSkill, setEditingSkill] = useState<string | null>(null);
  const [experienceInput, setExperienceInput] = useState("");

  // Load saved skills from localStorage when component mounts
  useEffect(() => {
    const savedSkills = localStorage.getItem("skills");
    if (savedSkills) {
      const parsedSkills = JSON.parse(savedSkills) as Skill[];
      setSkills(parsedSkills);
      // Update selectedPredefinedSkills based on loaded skills
      const predefined = parsedSkills
        .filter((skill) => !skill.isCustom)
        .map((skill) => skill.name);
      setSelectedPredefinedSkills(predefined);
    }
  }, []);

  const handleAddCustomSkill = () => {
    if (
      customSkill.trim() &&
      !skills.some((s) => s.name.toLowerCase() === customSkill.toLowerCase())
    ) {
      setSkills((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          name: customSkill.trim(),
          isCustom: true,
        },
      ]);
      setCustomSkill("");
    }
  };

  const handleAddPredefinedSkill = (skill: string) => {
    if (!skills.some((s) => s.name.toLowerCase() === skill.toLowerCase())) {
      setSkills((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          name: skill,
          isCustom: false,
        },
      ]);
      setSelectedPredefinedSkills((prev) => [...prev, skill]);
    }
  };

  const handleRemoveSkill = (id: string) => {
    const skillToRemove = skills.find((s) => s.id === id);
    if (skillToRemove && !skillToRemove.isCustom) {
      setSelectedPredefinedSkills((prev) =>
        prev.filter((s) => s !== skillToRemove.name)
      );
    }
    setSkills((prev) => prev.filter((s) => s.id !== id));
  };

  const handleEditExperience = (id: string) => {
    const skill = skills.find((s) => s.id === id);
    if (skill) {
      setEditingSkill(id);
      setExperienceInput(skill.yearsOfExperience?.toString() || "");
    }
  };

  const handleSaveExperience = (id: string) => {
    setSkills((prev) =>
      prev.map((skill) => {
        if (skill.id === id) {
          return {
            ...skill,
            yearsOfExperience: experienceInput
              ? parseInt(experienceInput)
              : undefined,
          };
        }
        return skill;
      })
    );
    setEditingSkill(null);
    setExperienceInput("");
  };

  const handlePrevious = () => {
    navigate("/education");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("skills", JSON.stringify(skills));
    navigate("/references");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center text-secondary">
          Skills
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Predefined Skills
            </label>
            <div className="flex flex-wrap gap-2">
              {predefinedSkills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleAddPredefinedSkill(skill)}
                  disabled={selectedPredefinedSkills.includes(skill)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedPredefinedSkills.includes(skill)
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Skill Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Custom Skill
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-secondary"
                placeholder="Type a skill"
              />
              <button
                type="button"
                onClick={handleAddCustomSkill}
                className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
              >
                Add
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Skills
            </label>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1"
                >
                  <span className="text-sm ">{skill.name}</span>
                  {editingSkill === skill.id ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={experienceInput}
                        onChange={(e) => setExperienceInput(e.target.value)}
                        className="w-16 px-2 py-1 rounded "
                        placeholder="Years"
                        min="0"
                        max="50"
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveExperience(skill.id)}
                        className="text-green-600 hover:text-green-700"
                      >
                        ✓
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleEditExperience(skill.id)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {skill.yearsOfExperience
                        ? `${skill.yearsOfExperience}y`
                        : "+y"}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              className="px-4 py-2 text-secondary border border-secondary rounded-lg hover:bg-secondary hover:text-white transition-all duration-200"
            >
              Previous
            </button>
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

export default Skills;
