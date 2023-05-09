import Resume from "@/components/resume";
import ClientComponent from "@/components/utility/client-component";
import { ResumeProvider } from "@/context/resume-context";

const Result = () => {
  return (
    <main>
      <div className="full-width top-level-indent flex-c align-center tw-my-10">
        <div className="full-width  flex-c align-center">
          <ClientComponent>
            <ResumeProvider>
              <Resume />
            </ResumeProvider>
          </ClientComponent>
        </div>
      </div>
    </main>
  );
};

export default Result;
