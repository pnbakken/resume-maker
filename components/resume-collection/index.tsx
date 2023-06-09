"use client";

import ResumeCollectionContext from "@/context/resume-collection-context";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import style from "./index.style.module.scss";
import WorkingResumeContext from "@/context/working-resume-context";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import _ from "lodash";
import Heading from "../typography/heading";
import demo from "public/assets/demo-resume/demo.json";

export default function ResumeCollection({}) {
  const [resumes, setResumes] = useContext(ResumeCollectionContext);
  const [workingResume, setWorkingResume] = useContext(WorkingResumeContext);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const [sortCriteria, setSortCriteria] = useState("dateCreated");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [displayResumes, setDisplayResumes] = useState(
    _.orderBy(resumes, sortCriteria, sortOrder) || []
  );
  useEffect(() => {
    setIsMounted(true);
    if (!resumes) {
      setResumes([demo]);
    }
  }, []);

  useEffect(() => {
    setDisplayResumes(_.orderBy(resumes, sortCriteria, sortOrder) || []);
  }, [resumes, sortCriteria, sortOrder]);
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

  if (!displayResumes || displayResumes.length === 0) {
    return (
      <div className="">
        <Link href="/resume">Create your first resume</Link>
      </div>
    );
  }
  return (
    <div className={`full-width top-level-indent flex-c align-center tw-my-32`}>
      <div
        className={`${style.resumeCollection} full-width xl-component-width flex-c align-center radius-md gap-md`}
      >
        <div className="full-width">
          <Heading size={2}>Your Resumes</Heading>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              setSortCriteria("dateModified");
            }}
          >
            Sort by date modified
          </button>
        </div>
        <div className={`${style.resumeListContainer} full-width`}>
          <ul className={`${style.resumeList} flex-r wrap gap-md`}>
            {displayResumes.map((resume) => {
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
