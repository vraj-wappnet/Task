import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import TextField from "./common/TextField";
import FormContainer from "./FormContainer";
import { RootState, AppDispatch } from "../store/store";
import {
  setSkills,
  addSkill,
  removeSkill,
  updateSkillExperience,
} from "../store/skillsSlice";
import { skillsSchema } from "../utils/validationSchemas";

export interface Skill {
  id: string;
  name: string;
  isCustom: boolean;
  yearsOfExperience?: number;
}

interface FormValues {
  skills: Skill[];
  customSkill: string;
  experienceInput: string;
  editingSkill: string | null;
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
  const dispatch = useDispatch<AppDispatch>();
  const skills = useSelector((state: RootState) => state.skills.skills);

  const initialValues: FormValues = {
    skills: skills.length > 0 ? skills : [],
    customSkill: "",
    experienceInput: "",
    editingSkill: null,
  };

  const handleSubmit = (values: FormValues) => {
    dispatch(setSkills(values.skills));
    navigate("/references");
  };

  const handlePrevious = () => {
    navigate("/education");
    window.scrollTo(0, 0);
  };

  return (
    <FormContainer title="Professional Skills">
      <Formik
        initialValues={initialValues}
        validationSchema={skillsSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form className="space-y-8">
            {/* Predefined Skills Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-500">
              <h3 className="text-lg font-medium text-gray-800 mb-3">
                Popular Skills
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Click to add these common skills to your profile
              </p>

              <div className="flex flex-wrap gap-2">
                {predefinedSkills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => {
                      if (!values.skills.some((s) => s.name === skill)) {
                        const newSkill = {
                          id: Date.now().toString(),
                          name: skill,
                          isCustom: false,
                        };
                        dispatch(addSkill(newSkill));
                        setFieldValue("skills", [...values.skills, newSkill]);
                      }
                    }}
                    disabled={values.skills.some((s) => s.name === skill)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      values.skills.some((s) => s.name === skill)
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-blue-50 text-blue-600 hover:bg-blue-100 hover:shadow-sm"
                    }`}
                  >
                    {values.skills.some((s) => s.name === skill) ? (
                      <>
                        <span className="inline-block mr-1">✓</span> {skill}
                      </>
                    ) : (
                      skill
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Skills Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-500">
              <h3 className="text-lg font-medium text-gray-800 mb-3">
                Add Custom Skill
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Don't see your skill above? Add it here
              </p>

              <div className="flex gap-3">
                <div className="flex-grow">
                  <TextField
                    name="customSkill"
                    label=""
                    placeholder="Enter skill name (e.g. Docker, Python, Project Management)"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (
                      values.customSkill.trim() &&
                      !values.skills.some(
                        (s) =>
                          s.name.toLowerCase() ===
                          values.customSkill.toLowerCase()
                      )
                    ) {
                      const newSkill = {
                        id: Date.now().toString(),
                        name: values.customSkill.trim(),
                        isCustom: true,
                      };
                      dispatch(addSkill(newSkill));
                      setFieldValue("skills", [...values.skills, newSkill]);
                      setFieldValue("customSkill", "");
                    }
                  }}
                  className="px-5 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-all duration-200 self-end h-10 flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add
                </button>
              </div>
            </div>

            {/* Selected Skills Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-500">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-800">
                  Your Selected Skills
                </h3>
                <span className="bg-secondary text-white text-sm px-3 py-1 rounded-full">
                  {values.skills.length} skills
                </span>
              </div>

              {values.skills.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                  <p className="text-gray-500">
                    No skills added yet. Add skills from above options or create
                    custom skills.
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 mt-4">
                  {values.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                        skill.isCustom
                          ? "bg-gray-50 border-gray-200"
                          : "bg-blue-50 border-blue-100"
                      }`}
                    >
                      <span className="font-medium text-gray-800">
                        {skill.name}
                      </span>

                      {values.editingSkill === skill.id ? (
                        <div className="flex items-center gap-2 ml-1">
                          <div className="w-16">
                            <input
                              type="number"
                              value={values.experienceInput}
                              onChange={(e) =>
                                setFieldValue("experienceInput", e.target.value)
                              }
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
                              placeholder="Years"
                              min="0"
                              max="50"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const years = parseInt(values.experienceInput);
                              if (!isNaN(years) && years >= 0 && years <= 50) {
                                dispatch(
                                  updateSkillExperience({
                                    id: skill.id,
                                    yearsOfExperience: years,
                                  })
                                );
                                setFieldValue(
                                  "skills",
                                  values.skills.map((s) =>
                                    s.id === skill.id
                                      ? { ...s, yearsOfExperience: years }
                                      : s
                                  )
                                );
                                setFieldValue("editingSkill", null);
                                setFieldValue("experienceInput", "");
                              }
                            }}
                            className="text-green-600 hover:text-green-700 bg-green-100 hover:bg-green-200 p-1 rounded transition-colors duration-200"
                            title="Save experience"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setFieldValue("editingSkill", null);
                              setFieldValue("experienceInput", "");
                            }}
                            className="text-gray-600 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-1 rounded transition-colors duration-200"
                            title="Cancel"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setFieldValue("editingSkill", skill.id);
                            setFieldValue(
                              "experienceInput",
                              skill.yearsOfExperience?.toString() || ""
                            );
                          }}
                          className="text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded-full text-xs transition-colors duration-200"
                          title="Add years of experience"
                        >
                          {skill.yearsOfExperience
                            ? `${skill.yearsOfExperience} years`
                            : "Add experience"}
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          dispatch(removeSkill(skill.id));
                          setFieldValue(
                            "skills",
                            values.skills.filter((s) => s.id !== skill.id)
                          );
                        }}
                        className="text-primary hover:text-primary ml-1 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
                        title="Remove skill"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {errors.skills && touched.skills && (
                <div className="mt-4 text-sm text-primary">
                  You must add at least one skill
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 mt-6">
              <button
                type="button"
                onClick={handlePrevious}
                className="px-5 py-2.5 text-secondary border border-secondary rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>
              <button
                type="submit"
                className={`px-6 py-2.5 bg-secondary text-white rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-all duration-200 font-medium flex items-center ${
                  values.skills.length === 0 ? "opacity-70" : ""
                }`}
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default Skills;
