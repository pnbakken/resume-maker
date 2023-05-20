import { useContext } from "react";
import style from "./index.style.module.scss";
import MenuButtonSmall from "@/components/buttons/menu-button-small";
import { toast } from "react-hot-toast";
import ResumeCollectionContext from "@/context/resume-collection-context";
import WorkingResumeContext from "@/context/working-resume-context";
import { useRouter } from "next/navigation";
import { ControlGroup } from "../../form-utilities";
import { getLanguageInfo } from "public/assets/language";
import { capitalizeFirstLetter } from "@/lib/functions";
import { useLanguage } from "@/context/language-context";

const ResumeMenu = ({
  register,
  invokeDelete,
  language,
}: {
  register: Function;
  invokeDelete: Function;
  language: any;
}) => {
  const [resumes, setResumes] = useContext(ResumeCollectionContext);
  const [workingResume, setWorkingResume] = useContext(WorkingResumeContext);

  return (
    <div
      className={`${style.resumeMenu} flex-r wrap full-width gap-sm radius-md align-end`}
    >
      <div className="flex-r gap-sm">
        <ControlGroup>
          <label htmlFor="resume-name">{language.resumeName}</label>
          <input type="text" {...register("resumeName")} />
        </ControlGroup>
      </div>
      <div>
        <LanguageSelect register={register} />
      </div>
      <div className="flex-r justify-self-end">
        <MenuButtonSmall
          className="warning"
          value="delete resume"
          type="button"
          action={invokeDelete}
        >
          {language.deleteResume}
        </MenuButtonSmall>
      </div>
    </div>
  );
};

export default ResumeMenu;

function LanguageSelect({ register }: { register: Function }) {
  const { setLanguage } = useLanguage();
  function handleLanguageChange(e: any) {
    setLanguage(e.target.value);
  }

  return (
    <ControlGroup>
      <label htmlFor="language-selector">Language</label>
      <select
        id="language-selector"
        className={`${style.languageSelector} flex-c gap-sm`}
        {...register("resumeLanguage")}
        onChange={(e) => handleLanguageChange(e)}
      >
        {getLanguageInfo().map((lang: any) => {
          return (
            <option
              key={lang.code}
              value={lang.langName}
              className={`? ${style.selectItem} full-width flex-r justify-between gap-sm`}
            >
              {lang.icon && `${lang.icon} `}
              {capitalizeFirstLetter(lang.langName)}
            </option>
          );
        })}
      </select>
    </ControlGroup>
  );
}
