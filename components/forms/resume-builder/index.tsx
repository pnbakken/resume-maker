"use client";

import { useContext, useEffect } from "react";
import style from "./index.style.module.scss";
import PersonalDetails from "./personal-details";
import ResumeContext from "@/context/resume-collection-context";
import EmploymentHistory from "./employment-history/";
import ResumeMenu from "./resume-menu";
import WorkingResumeContext from "@/context/working-resume-context";

const ResumeBuilder = () => {
  const [workingResume, setWorkingResume] = useContext(WorkingResumeContext);

  useEffect(() => {
    if (workingResume) {
      console.log(workingResume);
    } else {
      console.log("no working resume");
    }
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
