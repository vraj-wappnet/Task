// import React from "react";
// import { Field } from "formik";

// interface SelectProps {
//   name: string;
//   label: string;
//   options: Array<{ value: string; label: string }>;
//   required?: boolean;
//   disabled?: boolean;
//   className?: string;
//   onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
// }

// const Select: React.FC<SelectProps> = ({
//   name,
//   label,
//   options,
//   required = false,
//   disabled = false,
//   className = "",
//   onChange,
// }) => {
//   return (
//     <div className="w-full">
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         {label}
//         {required && <span className="text-red-500 ml-1">*</span>}
//       </label>
//       <Field
//         as="select"
//         name={name}
//         disabled={disabled}
//         className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200 ${className}`}
//         onChange={onChange}
//       >
//         <option value="">Select an option</option>
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </Field>
//     </div>
//   );
// };

// export default Select;
import React from "react";
import { Field, useField } from "formik";

interface SelectProps {
  name: string;
  label: string;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  name,
  label,
  options,
  required = false,
  disabled = false,
  className = "",
}) => {
  const [field, meta] = useField(name);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Field
        as="select"
        name={name}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-lg border ${
          meta.error && meta.touched
            ? "border-primary bg-red-50"
            : "border-gray-300"
        } focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200 ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      {meta.error && meta.touched && (
        <p className="text-primary text-sm mt-1">{meta.error}</p>
      )}
    </div>
  );
};

export default Select;
