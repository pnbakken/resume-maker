"use client";

import styles from "./index.style.module.scss";
import PersonalInfo from "./personal-info";

const ResumeBuilder = () => {
  return (
    <form id="resume-builder" className={`${styles.resumeBuilder}`}>
      <PersonalInfo />
    </form>
  );
};

export default ResumeBuilder;
