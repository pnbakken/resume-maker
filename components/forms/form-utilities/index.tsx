import style from "./index.style.module.scss";
import { BsChevronDown } from "react-icons/bs";

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

export function ControlGroup({ children }) {
  return <div className={`${style.controlGroup}`}>{children}</div>;
}

export function FormRow({ children }) {
  return <div className="flex-r wrap justify-between gap-md">{children}</div>;
}

export function FieldsetHeader({
  title = "Information",
  callback = () => {},
}: {
  title?: string;
  callback?: Function;
}) {
  return (
    <div className="flex-r wrap gap-sm full-width justify-between align-center">
      <div>
        <h2>{title}</h2>
      </div>
      <div className="flex-r align-center">
        <button onClick={() => callback()} type="button" value="show/hide">
          <BsChevronDown />
        </button>
      </div>
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
