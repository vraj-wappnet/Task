import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPersonalInfo } from "../store/personalInfoSlice";
import { RootState } from "../store/store";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  location: string;
  age: number | null;
  educationLevel: string;
}

interface FormErrors {
  fullName: string;
  email: string;
  phone: string;
  location: string;
}

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedPersonalInfo = useSelector(
    (state: RootState) => state.personalInfo
  );

  const [formData, setFormData] = useState<FormData>({
    fullName: savedPersonalInfo.fullName || "",
    email: savedPersonalInfo.email || "",
    phone: savedPersonalInfo.phone || "",
    dob: savedPersonalInfo.dob || "",
    gender: savedPersonalInfo.gender || "",
    location: savedPersonalInfo.location || "",
    age: savedPersonalInfo.age || null,
    educationLevel: savedPersonalInfo.educationLevel || "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("personalInfo");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
    }
  }, []);

  const validateName = (name: string) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+\d{1,3}\s?\d{6,14}$/;
    return phoneRegex.test(phone);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "fullName") {
      setErrors((prev) => ({
        ...prev,
        fullName: validateName(value)
          ? ""
          : "Name should contain only letters and spaces",
      }));
    } else if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? "" : "Please enter a valid email address",
      }));
    } else if (name === "phone") {
      setErrors((prev) => ({
        ...prev,
        phone: validatePhone(value)
          ? ""
          : "Please enter a valid international phone number (e.g., +91 1234567890)",
      }));
    }

    if (name === "dob") {
      const age = calculateAge(value);
      setFormData((prev) => ({ ...prev, age }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {
      fullName: validateName(formData.fullName)
        ? ""
        : "Name should contain only letters and spaces",
      email: validateEmail(formData.email)
        ? ""
        : "Please enter a valid email address",
      phone: validatePhone(formData.phone)
        ? ""
        : "Please enter a valid international phone number",
      location: "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      // Save to Redux
      dispatch(setPersonalInfo(formData));

      localStorage.setItem("personalInfo", JSON.stringify(formData));

      navigate("/experience");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center text-secondary">
          Personal Information
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.fullName ? "border-primary" : " "
                } focus:ring-1 focus:ring-secondary focus:border-secondary     `}
                required
                placeholder="John Doe"
              />
              {errors.fullName && (
                <p className="text-primary text-sm mt-1">{errors.fullName}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? "border-primary" : " "
                } focus:ring-1 focus:ring-secondary focus:border-secondary     `}
                required
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-primary text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
                aria-label="phone"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.phone ? "border-primary" : " "
                } focus:ring-1 focus:ring-secondary focus:border-secondary     `}
                required
                placeholder="+91 1234567890"
              />
              {errors.phone && (
                <p className="text-primary text-sm mt-1">{errors.phone}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border  focus:ring-1 focus:ring-secondary focus:border-secondary"
              />
              {formData.age !== null && (
                <p className="text-sm text-gray-600 mt-2">
                  Age: {formData.age} years
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border   focus:ring-1 focus:ring-secondary focus:border-secondary     "
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Current Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border focus:ring-1 focus:ring-secondary focus:border-secondary     "
                placeholder="New York, USA"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="educationLevel"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Education Level *
            </label>
            <select
              id="educationLevel"
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border focus:ring-1 focus:ring-secondary focus:border-secondary"
              required
            >
              <option value="">Select Education Level</option>
              <option value="high-school">High School</option>
              <option value="diploma">Diploma</option>
              <option value="bachelors">Bachelor's Degree</option>
              <option value="graduate">Graduate</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-secondary w-full text-white py-3 px-4 rounded-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2      font-medium"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;
