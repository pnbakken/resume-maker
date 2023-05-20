import { useState, useContext } from "react";
import style from "./index.style.module.scss";
import { Collapsible, Fieldset, FieldsetHeader } from "../../form-utilities";
import ResumeContext from "@/context/resume-collection-context";
import { useFieldArray } from "react-hook-form";
import WorkItem from "./work-item";
import MenuButtonSmall from "@/components/buttons/menu-button-small";
import { MdOutlinePostAdd } from "react-icons/md";
import { ResumeMakerSubSectionProps } from "@/types";

const EmploymentHistory = ({
  register,
  language,
  control,
  watch,
}: ResumeMakerSubSectionProps) => {
  const [show, setShow] = useState(true);

  function handleShow() {
    setShow(!show);
  }

  return (
    <Fieldset className={`${style.employmentHistory} flex-c gap-md `}>
      <FieldsetHeader
        title={language.employmentHistory}
        titleSize={2}
        callback={handleShow}
        isOpen={show}
      />
      <Collapsible show={show}>
        <EmploymentHistoryManager
          register={register}
          control={control}
          language={language}
          watch={watch}
        />
      </Collapsible>
    </Fieldset>
  );
};

export default EmploymentHistory;

function EmploymentHistoryManager({
  register,
  language,
  control,
  watch,
}: ResumeMakerSubSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "employment_history",
  });

  return (
    <div className={`${style.employmentHistoryManager} flex-c gap-md`}>
      {fields.length > 0 && (
        <ul
          className={`${style.employmentHistoryList} no-list-style flex-c gap-md`}
        >
          {fields.map((item, index) => {
            return (
              <WorkItem
                item={item}
                language={language}
                register={register}
                remove={remove}
                key={item.id}
                index={index}
                watch={watch}
              />
            );
          })}
        </ul>
      )}
      <div className="flex-r full-width align-center">
        <MenuButtonSmall
          type="button"
          action={() => append({})}
          value="Add work item"
          className="flex-r gap-xxs align-center"
        >
          <MdOutlinePostAdd /> {language.addEmployment}
        </MenuButtonSmall>
      </div>
    </div>
  );
}
