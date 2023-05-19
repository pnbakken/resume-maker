import {
  Collapsible,
  ControlGroup,
  Fieldset,
  FieldsetHeader,
  FormRow,
} from "@/components/forms/form-utilities";
import style from "./index.style.module.scss";
import { useState, useContext, useEffect } from "react";
import WorkingResumeContext from "@/context/working-resume-context";
import WordcountTextarea from "@/components/forms/form-utilities/wordcount-textarea";

const WorkItem = ({
  item,
  language,
  register,
  remove,
  index,
  watch,
  show = false,
}) => {
  const [isOpen, setIsOpen] = useState(show);

  const [itemTitle, setItemTitle] = useState("");
  function handleIsOpen() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (item && item.companyName && item.companyName.length > 0) {
      setItemTitle(item.companyName);
      if (item && item.position && item.position.length > 0)
        setItemTitle(`${item.companyName} - ${item.position}`);
    } else if (item && item.position && item.position.length > 0) {
      setItemTitle(item.position);
    } else setItemTitle(language.employmentTitle);
  }, []);

  return (
    <li className={`flex-c gap-md full-width`}>
      <Fieldset className={`${style.workItem} flex-c gap-md`}>
        <FieldsetHeader
          title={itemTitle}
          titleSize={3}
          callback={handleIsOpen}
          isOpen={isOpen}
        />
        <Collapsible show={isOpen}>
          <FormRow>
            <ControlGroup className="smaller-controlgroup-width">
              <label htmlFor="company-name">{language.companyName}</label>
              <input
                type="text"
                name="company-name"
                {...register(`employment_history.${index}.companyName`)}
              />
            </ControlGroup>
            <ControlGroup className="smaller-controlgroup-width">
              <label htmlFor="position">{language.position}</label>
              <input
                type="text"
                name="position"
                {...register(`employment_history.${index}.position`)}
              />
            </ControlGroup>
          </FormRow>
          <FormRow>
            <ControlGroup>
              <div className="flex-r wrap gap-md">
                {" "}
                <div className="flex-c gap-xxs">
                  <label htmlFor="start-date">{language.startDate}</label>
                  <input
                    type="text"
                    name="start-date"
                    {...register(`employment_history.[${index}].startDate`)}
                  />
                </div>
                <div className="flex-c gap-xxs">
                  <label htmlFor="end-date">{language.endDate}</label>
                  <input
                    type="text"
                    name="end-date"
                    {...register(`employment_history.[${index}].endDate`)}
                  />
                </div>
                <div className="flex-c gap-xxs justify-center">
                  <label htmlFor="ongoing">{language.ongoing}</label>
                  <input
                    type="checkbox"
                    name="ongoing"
                    {...register(`employment_history.[${index}].ongoing`)}
                  />
                </div>
              </div>
            </ControlGroup>
          </FormRow>
          <FormRow>
            <ControlGroup className="full-width">
              <label htmlFor="description">{language.description}</label>
              <WordcountTextarea
                htmlName="description"
                register={register}
                registerAs={`employment_history.[${index}].description`}
                watch={watch}
                language={language}
              />
            </ControlGroup>
          </FormRow>
          <div className="full-width flex-r justify-end">
            <button type="button" onClick={() => remove(index)}>
              {language.removeEmployment}
            </button>
          </div>
        </Collapsible>
      </Fieldset>
    </li>
  );
};

export default WorkItem;
