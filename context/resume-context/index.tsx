"use client";

import { Dispatch, SetStateAction, createContext } from "react";
import useLocalStorage from "../../hooks/use-local-storage/";

type ResumeContextType = [
  object | null,
  Dispatch<SetStateAction<object | null>>
];

const ResumeContext = createContext<ResumeContextType>([null, () => {}]);

export const ResumeProvider: React.FC = ({ children }) => {
  const [resume, setResume] = useLocalStorage("resume", null);
  return (
    <ResumeContext.Provider value={[resume, setResume]}>
      {children}
    </ResumeContext.Provider>
  );
};

export default ResumeContext;
