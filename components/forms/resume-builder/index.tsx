"use client";

import style from "./index.style.module.scss";
import PersonalInfo from "./personal-info";

const ResumeBuilder = () => {
  return (
    <form
      id="resume-builder"
      className={`${style.resumeBuilder} xl-component-width full-width radius-md flex-c gap-md`}
    >
      <div>
        <PersonalInfo />
      </div>
    </form>
  );
};

export default ResumeBuilder;
