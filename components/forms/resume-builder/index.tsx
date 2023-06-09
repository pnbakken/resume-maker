"use client";

import { useContext, useEffect, useRef, useState } from "react";
import style from "./index.style.module.scss";
import PersonalDetails from "./personal-details";
import ResumeContext from "@/context/resume-collection-context";
import EmploymentHistory from "./employment-history/";
import ResumeMenu from "./resume-menu";
import WorkingResumeContext from "@/context/working-resume-context";
import { useForm } from "react-hook-form";
import { debounce, isEqual } from "lodash";
import ResumeCollectionContext from "@/context/resume-collection-context";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/language-context";
import { deepEqual } from "assert";
import { isDeepStrictEqual } from "util";
import Education from "./education";
import Skills from "./skills";
import SaveFormButton from "@/components/buttons/save-form-button";
import References from "./references";

const ResumeBuilder = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [workingResume, setWorkingResume] = useContext(WorkingResumeContext);
  const initialCopy = workingResume;
  const { setLanguage, languageData } = useLanguage();

  const [resumes, setResumes] = useContext(ResumeCollectionContext);
  const [deletedResume, setDeletedResume] = useState(false);
  const defaultValues = initialCopy || {
    id: Date.now(),
    dateCreated: new Date(Date.now()),
    personal_details: {
      personalLinks: [],
    },
    languages: [],
    employment_history: [],
    education: [],
    skills: [],
    references: [],
    certificates: [],
    volunteer: [],
    interests: "",
  };

  const router = useRouter();
  const { register, watch, handleSubmit, control } = useForm({ defaultValues });
  const watchAllFields = watch();

  const debouncedSaveToWorkingResume = debounce((data) => {
    !deletedResume && setWorkingResume(data);
    console.log("saving working item");
  }, 10000);

  const debouncedSaveToResumeCollection = debounce((data) => {
    !deletedResume && setWorkingResume(data);
    !deletedResume && saveResumeToCollection(data);
    console.log("Saving to collection");
  }, 20 * 1000);

  function onSubmit(data) {
    data.dateModified = new Date(Date.now());
    setWorkingResume(data);
    saveResumeToCollection(data);
    toast.success("Saved!");
  }

  function deleteResume() {
    if (resumes) {
      const newResumes = resumes.filter(
        (resume) => resume.id !== workingResume.id
      );
      setDeletedResume(true);
      debouncedSaveToResumeCollection.cancel();
      debouncedSaveToWorkingResume.cancel();
      setResumes(newResumes);
      setWorkingResume(null);
      toast.success("Resume deleted", {
        icon: "🗑️",
      });
      router.push("/");
    }
  }

  useEffect(() => {
    setIsMounted(true);
    console.log(workingResume);
    console.log(watchAllFields);
    workingResume && setLanguage(workingResume.resumeLanguage);
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        handleSubmit(onSubmit)();
        console.log("Ctrl+S or Cmd+S was pressed");
      }
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!isMounted) {
    return (
      <div className="full-width flex-c align-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="full-width flex-c align-center top-level-indent">
      <div className="full-width xl-component-width">
        <h1>
          {(workingResume && workingResume.resumeName) ||
            languageData.pageHeading}
        </h1>
        <div>
          Created:{" "}
          {(workingResume &&
            new Date(workingResume.dateCreated).toLocaleDateString()) ||
            "No date set"}
        </div>
        <div>
          Modified:{" "}
          {(workingResume &&
            workingResume.dateModified &&
            new Date(workingResume.dateModified).toLocaleDateString()) ||
            "Never"}{" "}
          {workingResume &&
            workingResume.dateModified &&
            new Date(workingResume.dateModified).toLocaleTimeString()}
        </div>
      </div>
      <form
        id="resume-builder"
        className={`${style.resumeBuilder} xl-component-width full-width flex-c gap-md`}
        onSubmit={handleSubmit(onSubmit)}
      >
        {workingResume && <>{workingResume.id}</>}
        <SaveFormButton language={languageData} />
        <ResumeMenu
          register={register}
          invokeDelete={deleteResume}
          language={languageData}
        />

        <PersonalDetails
          register={register}
          language={languageData}
          watch={watch}
          control={control}
        />

        <EmploymentHistory
          register={register}
          language={languageData}
          control={control}
          watch={watch}
        />

        <Education
          register={register}
          language={languageData}
          control={control}
          watch={watch}
        />

        <Skills
          register={register}
          language={languageData}
          control={control}
          watch={watch}
        />
        <References
          register={register}
          language={languageData}
          control={control}
          watch={watch}
        />
      </form>
    </div>
  );

  async function saveResumeToCollection(data) {
    if (resumes) {
      const newResumes = resumes.filter((resume) => resume.id !== data.id);
      newResumes.push(data);
      setResumes(newResumes);
    } else {
      const newResumes = [data];
      setResumes(newResumes);
    }
  }
};

export default ResumeBuilder;
