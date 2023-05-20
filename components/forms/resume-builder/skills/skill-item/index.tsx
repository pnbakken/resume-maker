import {
  Collapsible,
  ControlGroup,
  Fieldset,
  FieldsetHeader,
  FormRow,
} from "@/components/forms/form-utilities";
import style from "./index.style.module.scss";
import { useState, useEffect } from "react";
import MenuButtonSmall from "@/components/buttons/menu-button-small";

const SkillItem = ({
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
  function handleOpen() {
    setIsOpen(!isOpen);
  }

  const [title, setTitle] = useState(language.skillTitle);
  useEffect(() => {
    if (item && item.name && item.name.length > 0) {
      if (item && item.level && item.level.length > 0) {
        setTitle(`${item.name} - ${item.level}`);
      } else setTitle(item.name);
    } else if (item && item.level && item.level.length > 0) {
      setTitle(`${item.level}`);
    } else setTitle(language.skillTitle);
  }, [item, language]);

  return (
    <li>
      <Fieldset className={`${style.SkillItem} flex-c gap-md`}>
        <FieldsetHeader title={title} titleSize={3} callback={handleOpen} />
        <Collapsible show={isOpen} className="flex-c gap-md">
          <FormRow>
            <ControlGroup className="smaller-controlgroup-width">
              <label htmlFor="skill-name">{language.skillName}</label>
              <input
                type="text"
                name="skill-name"
                {...register(`skills.[${index}].name`)}
                autoComplete="skill-name"
              />
            </ControlGroup>
          </FormRow>
          <div className="full-width flex-r justify-end">
            <MenuButtonSmall
              type="button"
              action={() => remove(index)}
              value="remove skill"
              className="warning"
            >
              {language.removeSkill}
            </MenuButtonSmall>
          </div>
        </Collapsible>
      </Fieldset>
    </li>
  );
};

export default SkillItem;
