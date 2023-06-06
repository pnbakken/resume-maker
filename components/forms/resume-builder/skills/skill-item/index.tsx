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
import { Draggable } from "react-beautiful-dnd";
import ItemHeaderButton from "@/components/forms/form-utilities/item-header-button";
import { MdDragIndicator } from "react-icons/md";
import { CgTrash } from "react-icons/cg";

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

  const watchTitle = watch([
    `skills.[${index}].name`,
    `skills.[${index}].level`,
  ]);

  const [itemTitle, setItemTitle] = useState(language.skillTitle);
  useEffect(() => {
    let title = "";
    if (watchTitle[0]) title = watchTitle[0];
    else title = language.skillTitle;
    setItemTitle(title);
  }, [watchTitle, language]);

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <li {...provided.draggableProps} ref={provided.innerRef}>
          <Fieldset className={`${style.SkillItem} flex-c gap-md`}>
            <div className="flex-r justify-between">
              <ItemHeaderButton
                displaySide="left"
                value="reorder"
                type="button"
                defaultActive={true}
                {...provided.dragHandleProps}
              >
                <MdDragIndicator />
              </ItemHeaderButton>
              <FieldsetHeader
                title={itemTitle}
                titleSize={3}
                callback={handleOpen}
                isOpen={isOpen}
              />

              <ItemHeaderButton
                action={() => remove(index)}
                displaySide="right"
                value="remove item"
                type="button"
                className="danger-button"
              >
                <CgTrash />
              </ItemHeaderButton>
            </div>
            <Collapsible show={isOpen} className="flex-c gap-md">
              <FormRow>
                <ControlGroup className="smaller-controlgroup-width">
                  <label htmlFor="skill-name">{language.skillTitle}</label>
                  <input
                    type="text"
                    name="skill-name"
                    {...register(`skills.[${index}].name`)}
                    autoComplete="skill-name"
                  />
                </ControlGroup>
              </FormRow>
              <FormRow>
                <ControlGroup
                  className="smaller-controlgroup-width"
                  styles={{ opacity: "0.4" }}
                >
                  <label htmlFor="skill-level">
                    {language.skillLevel} : 1-5
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    name="skill-level"
                    disabled={true}
                    {...register(`skills.[${index}].level`)}
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
      )}
    </Draggable>
  );
};

export default SkillItem;
