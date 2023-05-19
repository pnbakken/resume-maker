import Heading from "@/components/typography/heading";
import style from "./index.style.module.scss";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useEffect, useState } from "react";
import { set } from "lodash";

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
  title = "",
  titleSize = 1,
  callback = () => {},
  isOpen = false,
}: {
  title?: string;
  titleSize?: number;
  callback?: Function;
  isOpen?: boolean;
}) {
  return (
    <div>
      <button
        onClick={() => callback()}
        type="button"
        value={`show/hide ${title}`}
        className={`${style.fieldsetHeaderButton} flex-r wrap gap-sm full-width justify-between align-center`}
      >
        <Heading size={titleSize}>{title}</Heading>

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
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!show) {
      setClosing(true);
      setTimeout(() => {
        setClosing(false);
      }, 300);
    }
  }, [show]);
  return (
    <div
      className={`${style.collapsible} ${!show && style.hidden} flex-c gap-md`}
    >
      {(show || closing) && children}
    </div>
  );
}
