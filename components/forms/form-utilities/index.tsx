import Heading from "@/components/typography/heading";
import style from "./index.style.module.scss";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useEffect, useState } from "react";
import { set } from "lodash";

export function Fieldset({
  className = "",
  disabled = false,
  children,
}: {
  className?: string;
  disabled?: false;
  children?: React.ReactNode;
}) {
  return (
    <fieldset
      className={`${style.fieldset} ${className} radius-md `}
      disabled={disabled}
    >
      {children}
    </fieldset>
  );
}

export function ControlGroup({
  className = "",
  styles = {},
  children,
}: {
  className?: string;
  styles?: any;
  children?: React.ReactNode;
}) {
  return (
    <div className={`${style.controlGroup} ${className}`} style={styles}>
      {children}
    </div>
  );
}

export function FormRow({ children }: { children?: React.ReactNode }) {
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
    <div className="full-width">
      <button
        onClick={() => callback()}
        type="button"
        value={`show/hide ${title}`}
        className={`${style.fieldsetHeaderButton} flex-r  gap-sm full-width justify-between align-center`}
      >
        <Heading size={titleSize} className={style.FieldsetHeaderTitle}>
          {title}
        </Heading>

        {!isOpen ? <BsChevronDown /> : <BsChevronUp />}
      </button>
    </div>
  );
}

export function Collapsible({
  show = false,
  children,
  className = "",
}: {
  show: boolean;
  className?: string;
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
      className={`${style.collapsible} ${
        !show && style.hidden
      } flex-c gap-md ${className}`}
    >
      {(show || closing) && children}
    </div>
  );
}
