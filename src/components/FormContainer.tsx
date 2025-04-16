import { ReactNode } from "react";

interface FormContainerProps {
  children: ReactNode;
  title: string;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

const FormContainer = ({
  children,
  title,
  maxWidth = "lg",
}: FormContainerProps) => {
  const maxWidthClasses = {
    sm: "max-w-2xl",
    md: "max-w-3xl",
    lg: "max-w-4xl",
    xl: "max-w-5xl",
  };

  return (
    <div
      className={`w-full ${maxWidthClasses[maxWidth]} bg-gray-white rounded-2xl shadow-xl p-8`}
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-secondary">
        {title}
      </h2>
      {children}
    </div>
  );
};

export default FormContainer;
