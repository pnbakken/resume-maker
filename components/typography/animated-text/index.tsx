import style from "./index.style.module.scss";

function AnimatedText({ animate = false, className = "", children = "" }) {
  if (typeof children !== "string") {
    throw new Error("children must be a string");
  }

  const childrenArray = children.split("");

  return (
    <span
      className={`${style.animateParent} ${
        animate ? style.activeParent : ""
      } ${className}`}
    >
      {childrenArray.map((char, index) => {
        return (
          <span
            key={index}
            className={`${style.AnimatedText} ${animate ? style.animate : ""}`}
            style={{ transitionDelay: `${index * 0.03}s` }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}

export default AnimatedText;
