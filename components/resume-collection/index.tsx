"use client";

import ResumeCollectionContext from "@/context/resume-collection-context";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import style from "./index.style.module.scss";
import WorkingResumeContext from "@/context/working-resume-context";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ResumeCollection({}) {
  const [resumes, setResumes] = useContext(ResumeCollectionContext);
  const [workingResume, setWorkingResume] = useContext(WorkingResumeContext);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function deleteResume(id) {
    if (resumes) {
      const newResumes = resumes.filter((resume) => resume.id !== id);
      setResumes(newResumes);
      setWorkingResume(null);
      toast.success("Resume deleted", { icon: "🗑️" });
    }
  }

  function editResume(id) {
    if (resumes) {
      const resume = resumes.find((resume) => resume.id === id);
      if (resume) {
        setWorkingResume(resume);
        router.push("/resume");
      }
    }
  }

  function viewResume(id) {
    const resume = resumes?.find((resume) => resume.id === id);
    if (resume) {
      setWorkingResume(resume);
      router.push("/resume/result");
    }
  }

  function newResume() {
    setWorkingResume(null);
    router.push("/resume");
  }

  if (!isMounted) {
    return <div>Loading...</div>;
  }

  if (!resumes || resumes.length === 0) {
    return (
      <div className="">
        <Link href="/resume">Create your first resume</Link>
      </div>
    );
  }
  return (
    <div className={`full-width top-level-indent flex-c align-center`}>
      <div
        className={`${style.resumeCollection} full-width xl-component-width flex-c align-center radius-md gap-md`}
      >
        <div className="full-width">
          <h2>Your Resumes</h2>
        </div>

        <div className={`${style.resumeListContainer} full-width`}>
          <ul className={`${style.resumeList} flex-r wrap gap-md`}>
            {resumes.map((resume) => {
              return (
                <li
                  key={resume.id}
                  className={`${style.resumeListItem} flex-r gap-sm justify-between`}
                >
                  <h3>{resume.resumeName || resume.id}</h3>
                  <div className="flex-c gap-sm">
                    <button onClick={() => viewResume(resume.id)}>View</button>
                    <button onClick={() => editResume(resume.id)}>Edit</button>
                    <button onClick={() => deleteResume(resume.id)}>
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="full-width flex-c align-center">
          <button onClick={newResume}>New resume</button>
        </div>
      </div>
    </div>
  );
}
