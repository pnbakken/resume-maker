import ResumeViewer from "@/components/resume-viewer";
import ClientComponent from "@/components/utility/client-component";
import { ResumeCollectionProvider } from "@/context/resume-collection-context";
import { WorkingResumeProvider } from "@/context/working-resume-context";

const Result = () => {
  return (
    <main>
      <div className="full-width top-level-indent flex-c align-center">
        <div className="full-width xl-component-width flex-c align-center">
          <ClientComponent>
            <ResumeCollectionProvider>
              <WorkingResumeProvider>
                <ResumeViewer />
              </WorkingResumeProvider>
            </ResumeCollectionProvider>
          </ClientComponent>
        </div>
      </div>
    </main>
  );
};

export default Result;
