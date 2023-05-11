"use client";

import { useState, createContext, Dispatch, SetStateAction } from "react";

type LanguageContextType = [
  string | null,
  Dispatch<SetStateAction<object | null>>
];

const LanguageContext = createContext<LanguageContextType>([null, () => {}]);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("english");

  return (
    <LanguageContext.Provider value={[language, setLanguage]}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
