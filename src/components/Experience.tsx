// import { useNavigate } from "react-router-dom";
// import { Formik, Form, Field } from "formik";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState, AppDispatch } from "../store/store";
// import {
//   setExperienceInfo,
//   removeExperienceInfo,
// } from "../store/experienceSlice";
// import TextField from "./common/TextField";
// import FormContainer from "./FormContainer";
// import { ExperienceInfo } from "../store/experienceSlice";
// import { experienceSchema } from "../utils/validationSchemas";

// interface FormValues {
//   experiences: ExperienceInfo[];
// }

// const Experience = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();
//   const experiences = useSelector(
//     (state: RootState) => state.experience.experiences
//   );

//   // Initialize Formik with Redux data
//   const initialValues: FormValues = {
//     experiences: experiences.length
//       ? experiences
//       : [
//           {
//             id: Date.now().toString(),
//             jobTitle: "",
//             companyName: "",
//             employmentType: "",
//             startDate: "",
//             endDate: "",
//             currentlyWorking: false,
//             responsibilities: "",
//           },
//         ],
//   };

//   // Validate dates
//   const validateDates = (
//     startDate: string,
//     endDate: string,
//     currentlyWorking: boolean
//   ) => {
//     if (currentlyWorking) return true;
//     if (!startDate || !endDate) return false;
//     return new Date(startDate) <= new Date(endDate);
//   };

//   const handleSubmit = (values: FormValues) => {
//     const isValid = values.experiences.every((exp) =>
//       validateDates(exp.startDate, exp.endDate, exp.currentlyWorking)
//     );

//     if (isValid) {
//       // Dispatch each experience to Redux store
//       values.experiences.forEach((exp) => {
//         dispatch(setExperienceInfo(exp));
//       });
//       navigate("/education");
//       window.scrollTo(0, 0);
//     }
//   };

//   const handlePrevious = () => {
//     navigate("/");
//     window.scrollTo(0, 0);
//   };

//   return (
//     <FormContainer title="Work Experience">
//       <Formik
//         initialValues={initialValues}
//         validationSchema={experienceSchema}
//         onSubmit={handleSubmit}
//         enableReinitialize // Reinitialize form when Redux state changes
//       >
//         {({ values, setFieldValue }) => (
//           <Form className="space-y-8">
//             {values.experiences.map((exp, index) => (
//               <div
//                 key={exp.id}
//                 className="rounded-lg p-6 space-y-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
//               >
//                 <div className="flex justify-between items-center pb-1">
//                   <div className="flex items-center">
//                     <div className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 font-medium">
//                       {index + 1}
//                     </div>
//                     <h3 className="text-lg font-semibold text-gray-800">
//                       Work Experience
//                     </h3>
//                   </div>
//                   {values.experiences.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => {
//                         // Dispatch action to remove experience from Redux
//                         dispatch(removeExperienceInfo(exp.id));
//                         // Update Formik state
//                         const newExperiences = values.experiences.filter(
//                           (e) => e.id !== exp.id
//                         );
//                         setFieldValue("experiences", newExperiences);
//                       }}
//                       className="text-red-500 hover:text-red-700 flex items-center text-sm font-medium"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4 mr-1"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                         />
//                       </svg>
//                       Remove
//                     </button>
//                   )}
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                   <TextField
//                     name={`experiences.${index}.jobTitle`}
//                     label="Job Title"
//                     placeholder="e.g. Software Engineer"
//                     required
//                   />
//                   <TextField
//                     name={`experiences.${index}.companyName`}
//                     label="Company Name"
//                     placeholder="e.g. Google"
//                     required
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Employment Type
//                     </label>
//                     <Field
//                       as="select"
//                       name={`experiences.${index}.employmentType`}
//                       className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200"
//                     >
//                       <option value="full-time">Full-time</option>
//                       <option value="part-time">Part-time</option>
//                       <option value="internship">Internship</option>
//                       <option value="contract">Contract</option>
//                       <option value="freelance">Freelance</option>
//                     </Field>
//                   </div>

