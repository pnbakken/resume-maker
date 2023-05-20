// ResumeCollectionContext.js
"use client";
import { Dispatch, SetStateAction, createContext } from "react";
import useLocalStorage from "../../hooks/use-local-storage/";

type ResumeCollectionContextType = [
  object[] | null,
  Dispatch<SetStateAction<object[] | null>>
];

const ResumeCollectionContext = createContext<ResumeCollectionContextType>([
  null,
  () => {},
]);

export const ResumeCollectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [resumes, setResumes] = useLocalStorage("resumes", null);
  return (
    <ResumeCollectionContext.Provider value={[resumes, setResumes]}>
      {children}
    </ResumeCollectionContext.Provider>
  );
};

export default ResumeCollectionContext;
