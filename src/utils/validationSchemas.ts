import * as Yup from "yup";
import { Skill } from "../components/Skills";

// Common validation patterns
const commonValidations = {
  requiredString: (fieldName: string) =>
    Yup.string().required(`${fieldName} is required`),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(
      /^\+\d{1,3}\s?\d{6,14}$/,
      "Please enter a valid international phone number"
    )
    .required("Phone number is required"),
  year: Yup.string()
    .matches(/^\d{4}$/, "Year must be in YYYY format")
    .test("isValidYear", "Invalid year", (value) => {
      if (!value) return true;
      const year = parseInt(value);
      const currentYear = new Date().getFullYear();
      return year >= 1900 && year <= currentYear;
    }),
  date: Yup.string().required("Date is required"),
};

// Personal Info Validation Schema
export const personalInfoSchema = Yup.object().shape({
  fullName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Name should contain only letters and spaces")
    .required("Full Name is required"),
  email: commonValidations.email,
  phone: commonValidations.phone,
  location: Yup.string(),
  dob: commonValidations.date,
  gender: Yup.string(),
  educationLevel: Yup.string().required("Education Level is required"),
});

// Experience Validation Schema
export const experienceSchema = Yup.object().shape({
  jobTitle: commonValidations.requiredString("Job title"),
  companyName: commonValidations.requiredString("Company name"),
  employmentType: commonValidations.requiredString("Employment type"),
  startDate: commonValidations.date,
  endDate: Yup.string().when("currentlyWorking", {
    is: false,
    then: (schema) => schema.required("End date is required"),
    otherwise: (schema) => schema,
  }),
  responsibilities: Yup.string(),
});

// Education Validation Schema
export const educationSchema = Yup.object().shape({
  schoolName: commonValidations.requiredString("School name"),
  degree: commonValidations.requiredString("Degree"),
  fieldOfStudy: Yup.string(),
  startYear: commonValidations.year.required("Start year is required"),
  endYear: commonValidations.year
    .required("End year is required")
    .test(
      "isAfterStart",
      "End year must be after start year",
      function (value) {
        const startYear = this.parent.startYear;
        if (!startYear || !value) return true;
        return parseInt(value) >= parseInt(startYear);
      }
    ),
  grade: Yup.string(),
  certificates: Yup.array().of(Yup.mixed()),
});

// Skills Validation Schema
export const skillsSchema = Yup.object().shape({
  skills: Yup.array().of(
    Yup.object().shape({
      name: commonValidations.requiredString("Skill name"),
      yearsOfExperience: Yup.number()
        .min(0, "Experience cannot be negative")
        .max(50, "Experience cannot be more than 50 years")
        .nullable(),
    })
  ),
  customSkill: Yup.string().when("skills", {
    is: (skills: Skill[]) => skills.length === 0,
    then: (schema) => schema.required("At least one skill is required"),
    otherwise: (schema) => schema,
  }),
});

// References Validation Schema
export const referenceSchema = Yup.object().shape({
  name: commonValidations.requiredString("Name"),
  relationship: commonValidations.requiredString("Relationship"),
  company: commonValidations.requiredString("Company"),
  contact: commonValidations.requiredString("Contact"),
});

export const referencesFormSchema = Yup.object().shape({
  skipReferences: Yup.boolean(),
  references: Yup.array()
    .of(referenceSchema)
    .when("skipReferences", {
      is: false,
      then: (schema) => schema.min(1, "At least one reference is required"),
      otherwise: (schema) => schema,
    }),
});

// Form Validation Schemas
export const formSchemas = {
  personalInfo: personalInfoSchema,
  experience: Yup.object().shape({
    experiences: Yup.array().of(experienceSchema),
  }),
  education: Yup.object().shape({
    educations: Yup.array().of(educationSchema),
  }),
  skills: skillsSchema,
  references: referencesFormSchema,
};

// Helper functions for validation
export const validateDateRange = (
  startDate: string,
  endDate: string,
  currentlyWorking: boolean
) => {
  if (currentlyWorking) return true;
  if (!startDate || !endDate) return false;
  return new Date(startDate) <= new Date(endDate);
};

export const validateYearRange = (startYear: string, endYear: string) => {
  if (!startYear || !endYear) return true;
  return parseInt(endYear) >= parseInt(startYear);
};

export const validatePhoneNumber = (phone: string) => {
  const phoneRegex = /^\+\d{1,3}\s?\d{6,14}$/;
  return phoneRegex.test(phone);
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
