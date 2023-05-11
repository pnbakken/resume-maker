"use client";

import useLocalStorage from "@/hooks/use-local-storage";
import { Dispatch, SetStateAction, createContext, useState } from "react";

type WorkingResumeContextType = [
  object | null,
  Dispatch<SetStateAction<object | null>>
];

const WorkingResumeContext = createContext<WorkingResumeContextType>([
  null,
  () => {},
]);

export const WorkingResumeProvider = ({ children }) => {
  const [workingResume, setWorkingResume] = useLocalStorage(
    "workingResume",
    null
  );
  return (
    <WorkingResumeContext.Provider value={[workingResume, setWorkingResume]}>
      {children}
    </WorkingResumeContext.Provider>
  );
};

export default WorkingResumeContext;
