"use client";

import ResumeCollectionContext from "@/context/resume-collection-context";
import Link from "next/link";
import { useContext } from "react";
import style from "./index.style.module.scss";

const ResumeCollection = ({}) => {
  const [resumes, setResumes] = useContext(ResumeCollectionContext);

  if (!resumes) {
    return (
      <div className="">
        <Link href="/resume">Create your first resume</Link>
      </div>
    );
  }
  return (
    <div className={`full-width top-level-indent flex-c align-center`}>
      <div
        className={`${style.resumeSelection} full-width xl-component-width flex-c align-center`}
      >
        <h2>Your Resumes</h2>
      </div>
    </div>
  );
};

export default ResumeCollection;
