import { Field, ErrorMessage } from "formik";

interface TextFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

const TextField = ({
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  className = "",
  disabled = false,
}: TextFieldProps) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required}
      </label>
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-secondary ${className} ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
      />
      <ErrorMessage
        name={name}
        component="p"
        className="text-primary text-sm mt-1"
      />
    </div>
  );
};

export default TextField;
