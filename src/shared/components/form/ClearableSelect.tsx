import { SelectHTMLAttributes } from "react";
import { XIcon } from "shared/components/icons";
import "shared/components/form/ClearableSelect.scss";

export interface ClearableSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange"> {
  value: string;
  onChange: (value: string) => void;
}

const ClearableSelect = ({ value, onChange, className, children, ...rest }: ClearableSelectProps) => {
  return (
    <div className="clearable-select">
      <select
        {...rest}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`clearable-select__select${className ? ` ${className}` : ""}`}
      >
        {children}
      </select>
      {value !== "" && (
        <button
          type="button"
          className="clearable-select__clear"
          aria-label="Réinitialiser"
          onClick={() => onChange("")}
        >
          <XIcon />
        </button>
      )}
    </div>
  );
};

export default ClearableSelect;
