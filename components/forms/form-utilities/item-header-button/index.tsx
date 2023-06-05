import { useState } from "react";
import style from "./index.style.module.scss";

const ItemHeaderButton = ({
  action = () => {},
  displaySide,
  value,
  className,
  type = "button",
  children,
  defaultActive = false,
  ...props
}: {
  action?: Function;
  displaySide: "left" | "right";
  value: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  defaultActive?: boolean;
  children: React.ReactNode;
}) => {
  const [isActive, setIsActive] = useState(defaultActive);

  function runAction() {
    if (defaultActive) {
      action();
    } else {
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
  }

  let buttonProps = { ...props };
  if (action) {
    buttonProps.onClick = runAction;
  }

  return (
    <button
      {...buttonProps}
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
