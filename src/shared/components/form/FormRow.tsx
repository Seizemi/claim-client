import { ReactNode, useId } from "react";
import "shared/components/form/FormRow.scss";

export interface FormRowProps {
  label: string;
  children: ReactNode;
}

// A group named by the label and not a <label>: a row can hold several controls, such as a select and its clear button.
const FormRow = ({ label, children }: FormRowProps) => {
  const labelId = useId();

  return (
    <div className="form-row">
      <span id={labelId} className="form-row__label">
        {label}
      </span>
      <div className="form-row__control" role="group" aria-labelledby={labelId}>
        {children}
      </div>
    </div>
  );
};

export default FormRow;
