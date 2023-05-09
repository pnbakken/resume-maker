import { useContext } from "react";
import style from "./index.style.module.scss";
import ResumeContext from "@/context/resume-context";
import MenuButtonSmall from "@/components/buttons/menu-button-small";
import { toast } from "react-hot-toast";

const ResumeMenu = () => {
  const [resume, setResume] = useContext(ResumeContext);

  function deleteResume() {
    setResume(null);
    toast.success("Resume deleted", {
      icon: "🗑️",
    });
  }

  return (
    <div
      className={`${style.resumeMenu} flex-r wrap full-width justify-between gap-sm radius-md`}
    >
      <div className="flex-r gap-sm"></div>
      <div>
        <MenuButtonSmall
          className="warning"
          value="delete resume"
          type="button"
          action={deleteResume}
        >
          Delete Resume
        </MenuButtonSmall>
      </div>
    </div>
  );
};

export default ResumeMenu;
