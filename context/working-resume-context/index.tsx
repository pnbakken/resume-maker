"use client";

import useLocalStorage from "@/hooks/use-local-storage";
import { createContext, useState } from "react";

const WorkingResumeContext = createContext([null, () => {}]);

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
