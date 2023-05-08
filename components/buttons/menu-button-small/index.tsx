import React, { ButtonHTMLAttributes } from "react";
import style from "./index.style.module.scss";

const MenuButtonSmall = ({
  action = () => {},
  type = "button",
  value = "",
  className = "",
  children,
  ...rest
}: {
  action?: Function;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  value?: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <button
      className={`${style.menuButtonSmall} ${className} discrete`}
      onClick={() => action()}
      type={type}
      value={value}
      {...rest}
    >
      {children}
    </button>
  );
};

export default MenuButtonSmall;
