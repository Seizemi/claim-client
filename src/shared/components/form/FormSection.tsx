import { ReactNode } from "react";
import "shared/components/form/FormSection.scss";

export interface FormSectionProps {
  title: string;
  children: ReactNode;
}

const FormSection = ({ title, children }: FormSectionProps) => {
  return (
    <div className="form-section">
      <h2 className="form-section__title">{title}</h2>
      <div className="form-section__card">{children}</div>
    </div>
  );
};

export default FormSection;