//                   <div className="flex items-center pt-6">
//                     <Field
//                       type="checkbox"
//                       name={`experiences.${index}.currentlyWorking`}
//                       className="h-5 w-5 text-secondary focus:ring-secondary border-gray-300 rounded"
//                     />
//                     <label className="ml-2 text-sm font-medium text-gray-700">
//                       I currently work here
//                     </label>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                   <TextField
//                     name={`experiences.${index}.startDate`}
//                     label="Start Date"
//                     type="date"
//                     required
//                   />
//                   <TextField
//                     name={`experiences.${index}.endDate`}
//                     label="End Date"
//                     type="date"
//                     required={!exp.currentlyWorking}
//                     disabled={exp.currentlyWorking}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Responsibilities & Achievements
//                   </label>
//                   <Field
//                     as="textarea"
//                     name={`experiences.${index}.responsibilities`}
//                     rows={4}
//                     className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200"
//                     placeholder="Describe your key responsibilities, accomplishments, and skills used in this role..."
//                   />
//                 </div>
//               </div>
//             ))}

//             <button
//               type="button"
//               onClick={() => {
//                 const newExperience = {
//                   id: Date.now().toString(),
//                   jobTitle: "",
//                   companyName: "",
//                   employmentType: "",
//                   startDate: "",
//                   endDate: "",
//                   currentlyWorking: false,
//                   responsibilities: "",
//                 };
//                 // Dispatch action to add new experience to Redux
//                 dispatch(setExperienceInfo(newExperience));
//                 // Update Formik state
//                 setFieldValue("experiences", [
//                   ...values.experiences,
//                   newExperience,
//                 ]);
//               }}
//               className="flex items-center justify-center w-full py-3 px-4 border-2 border-dashed border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white transition-all duration-300 font-medium"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 mr-2"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 6v12m6-6H6"
//                 />
//               </svg>
//               Add Another Work Experience
//             </button>

//             <div className="flex justify-between pt-4 mt-0">
//               <button
//                 type="button"
//                 onClick={handlePrevious}
//                 className="px-5 py-2.5 text-secondary border border-secondary rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium flex items-center"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 mr-1"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 19l-7-7 7-7"
//                   />
//                 </svg>
//                 Previous
//               </button>
//               <button
//                 type="submit"
//                 className="px-6 py-2.5 bg-secondary text-white rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-all duration-200 font-medium flex items-center"
//               >
//                 Next
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5 ml-1"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 5l7 7-7 7"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </FormContainer>
//   );
// };

// export default Experience;

import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import {
  setExperienceInfo,
  removeExperienceInfo,
} from "../store/experienceSlice";
import TextField from "./common/TextField";
import FormContainer from "./FormContainer";
import { ExperienceInfo } from "../store/experienceSlice";
import {
  experienceSchema,
  validateDateRange,
} from "../utils/validationSchemas";
import * as Yup from "yup";

interface FormValues {
  experiences: ExperienceInfo[];
}

// Define the form-level validation schema
const formValidationSchema = Yup.object().shape({
  experiences: Yup.array()
    .of(experienceSchema)
    .min(1, "At least one experience is required"),
});

