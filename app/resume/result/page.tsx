import ResumeViewer from "@/components/resume-viewer";
import ClientComponent from "@/components/utility/client-component";
import { LanguageProvider } from "@/context/language-context";
import { ResumeCollectionProvider } from "@/context/resume-collection-context";
import { WorkingResumeProvider } from "@/context/working-resume-context";

const Result = () => {
  return (
    <main>
      <div className="full-width top-level-indent  flex-c align-center">
        <div className="full-width  flex-c align-center">
          <ClientComponent>
            <LanguageProvider>
              <ResumeCollectionProvider>
                <WorkingResumeProvider>
                  <ResumeViewer />
                </WorkingResumeProvider>
              </ResumeCollectionProvider>
            </LanguageProvider>
          </ClientComponent>
        </div>
      </div>
    </main>
  );
};

export default Result;
