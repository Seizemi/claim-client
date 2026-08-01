import { ReactNode } from "react";
import "shared/components/form/FormRow.scss";

export interface FormRowProps {
  label: string;
  children: ReactNode;
}

const FormRow = ({ label, children }: FormRowProps) => {
  return (
    <div className="form-row">
      <span className="form-row__label">{label}</span>
      <div className="form-row__control">{children}</div>
    </div>
  );
};

export default FormRow;