const Experience = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const experiences = useSelector(
    (state: RootState) => state.experience.experiences
  );

  // Initialize Formik with Redux data
  const initialValues: FormValues = {
    experiences: experiences.length
      ? experiences
      : [
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
        ],
  };

  const handleSubmit = (values: FormValues) => {
    // Log form values before validation
    console.log("Submitting Experience Form:", values);

    // Validate date ranges for all experiences
    const isValid = values.experiences.every((exp, index) => {
      const isDateValid = validateDateRange(
        exp.startDate,
        exp.endDate,
        exp.currentlyWorking
      );
      if (!isDateValid) {
        console.error(
          `Validation Error: Experience ${
            index + 1
          } has invalid date range: Start: ${exp.startDate}, End: ${
            exp.endDate
          }, Currently Working: ${exp.currentlyWorking}`
        );
      }
      return isDateValid;
    });

    // Log validation result
    console.log("Date Range Validation Result:", isValid ? "Valid" : "Invalid");

    if (isValid) {
      // Dispatch each experience to Redux store
      values.experiences.forEach((exp, index) => {
        console.log(`Saving Experience ${index + 1}:`, exp);
        dispatch(setExperienceInfo(exp));
      });
      console.log("Navigating to /education");
      navigate("/education");
      window.scrollTo(0, 0);
    } else {
      console.warn("Form submission blocked due to validation errors");
    }
  };

  const handlePrevious = () => {
    console.log("Navigating to previous page: /");
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <FormContainer title="Work Experience">
      <Formik
        initialValues={initialValues}
        validationSchema={formValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ values, setFieldValue, errors, touched, isValid }) => {
          // Log form values and validation state on render
          console.log("Current Form Values:", values);
          console.log("Is Form Valid:", isValid);
          // Log validation errors when they occur
          if (
            Object.keys(errors).length > 0 &&
            Object.keys(touched).length > 0
          ) {
            console.log("Validation Errors:", errors);
          }
          // Log touched fields to debug interaction
          if (Object.keys(touched).length > 0) {
            console.log("Touched Fields:", touched);
          }

          return (
            <Form className="space-y-8">
              {values.experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className="rounded-lg p-6 space-y-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-center pb-1">
                    <div className="flex items-center">
                      <div className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 font-medium">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Work Experience
                      </h3>
                    </div>
                    {values.experiences.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          console.log(`Removing Experience ${index + 1}`);
                          // Dispatch action to remove experience from Redux
                          dispatch(removeExperienceInfo(exp.id));
                          // Update Formik state
                          const newExperiences = values.experiences.filter(
                            (e) => e.id !== exp.id
                          );
                          setFieldValue("experiences", newExperiences);
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
                      name={`experiences.${index}.jobTitle`}
                      label="Job Title"
                      placeholder="e.g. Software Engineer"
                      required
                    />
                    <TextField
                      name={`experiences.${index}.companyName`}
                      label="Company Name"
                      placeholder="e.g. Google"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employment Type
                      </label>
                      <Field
                        as="select"
                        name={`experiences.${index}.employmentType`}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          console.log(
                            `Employment Type Changed for Experience ${
                              index + 1
                            }: ${e.target.value}`
                          );
                          setFieldValue(
                            `experiences.${index}.employmentType`,
                            e.target.value
                          );
                        }}
                      >
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="internship">Internship</option>
                        <option value="contract">Contract</option>
                        <option value="freelance">Freelance</option>
                      </Field>
                    </div>

                    <div className="flex items-center pt-6">
                      <Field
                        type="checkbox"
                        name={`experiences.${index}.currentlyWorking`}
                        className="h-5 w-5 text-secondary focus:ring-secondary border-gray-300 rounded"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          console.log(
                            `Currently Working Changed for Experience ${
                              index + 1
                            }: ${e.target.checked}`
                          );
                          setFieldValue(
                            `experiences.${index}.currentlyWorking`,
                            e.target.checked
                          );
                        }}
                      />
                      <label className="ml-2 text-sm font-medium text-gray-700">
                        I currently work here
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <TextField
                      name={`experiences.${index}.startDate`}
                      label="Start Date"
                      type="date"
                      required
                    />
                    <TextField
                      name={`experiences.${index}.endDate`}
                      label="End Date"
                      type="date"
                      required={!exp.currentlyWorking}
                      disabled={exp.currentlyWorking}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Responsibilities & Achievements
                    </label>
                    <Field
                      as="textarea"
                      name={`experiences.${index}.responsibilities`}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200"
                      placeholder="Describe your key responsibilities, accomplishments, and skills used in this role..."
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  console.log("Adding new experience");
                  const newExperience = {
                    id: Date.now().toString(),
                    jobTitle: "",
                    companyName: "",
                    employmentType: "",
                    startDate: "",
                    endDate: "",
                    currentlyWorking: false,
                    responsibilities: "",
                  };
                  // Dispatch action to add new experience to Redux
                  dispatch(setExperienceInfo(newExperience));
                  // Update Formik state
                  setFieldValue("experiences", [
                    ...values.experiences,
                    newExperience,
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
                Add Another Work Experience
              </button>

              <div className="flex justify-between pt-4 mt-0">
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
          );
        }}
      </Formik>
    </FormContainer>
  );
};

export default Experience;
