import { useState } from "react";
import style from "./index.style.module.scss";

const ItemHeaderButton = ({
  action,
  displaySide,
  value,
  className,
  type = "button",
  children,
}: {
  action: Function;
  displaySide: "left" | "right";
  value: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
}) => {
  const [isActive, setIsActive] = useState(false);

  function runAction() {
    if (isActive) {
      action();
      setIsActive(false);
    } else {
      setIsActive(true);
      setTimeout(() => {
        setIsActive(false);
      }, 2000);
    }
  }

  return (
    <button
      onClick={runAction}
      value={`${value} - ${
        isActive ? "click to confirm" : "click to activate"
      }`}
      type={type}
      className={`${style.ItemHeaderButton} ${style[displaySide]} ${
        isActive && style.active
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default ItemHeaderButton;
