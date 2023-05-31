import { useEffect, useState } from "react";
import style from "./index.style.module.scss";
import {
  Collapsible,
  ControlGroup,
  Fieldset,
  FieldsetHeader,
  FormRow,
} from "@/components/forms/form-utilities";
import WordcountTextarea from "@/components/forms/form-utilities/wordcount-textarea";
import MenuButtonSmall from "@/components/buttons/menu-button-small";

const EducationItem = ({
  item,
  language,
  register,
  remove,
  index,
  watch,
  show = false,
}: {
  item: any;
  language: any;
  register: Function;
  remove: Function;
  index: number;
  watch: Function;
  show?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(show);

  const [itemTitle, setItemTitle] = useState(language.educationTitle);
  function handleIsOpen() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (item && item.itemName && item.itemName.length > 0) {
      setItemTitle(item.itemName);
      if (item.position && item.position.length > 0)
        setItemTitle(`${item.itemName} - ${item.position}`);
    } else if (item && item.position && item.position.length > 0) {
      setItemTitle(item.position);
    } else setItemTitle(language.educationTitle);
  }, [item, language]);

  return (
    <li className={`flex-c gap-md full-width`}>
      <Fieldset className={`${style.educationItem} flex-c gap-md`}>
        <FieldsetHeader
          title={itemTitle}
          titleSize={3}
          callback={handleIsOpen}
          isOpen={isOpen}
        />
        <Collapsible show={isOpen}>
          <FormRow>
            <ControlGroup className="smaller-controlgroup-width">
              <label htmlFor="institution">{language.institutionName}</label>
              <input
                type="text"
                name="institution"
                {...register(`education[${index}].itemName`)}
              />
            </ControlGroup>
            <ControlGroup className="smaller-controlgroup-width">
              <label htmlFor="position">{language.degree}</label>
              <input
                type="text"
                name="position"
                {...register(`education[${index}].position`)}
              />
            </ControlGroup>
          </FormRow>
          <FormRow>
            <ControlGroup className="smaller-controlgroup-width">
              <label htmlFor="education-location">{language.location}</label>
              <input
                type="text"
                name="education-location"
                {...register(`education[${index}].location`)}
              />
            </ControlGroup>
          </FormRow>
          <FormRow>
            <ControlGroup className="smaller-controlgroup-width">
              <label htmlFor="start-date">{language.startDate}</label>
              <input
                type="text"
                name="start-date"
                {...register(`education[${index}].startDate`)}
              />
            </ControlGroup>
            <ControlGroup className="smaller-controlgroup-width">
              <label htmlFor="end-date">{language.endDate}</label>
              <input
                type="text"
                name="end-date"
                {...register(`education[${index}].endDate`)}
              />
            </ControlGroup>
            <ControlGroup>
              <label htmlFor="education-ongoing">{language.ongoing}</label>
              <input
                type="checkbox"
                name="education-ongoing"
                {...register(`education[${index}].ongoing`)}
              />
            </ControlGroup>
          </FormRow>
          <FormRow>
            <ControlGroup className="full-width">
              <label htmlFor="description">{language.description}</label>
              <WordcountTextarea
                register={register}
                registerAs={`education[${index}].description`}
                watch={watch}
                language={language}
                htmlName="description"
              />
            </ControlGroup>
          </FormRow>
          <div className="flex-r full-width justify-end">
            <MenuButtonSmall
              type="button"
              className="warning"
              action={() => remove(index)}
            >
              {language.removeEducation}
            </MenuButtonSmall>
          </div>
        </Collapsible>
      </Fieldset>
    </li>
  );
};

export default EducationItem;
