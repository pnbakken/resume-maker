import { useContext } from "react";
import style from "./index.style.module.scss";
import MenuButtonSmall from "@/components/buttons/menu-button-small";
import { toast } from "react-hot-toast";
import ResumeCollectionContext from "@/context/resume-collection-context";
import WorkingResumeContext from "@/context/working-resume-context";
import { useRouter } from "next/navigation";
import { ControlGroup } from "../../form-utilities";

const ResumeMenu = ({ register, invokeDelete }) => {
  const [resumes, setResumes] = useContext(ResumeCollectionContext);
  const [workingResume, setWorkingResume] = useContext(WorkingResumeContext);

  return (
    <div
      className={`${style.resumeMenu} flex-r wrap full-width justify-between gap-sm radius-md align-center`}
    >
      <div className="flex-r gap-sm">
        <ControlGroup>
          <label htmlFor="resume-name">Resume name</label>
          <input type="text" {...register("resumeName")} />
        </ControlGroup>
      </div>
      <div>Language select</div>
      <div>
        <MenuButtonSmall
          className="warning"
          value="delete resume"
          type="button"
          action={invokeDelete}
        >
          Delete Resume
        </MenuButtonSmall>
      </div>
    </div>
  );
};

export default ResumeMenu;
