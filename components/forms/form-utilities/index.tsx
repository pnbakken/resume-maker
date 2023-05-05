import style from "./index.style.module.scss";

export function ControlGroup({ children }) {
  return <div className={`${style.controlGroup}`}>{children}</div>;
}

export function FormRow({ children }) {
  return <div className="flex-r wrap justify-center gap-md">{children}</div>;
}
