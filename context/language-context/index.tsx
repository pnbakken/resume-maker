"use client";

import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from "react";

type LanguageContextType = [
  string | null,
  Dispatch<SetStateAction<object | null>>
];

const LanguageContext = createContext();

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState("english");
  const [languageData, setLanguageData] = useState({});

  useEffect(() => {
    const loadLanguageData = async () => {
      console.log("importing language data");
      const data = await fetch(`/assets/language/${language}.json`);
      const result = await data.json();
      setLanguageData(result);
    };
    loadLanguageData();
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languageData }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  return useContext(LanguageContext);
}
