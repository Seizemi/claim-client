import { ReactNode, useEffect } from "react";
import { XIcon } from "shared/components/icons";
import "shared/components/Dialog/Dialog.scss";

export interface DialogProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

// Modal shown above the page: closes on Escape, on the close button and on a click outside.
const Dialog = ({ title, onClose, children }: DialogProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="dialog" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="dialog__panel" role="dialog" aria-modal="true" aria-label={title}>
        <header className="dialog__header">
          <h2 className="dialog__title">{title}</h2>
          <button type="button" className="dialog__close" onClick={onClose} aria-label="Fermer">
            <XIcon />
          </button>
        </header>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
