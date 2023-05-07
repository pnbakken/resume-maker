import ResumeBuilder from "@/components/forms/resume-builder";
export const metadata = {
  title: "Create Resume",
};
const Resume = () => {
  return (
    <main className="full-width flex-c align-center tw-my-10">
      <ResumeBuilder />
    </main>
  );
};

export default Resume;
