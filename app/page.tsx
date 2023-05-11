import Image from "next/image";
import style from "./page.module.scss";
import Link from "next/link";
import { Metadata } from "next";
import ClientComponent from "@/components/utility/client-component";
import ResumeCollectionContext, {
  ResumeCollectionProvider,
} from "@/context/resume-collection-context";
import LanguageContext, { LanguageProvider } from "@/context/language-context";
import { useContext } from "react";
import ResumeCollection from "@/components/resume-collection";
import { WorkingResumeProvider } from "@/context/working-resume-context";

export const metadata: Metadata = {
  title: "Home",
  description: "Completely free resume pdf maker",
};

export default function Home() {
  return (
    <main
      className={`${style.main} flex-c full-width align-center justify-center`}
    >
      <ClientComponent>
        <LanguageProvider>
          <ResumeCollectionProvider>
            <WorkingResumeProvider>
              <ResumeCollection />
            </WorkingResumeProvider>
          </ResumeCollectionProvider>
        </LanguageProvider>
      </ClientComponent>
    </main>
  );
}
