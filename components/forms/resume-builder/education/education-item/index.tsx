import { useEffect, useState } from "react";
import style from "./index.style.module.scss";
import {
  Collapsible,
  ControlGroup,
  Fieldset,
  FieldsetHeader,
  FormRow,
} from "@/components/forms/form-utilities";

const EducationItem = ({
  item,
  language,
  register,
  remove,
  index,
  watch,
  show = false,
}) => {
  const [isOpen, setIsOpen] = useState(show);

  const [itemTitle, setItemTitle] = useState(language.educationTitle);
  function handleIsOpen() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (item && item.institutionName && item.institutionName.length > 0) {
      setItemTitle(item.institutionName);
      if (item.degree && item.degree.length > 0)
        setItemTitle(`${item.insitutionName} - ${item.degree}`);
    } else if (item && item.degree && item.degree.length > 0) {
      setItemTitle(item.degree);
    } else setItemTitle(language.educationTitle);
  }, []);

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
                {...register(`education.${index}.institutionName`)}
              />
            </ControlGroup>
            <ControlGroup className="smaller-controlgroup-width">
              <label htmlFor="degree">{language.degree}</label>
              <input
                type="text"
                name="degree"
                {...register(`education.${index}.degree`)}
              />
            </ControlGroup>
          </FormRow>
        </Collapsible>
      </Fieldset>
    </li>
  );
};

export default EducationItem;
