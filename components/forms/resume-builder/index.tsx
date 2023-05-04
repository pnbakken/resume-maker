"use client";

import style from "./index.style.module.scss";
import PersonalInfo from "./personal-info";

const ResumeBuilder = () => {
  return (
    <form
      id="resume-builder"
      className={`${style.resumeBuilder} large-component-width top-level-indent`}
    >
      <div>
        <PersonalInfo />
      </div>
    </form>
  );
};

export default ResumeBuilder;
