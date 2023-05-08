"use client";

import { useContext } from "react";
import style from "./index.style.module.scss";
import PersonalDetails from "./personal-details";
import ResumeContext from "@/context/resume-context";

const ResumeBuilder = () => {
  const [resume, setResume] = useContext(ResumeContext);

  return (
    <div className="full-width flex-c align-center top-level-indent">
      <div className="full-width xl-component-width">
        <h1>Create your resume</h1>
      </div>
      <form
        id="resume-builder"
        className={`${style.resumeBuilder} xl-component-width full-width radius-md flex-c gap-md`}
      >
        <div>
          <PersonalDetails />
        </div>
      </form>
    </div>
  );
};

export default ResumeBuilder;
