"use client";

import { useContext, useEffect } from "react";
import style from "./index.style.module.scss";
import PersonalDetails from "./personal-details";
import ResumeContext from "@/context/resume-context";
import EmploymentHistory from "./employment-history/";
import ResumeMenu from "./resume-menu";

const ResumeBuilder = () => {
  const [resume, setResume] = useContext(ResumeContext);

  useEffect(() => {
    console.log(resume);
  }, []);

  return (
    <div className="full-width flex-c align-center top-level-indent">
      <div className="full-width xl-component-width">
        <h1>Create your resume</h1>
      </div>
      <form
        id="resume-builder"
        className={`${style.resumeBuilder} xl-component-width full-width flex-c gap-md`}
      >
        <ResumeMenu />

        <PersonalDetails />

        <EmploymentHistory />
      </form>
    </div>
  );
};

export default ResumeBuilder;
