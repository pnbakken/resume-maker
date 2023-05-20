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
  return (
    <button
      onClick={() => action()}
      value={value}
      type={type}
      className={`${style.ItemHeaderButton} ${style[displaySide]} ${className}`}
    >
      {children}
    </button>
  );
};

export default ItemHeaderButton;
