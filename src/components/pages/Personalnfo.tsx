// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { type PersonalInfo } from "../../store/slice/personalInfoSlice";
// import { setPersonalInfo } from "../../store/slice/personalInfoSlice";
// import { RootState } from "../../store/store";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import FormContainer from "../layout/FormContainer";
// import { personalInfoSchema } from "../../utils/validationSchemas";
// import Select from "../common/inputs/Select";

// const PersonalInfo = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const savedPersonalInfo = useSelector(
//     (state: RootState) => state.personalInfo
//   );

//   const initialValues: PersonalInfo = {
//     fullName: savedPersonalInfo.fullName || "",
//     email: savedPersonalInfo.email || "",
//     phone: savedPersonalInfo.phone || "",
//     dob: savedPersonalInfo.dob || "",
//     gender: savedPersonalInfo.gender || "",
//     location: savedPersonalInfo.location || "",
//     age: savedPersonalInfo.age || null,
//     educationLevel: savedPersonalInfo.educationLevel || "",
//   };

//   const calculateAge = (dob: string) => {
//     if (!dob) return null;
//     const birthDate = new Date(dob);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();

//     if (
//       monthDiff < 0 ||
//       (monthDiff === 0 && today.getDate() < birthDate.getDate())
//     ) {
//       age--;
//     }
//     return age;
//   };

//   const handleSubmit = (values: PersonalInfo) => {
//     const age = calculateAge(values.dob);
//     const formDataWithAge = { ...values, age };
//     console.log("Submitting Personal Info:", formDataWithAge);

//     // Save to Redux
//     dispatch(setPersonalInfo(formDataWithAge));
//     navigate("/experience");
//     window.scrollTo(0, 0);
//   };

//   return (
//     <FormContainer title="Personal Information">
//       <Formik
//         initialValues={initialValues}
//         validationSchema={personalInfoSchema}
//         onSubmit={handleSubmit}
//         validateOnChange={true}
//         validateOnBlur={true}
//       >
//         {({ errors, touched, values }) => {
//           // Log form values for debugging
//           console.log("Current Form Values:", values);
//           // Log errors if present
//           if (
//             Object.keys(errors).length > 0 &&
//             Object.keys(touched).length > 0
//           ) {
//             console.log("Validation Errors:", errors);
//           }

//           return (
//             <Form>
//               <div className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg p-6 space-y-6">
//                 <div className="flex items-center pb-2 mb-2">
//                   <div className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 font-medium">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                       />
//                     </svg>
//                   </div>
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     Basic Details
//                   </h3>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                   <div>
//                     <label
//                       htmlFor="fullName"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Full Name
//                     </label>
//                     <Field
//                       type="text"
//                       id="fullName"
//                       name="fullName"
//                       className={`w-full px-4 py-3 rounded-lg border ${
//                         errors.fullName && touched.fullName
//                           ? "border-primary bg-red-50"
//                           : "border-gray-300"
//                       } focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200`}
//                       placeholder="John Doe"
//                     />
//                     <ErrorMessage
//                       name="fullName"
//                       component="p"
//                       className="text-primary text-sm mt-1"
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="email"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Email
//                     </label>
//                     <Field
//                       type="email"
//                       id="email"
//                       name="email"
//                       className={`w-full px-4 py-3 rounded-lg border ${
//                         errors.email && touched.email
//                           ? "border-primary bg-red-50"
//                           : "border-gray-300"
//                       } focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200`}
//                       placeholder="you@example.com"
//                     />
//                     <ErrorMessage
//                       name="email"
//                       component="p"
//                       className="text-primary text-sm mt-1"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                   <div>
//                     <label
//                       htmlFor="phone"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Phone Number
//                     </label>
//                     <div className="relative">
//                       <Field
//                         type="tel"
//                         id="phone"
//                         name="phone"
//                         className={`w-full px-4 py-3 rounded-lg border ${
//                           errors.phone && touched.phone
//                             ? "border-primary bg-red-50"
//                             : "border-gray-300"
//                         } focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200`}
//                         placeholder="+91 1234567890"
//                       />
//                       <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className={`h-5 w-5 ${
//                             errors.phone && touched.phone
//                               ? "text-primary"
//                               : "text-gray-400"
//                           }`}
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                           />
//                         </svg>
//                       </div>
//                     </div>
//                     <ErrorMessage
//                       name="phone"
//                       component="p"
//                       className="text-primary text-sm mt-1"
//                     />
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="dob"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Date of Birth
//                     </label>
//                     <div className="relative">
//                       <Field
//                         type="date"
//                         id="dob"
//                         name="dob"
//                         className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200"
//                       />
//                       <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-5 w-5 text-gray-400"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                           />
//                         </svg>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                   {/* Gender Select */}
//                   <Select
//                     name="gender"
//                     label="Gender"
//                     options={[
//                       { value: "", label: "Select Gender" }, // Add empty option if needed
//                       { value: "male", label: "Male" },
//                       { value: "female", label: "Female" },
//                       { value: "other", label: "Other" },
//                       {
//                         value: "prefer-not-to-say",
//                         label: "Prefer not to say",
//                       },
//                     ]}
//                   />
//                   {/* Education Level Select */}
//                   <Select
//                     name="educationLevel"
//                     label="Education Level"
//                     required
//                     options={[
//                       { value: "", label: "Select Education Level" },
//                       { value: "high-school", label: "High School" },
//                       { value: "diploma", label: "Diploma" },
//                       { value: "bachelors", label: "Bachelor's Degree" },
//                       { value: "graduate", label: "Graduate" },
//                     ]}
//                   />
//                   <div>
//                     <label
//                       htmlFor="location"
//                       className="block text-sm font-medium text-gray-700 mb-1"
//                     >
//                       Current Location
//                     </label>
//                     <div className="relative">
//                       <Field
//                         type="text"
//                         id="location"
//                         name="location"
//                         className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200"
//                         placeholder="New York, USA"
//                       />
//                       <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-5 w-5 text-gray-400"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                           />
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                           />
//                         </svg>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-8">
//                   <button
//                     type="submit"
//                     className="bg-secondary w-full text-white py-3 px-4 rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 font-medium flex items-center justify-center transition-all duration-200"
//                   >
//                     Continue to Work Experience
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 ml-1"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M9 5l7 7-7 7"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             </Form>
//           );
//         }}
//       </Formik>
//     </FormContainer>
//   );
// };

