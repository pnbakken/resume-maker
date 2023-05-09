import ResumeBuilder from "@/components/forms/resume-builder";
import ClientComponent from "@/components/utility/client-component";
import { ResumeProvider } from "@/context/resume-context";
import { UserProvider } from "@/context/user-context";
import Link from "next/link";
export const metadata = {
  title: "Create Resume",
};
const Resume = () => {
  return (
    <main className="full-width flex-c gap-md  tw-my-10">
      <ClientComponent>
        <UserProvider>
          <ResumeProvider>
            <ResumeBuilder />
          </ResumeProvider>
        </UserProvider>
      </ClientComponent>
      <div className="full-width top-level-indent flex-c align-center">
        <div className="flex-r full-width justify-end xl-component-width">
          <Link href="/resume/result/" className="pseudo-button">
            Generate resume
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Resume;
