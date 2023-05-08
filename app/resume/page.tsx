import ResumeBuilder from "@/components/forms/resume-builder";
import ClientComponent from "@/components/utility/client-component";
import { ResumeProvider } from "@/context/resume-context";
import { UserProvider } from "@/context/user-context";
export const metadata = {
  title: "Create Resume",
};
const Resume = () => {
  return (
    <main className="full-width flex-c align-center tw-my-10">
      <ClientComponent>
        <UserProvider>
          <ResumeProvider>
            <ResumeBuilder />
          </ResumeProvider>
        </UserProvider>
      </ClientComponent>
    </main>
  );
};

export default Resume;