// export default PersonalInfo;

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { type PersonalInfo } from "../../store/slice/personalInfoSlice";
import { setPersonalInfo } from "../../store/slice/personalInfoSlice";
import { RootState } from "../../store/store";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FormContainer from "../layout/FormContainer";
import { personalInfoSchema } from "../../utils/validationSchemas";
import Select from "../common/inputs/Select";

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedPersonalInfo = useSelector(
    (state: RootState) => state.personalInfo
  );

  const initialValues: PersonalInfo = {
    fullName: savedPersonalInfo.fullName || "",
    email: savedPersonalInfo.email || "",
    phone: savedPersonalInfo.phone || "",
    dob: savedPersonalInfo.dob || "",
    gender: savedPersonalInfo.gender || "",
    location: savedPersonalInfo.location || "",
    age: savedPersonalInfo.age || null,
    educationLevel: savedPersonalInfo.educationLevel || "",
  };

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

  const handleSubmit = (values: PersonalInfo) => {
    const age = calculateAge(values.dob);
    const formDataWithAge = { ...values, age };
    console.log("Submitting Personal Info:", formDataWithAge);

    // Save to Redux
    dispatch(setPersonalInfo(formDataWithAge));
    navigate("/experience");
    window.scrollTo(0, 0);
  };

  return (
    <FormContainer title="Personal Information">
      <Formik
        initialValues={initialValues}
        validationSchema={personalInfoSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ errors, touched, values, setFieldValue }) => {
          // Log form values for debugging
          console.log("Current Form Values:", values);
          // Log errors if present
          if (
            Object.keys(errors).length > 0 &&
            Object.keys(touched).length > 0
          ) {
            console.log("Validation Errors:", errors);
          }

          return (
            <Form>
              <div className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg p-6 space-y-6">
                <div className="flex items-center pb-2 mb-2">
                  <div className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 font-medium">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Basic Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <Field
                      type="text"
                      id="fullName"
                      name="fullName"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.fullName && touched.fullName
                          ? "border-primary bg-red-50"
                          : "border-gray-300"
                      } focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200`}
                      placeholder="John Doe"
                    />
                    <ErrorMessage
                      name="fullName"
                      component="p"
                      className="text-primary text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.email && touched.email
                          ? "border-primary bg-red-50"
                          : "border-gray-300"
                      } focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200`}
                      placeholder="you@example.com"
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-primary text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <Field
                        type="tel"
                        id="phone"
                        name="phone"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.phone && touched.phone
                            ? "border-primary bg-red-50"
                            : "border-gray-300"
                        } focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200`}
                        placeholder="+91 1234567890"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-5 ${
                            errors.phone && touched.phone
                              ? "text-primary"
                              : "text-gray-400"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                    </div>
                    <ErrorMessage
                      name="phone"
                      component="p"
                      className="text-primary text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="dob"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Date of Birth
                    </label>
                    <div className="relative">
                      <Field
                        type="date"
                        id="dob"
                        name="dob"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const dob = e.target.value;
                          setFieldValue("dob", dob);
                          const age = calculateAge(dob);
                          setFieldValue("age", age);
                        }}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </div>
                    </div>
                    {values.dob && (
                      <p className="text-sm text-gray-600 mt-1">
                        Calculated Age: {values.age ?? "N/A"}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Gender Select */}
                  <Select
                    name="gender"
                    label="Gender"
                    options={[
                      { value: "", label: "Select Gender" },
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "other", label: "Other" },
                      {
                        value: "prefer-not-to-say",
                        label: "Prefer not to say",
                      },
                    ]}
                  />
                  {/* Education Level Select */}
                  <Select
                    name="educationLevel"
                    label="Education Level"
                    required
                    options={[
                      { value: "", label: "Select Education Level" },
                      { value: "high-school", label: "High School" },
                      { value: "diploma", label: "Diploma" },
                      { value: "bachelors", label: "Bachelor's Degree" },
                      { value: "graduate", label: "Graduate" },
                    ]}
                  />
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Current Location
                    </label>
                    <div className="relative">
                      <Field
                        type="text"
                        id="location"
                        name="location"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200"
                        placeholder="New York, USA"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    className="bg-secondary w-full text-white py-3 px-4 rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 font-medium flex items-center justify-center transition-all duration-200"
                  >
                    Continue to Work Experience
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
              </div>
            </Form>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

export default PersonalInfo;
