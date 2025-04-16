import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setReferences,
  setSkipReferences,
  Reference,
} from "../store/referencesSlice";
import { RootState, AppDispatch } from "../store/store";

const References = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const storedReferences = useSelector(
    (state: RootState) => state.references.references
  );
  const storedSkipStatus = useSelector(
    (state: RootState) => state.references.skipReferences
  );

  const [skipReferences, setLocalSkipReferences] = useState(storedSkipStatus);
  const [references, setLocalReferences] = useState<Reference[]>(
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
        ]
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Load saved references from localStorage when component mounts
  useEffect(() => {
    const savedReferences = localStorage.getItem("references");
    const savedSkipStatus = localStorage.getItem("skipReferences");
    if (savedReferences) {
      setLocalReferences(JSON.parse(savedReferences));
    }
    if (savedSkipStatus) {
      setLocalSkipReferences(JSON.parse(savedSkipStatus));
    }
  }, []);

  const handleReferenceChange = (
    id: string,
    field: keyof Reference,
    value: string
  ) => {
    setLocalReferences((prev) =>
      prev.map((ref) => {
        if (ref.id === id) {
          return { ...ref, [field]: value };
        }
        return ref;
      })
    );
  };

  const addReference = () => {
    setLocalReferences((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: "",
        relationship: "",
        company: "",
        contact: "",
      },
    ]);
  };

  const removeReference = (id: string) => {
    if (references.length > 1) {
      setLocalReferences((prev) => prev.filter((ref) => ref.id !== id));
    }
  };

  const handlePrevious = () => {
    navigate("/skills");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");

    if (skipReferences) {
      console.log("Skipping references");
      dispatch(setSkipReferences(true));
      dispatch(setReferences([]));
      localStorage.setItem("skipReferences", JSON.stringify(true));
      localStorage.removeItem("references");
      navigate("/summary");
      return;
    }

    // Validate references
    const newErrors: { [key: string]: string } = {};
    references.forEach((ref) => {
      if (!ref.name) newErrors[`${ref.id}-name`] = "Name is required";
      if (!ref.relationship)
        newErrors[`${ref.id}-relationship`] = "Relationship is required";
      if (!ref.company) newErrors[`${ref.id}-company`] = "Company is required";
      if (!ref.contact) newErrors[`${ref.id}-contact`] = "Contact is required";
    });

    setErrors(newErrors);
    console.log("Validation errors:", newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("No errors, proceeding with submission");
      dispatch(setReferences(references));
      dispatch(setSkipReferences(false));
      localStorage.setItem("references", JSON.stringify(references));
      localStorage.setItem("skipReferences", JSON.stringify(false));
      navigate("/summary");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center text-secondary">
          References
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Skip References Checkbox */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="skipReferences"
              checked={skipReferences}
              onChange={(e) => setLocalSkipReferences(e.target.checked)}
              className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
            />
            <label
              htmlFor="skipReferences"
              className="ml-2 block text-sm text-gray-700"
            >
              Skip adding references
            </label>
          </div>

          {!skipReferences && (
            <>
              {references.map((ref, index) => (
                <div key={ref.id} className="rounded-lg p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                      Reference {index + 1}
                    </h3>
                    {references.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeReference(ref.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Reference Name *
                      </label>
                      <input
                        type="text"
                        value={ref.name}
                        onChange={(e) =>
                          handleReferenceChange(ref.id, "name", e.target.value)
                        }
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors[`${ref.id}-name`]
                            ? "border-primary"
                            : "border-gray-300"
                        } focus:ring-2 focus:ring-secondary focus:border-secondary`}
                        required
                      />
                      {errors[`${ref.id}-name`] && (
                        <p className="text-primary text-sm mt-1">
                          {errors[`${ref.id}-name`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Relationship *
                      </label>
                      <input
                        type="text"
                        value={ref.relationship}
                        onChange={(e) =>
                          handleReferenceChange(
                            ref.id,
                            "relationship",
                            e.target.value
                          )
                        }
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors[`${ref.id}-relationship`]
                            ? "border-primary"
                            : "border-gray-300"
                        } focus:ring-2 focus:ring-secondary focus:border-secondary`}
                        required
                      />
                      {errors[`${ref.id}-relationship`] && (
                        <p className="text-primary text-sm mt-1">
                          {errors[`${ref.id}-relationship`]}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company *
                      </label>
                      <input
                        type="text"
                        value={ref.company}
                        onChange={(e) =>
                          handleReferenceChange(
                            ref.id,
                            "company",
                            e.target.value
                          )
                        }
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors[`${ref.id}-company`]
                            ? "border-primary"
                            : "border-gray-300"
                        } focus:ring-2 focus:ring-secondary focus:border-secondary`}
                        required
                      />
                      {errors[`${ref.id}-company`] && (
                        <p className="text-primary text-sm mt-1">
                          {errors[`${ref.id}-company`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone/Email *
                      </label>
                      <input
                        type="text"
                        value={ref.contact}
                        onChange={(e) =>
                          handleReferenceChange(
                            ref.id,
                            "contact",
                            e.target.value
                          )
                        }
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors[`${ref.id}-contact`]
                            ? "border-primary"
                            : "border-gray-300"
                        } focus:ring-2 focus:ring-secondary focus:border-secondary`}
                        required
                      />
                      {errors[`${ref.id}-contact`] && (
                        <p className="text-primary text-sm mt-1">
                          {errors[`${ref.id}-contact`]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addReference}
                className="w-2/8 py-2 px-3 border border-secondary text-white rounded-lg bg-secondary"
              >
                Add More References
              </button>
            </>
          )}

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

export default References;
