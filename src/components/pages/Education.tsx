import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { Formik, Form } from "formik";
import TextField from "../common/inputs/TextField";
import FormContainer from "../layout/FormContainer";
import {
  setEducations,
  addEducation,
  removeEducation,
} from "../../store/slice/educationSlice";
import {
  educationSchema,
  validateYearRange,
} from "../../utils/validationSchemas";
import * as Yup from "yup";

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

interface FormValues {
  educations: Education[];
}

const validationSchema = Yup.object().shape({
  educations: Yup.array().of(educationSchema),
});

const Education = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const personalInfo = useSelector((state: RootState) => state.personalInfo);
  const educations = useSelector(
    (state: RootState) => state.education.educations
  );

  const initialValues: FormValues = {
    educations:
      educations.length > 0
        ? educations
        : [
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
          ],
  };

  const handleSubmit = (values: FormValues) => {
    // Validate year ranges for all educations
    const isValid = values.educations.every((edu) =>
      validateYearRange(edu.startYear, edu.endYear)
    );

    if (isValid) {
      dispatch(setEducations(values.educations));
      navigate("/skills");
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    navigate("/experience");
    window.scrollTo(0, 0);
  };

  return (
    <FormContainer title="Academic Background">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-8">
            {values.educations.map((edu, index) => (
              <div
                key={edu.id}
                className="rounded-lg p-6 space-y-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-center pb-1">
                  <div className="flex items-center">
                    <div className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 font-medium">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Education History
                    </h3>
                  </div>
                  {values.educations.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        dispatch(removeEducation(edu.id));
                        const newEducations = values.educations.filter(
                          (e) => e.id !== edu.id
                        );
                        setFieldValue("educations", newEducations);
                      }}
                      className="text-primary hover:text-primary flex items-center text-sm font-medium"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <TextField
                    name={`educations.${index}.schoolName`}
                    label="School/University Name"
                    placeholder="e.g. Stanford University"
                    required
                  />
                  <TextField
                    name={`educations.${index}.degree`}
                    label="Degree"
                    placeholder="e.g. Bachelor of Science"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <TextField
                    name={`educations.${index}.fieldOfStudy`}
                    label="Field of Study"
                    placeholder="e.g. Computer Science"
                  />
                  <TextField
                    name={`educations.${index}.grade`}
                    label="Grade/GPA"
                    placeholder="e.g. 3.8/4.0"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <TextField
                    name={`educations.${index}.startYear`}
                    label="Start Year"
                    type="number"
                    placeholder="e.g. 2018"
                    required
                  />
                  <TextField
                    name={`educations.${index}.endYear`}
                    label="End Year (or Expected)"
                    type="number"
                    placeholder="e.g. 2022"
                    required
                  />
                </div>

                <div className="pt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Certificates or Transcripts
                  </label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gray-50">
                    <input
                      type="file"
                      multiple
                      id={`certificates-${index}`}
                      onChange={(e) => {
                        if (e.target.files) {
                          const files = Array.from(e.target.files);
                          setFieldValue(
                            `educations.${index}.certificates`,
                            files
                          );
                        }
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor={`certificates-${index}`}
                      className="flex flex-col items-center justify-center cursor-pointer py-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-gray-400 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <span className="text-gray-600 text-sm font-medium">
                        Click to upload files (optional)
                      </span>
                      <span className="text-gray-500 text-xs mt-1">
                        PDF, DOC, JPEG accepted
                      </span>
                    </label>
                  </div>

                  {edu.certificates.length > 0 && (
                    <div className="mt-3 bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-blue-700 mb-2 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Selected files:
                      </p>
                      <ul className="space-y-1">
                        {edu.certificates.map((file, fileIndex) => (
                          <li
                            key={fileIndex}
                            className="text-sm text-blue-600 flex items-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1 text-blue-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                              />
                            </svg>
                            {file.name}
                            <button
                              type="button"
                              onClick={() => {
                                const newCertificates = [...edu.certificates];
                                newCertificates.splice(fileIndex, 1);
                                setFieldValue(
                                  `educations.${index}.certificates`,
                                  newCertificates
                                );
                              }}
                              className="ml-2 text-primary hover:text-primary"
                              title="Remove file"
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
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {(personalInfo.educationLevel === "bachelors" ||
              personalInfo.educationLevel === "graduate") && (
              <button
                type="button"
                onClick={() => {
                  const newEducation = {
                    id: Date.now().toString(),
                    schoolName: "",
                    degree: "",
                    fieldOfStudy: "",
                    startYear: "",
                    endYear: "",
                    grade: "",
                    certificates: [],
                  };
                  dispatch(addEducation(newEducation));
                  setFieldValue("educations", [
                    ...values.educations,
                    newEducation,
                  ]);
                }}
                className="flex items-center justify-center w-full py-3 px-4 border-2 border-dashed border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white transition-all duration-300 font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v12m6-6H6"
                  />
                </svg>
                Add Another Educational Experience
              </button>
            )}

            <div className="flex justify-between pt-6 mt-2 border-t border-gray-100">
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
                className="px-6 py-2.5 bg-secondary text-white rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-all duration-200 font-medium flex items-center"
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

export default Education;
