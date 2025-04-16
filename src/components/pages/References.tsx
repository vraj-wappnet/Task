import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setReferences,
  setSkipReferences,
  Reference,
} from "../../store/slice/referencesSlice";
import { RootState, AppDispatch } from "../../store/store";
import { Formik, Form, Field } from "formik";
import TextField from "../common/TextField";
import FormContainer from "../layout/FormContainer";
import {
  referencesFormSchema,
  validateEmail,
  validatePhoneNumber,
} from "../../utils/validationSchemas";

interface FormValues {
  skipReferences: boolean;
  references: Reference[];
}

const References = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const storedReferences = useSelector(
    (state: RootState) => state.references.references
  );
  const storedSkipStatus = useSelector(
    (state: RootState) => state.references.skipReferences
  );

  const initialValues: FormValues = {
    skipReferences: storedSkipStatus,
    references:
      storedReferences.length > 0
        ? storedReferences
        : [
            {
              id: "1",
              name: "",
              relationship: "",
              company: "",
              contact: "",
            },
          ],
  };

  const handleSubmit = (values: FormValues) => {
    // Log form values before validation
    console.log("Submitting References Form:", values);

    // Validate contact information if references are not skipped
    const isValid =
      values.skipReferences ||
      values.references.every((ref, index) => {
        const isContactValid =
          validateEmail(ref.contact) || validatePhoneNumber(ref.contact);
        if (!isContactValid) {
          console.error(
            `Validation Error: Reference ${index + 1} has invalid contact: ${
              ref.contact
            }`
          );
        }
        return isContactValid;
      });

    // Log validation result
    console.log("Contact Validation Result:", isValid ? "Valid" : "Invalid");

    if (isValid) {
      if (values.skipReferences) {
        console.log("Skipping references, clearing stored references");
        dispatch(setSkipReferences(true));
        dispatch(setReferences([]));
      } else {
        console.log("Saving references:", values.references);
        dispatch(setReferences(values.references));
        dispatch(setSkipReferences(false));
      }
      navigate("/summary");
      window.scrollTo(0, 0);
    } else {
      console.warn("Form submission blocked due to validation errors");
    }
  };

  const handlePrevious = () => {
    console.log("Navigating to previous page: /skills");
    navigate("/skills");
    window.scrollTo(0, 0);
  };

  return (
    <FormContainer title="Professional References">
      <Formik
        initialValues={initialValues}
        validationSchema={referencesFormSchema}
        onSubmit={handleSubmit}
        validateOnChange={true} // Ensure validation runs on field changes
        validateOnBlur={true} // Ensure validation runs on field blur
      >
        {({ values, setFieldValue, errors, touched }) => {
          // Log validation errors when they occur
          if (
            Object.keys(errors).length > 0 &&
            Object.keys(touched).length > 0
          ) {
            console.log("Validation Errors:", errors);
          }

          return (
            <Form className="space-y-6">
              {/* Skip References Checkbox */}
              <div className="flex items-center mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <Field
                  type="checkbox"
                  id="skipReferences"
                  name="skipReferences"
                  className="h-5 w-5 text-secondary focus:ring-secondary border-gray-300 rounded cursor-pointer"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    console.log(
                      "Skip References Checkbox Changed:",
                      e.target.checked
                    );
                    setFieldValue("skipReferences", e.target.checked);
                    if (e.target.checked) {
                      console.log("Clearing references due to skip");
                      setFieldValue("references", []);
                    }
                  }}
                />
                <label
                  htmlFor="skipReferences"
                  className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Skip adding references for now
                </label>
              </div>

              {!values.skipReferences && (
                <div className="space-y-8">
                  {values.references.map((ref, index) => (
                    <div
                      key={ref.id}
                      className="rounded-lg p-6 space-y-5 bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Reference {index + 1}
                        </h3>
                        {values.references.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              console.log(`Removing Reference ${index + 1}`);
                              setFieldValue(
                                "references",
                                values.references.filter((r) => r.id !== ref.id)
                              );
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
                          name={`references.${index}.name`}
                          label="Full Name"
                          placeholder="Jane Smith"
                          required
                        />
                        <TextField
                          name={`references.${index}.relationship`}
                          label="Professional Relationship"
                          placeholder="Former Manager"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <TextField
                          name={`references.${index}.company`}
                          label="Company / Organization"
                          placeholder="Acme Corporation"
                          required
                        />
                        <TextField
                          name={`references.${index}.contact`}
                          label="Contact Information"
                          placeholder="email@example.com or (555) 123-4567"
                          required
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      console.log("Adding new reference");
                      setFieldValue("references", [
                        ...values.references,
                        {
                          id: Date.now().toString(),
                          name: "",
                          relationship: "",
                          company: "",
                          contact: "",
                        },
                      ]);
                    }}
                    className="flex items-center justify-center w-full md:w-auto py-2 px-4 border border-dashed border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white transition-all duration-300 font-medium"
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add Another Reference
                  </button>
                </div>
              )}

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

export default References;
