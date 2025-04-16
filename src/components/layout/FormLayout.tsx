import { ReactNode } from "react";
import FormStepper from "./FormStepper";

interface FormLayoutProps {
  children: ReactNode;
}

const FormLayout = ({ children }: FormLayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto pt-3 px-3">
        <FormStepper />
        <div className="mt-16 flex items-center justify-center">{children}</div>
      </div>
    </div>
  );
};

export default FormLayout;
