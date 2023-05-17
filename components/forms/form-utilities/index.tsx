import style from "./index.style.module.scss";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

export function Fieldset({ className = "", disabled = false, children }) {
  return (
    <fieldset
      className={`${style.fieldset} ${className} radius-md `}
      disabled={disabled}
    >
      {children}
    </fieldset>
  );
}

export function ControlGroup({ className, children }) {
  return <div className={`${style.controlGroup} ${className}`}>{children}</div>;
}

export function FormRow({ children }) {
  return (
    <div className="flex-r wrap justify-between gap-md full-width">
      {children}
    </div>
  );
}

export function FieldsetHeader({
  title = "Information",
  callback = () => {},
  isOpen = false,
}: {
  title?: string;
  callback?: Function;
  isOpen?: boolean;
}) {
  return (
    <div>
      <button
        onClick={() => callback()}
        type="button"
        value="show/hide"
        className={`${style.fieldsetHeaderButton} flex-r wrap gap-sm full-width justify-between align-center`}
      >
        <h2>{title}</h2>

        {!isOpen ? <BsChevronDown /> : <BsChevronUp />}
      </button>
    </div>
  );
}

export function Collapsible({
  show = false,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      {show && (
        <div className={`${style.collapsible} flex-c gap-md`}>{children}</div>
      )}
    </>
  );
}
