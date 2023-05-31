import { useState, useEffect } from "react";
import style from "./index.style.module.scss";
import { FaSave } from "react-icons/fa";
import AnimatedText from "@/components/typography/animated-text";

const SaveFormButton = ({ language }) => {
  const [active, setActive] = useState(true);
  function activate() {
    setActive(true);
  }
  function deactivate() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setActive(scrollTop <= 500);
  }

  useEffect(() => {
    const handleScroll = () => {
      // When user starts scrolling, set animate to false
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setActive(scrollTop <= 500);
    };

    // Attach the scroll listener
    window.addEventListener("scroll", handleScroll);

    // Clean up function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      type="submit"
      value="save form"
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      className={`${style.SaveFormButton}`}
    >
      <FaSave />{" "}
      <AnimatedText animate={active}>
        {language.saveForm || "Save form"}
      </AnimatedText>
    </button>
  );
};

export default SaveFormButton;
