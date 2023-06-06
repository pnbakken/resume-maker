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
import { Draggable } from "react-beautiful-dnd";
import ItemHeaderButton from "@/components/forms/form-utilities/item-header-button";
import { MdDragIndicator } from "react-icons/md";
import { CgTrash } from "react-icons/cg";

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

  const watchTitle = watch([
    `education[${index}].itemName`,
    `education[${index}].position`,
  ]);

  useEffect(() => {
    console.log(watchTitle);
    let title = "";

    if (watchTitle[1]) {
      title = watchTitle[1];
      if (watchTitle[0]) title += ` - ${watchTitle[0]}`;
    } else if (watchTitle[0]) title = watchTitle[0];
    else title = language.educationTitle;
    setItemTitle(title);
  }, [watchTitle, language]);

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={`flex-c gap-md full-width`}
        >
          <Fieldset className={`${style.educationItem} flex-c gap-md`}>
            <div className="flex-r justify-between">
              <ItemHeaderButton
                displaySide="left"
                value="reorder"
                type="button"
                defaultActive={true}
                {...provided.dragHandleProps} // Here's where you provide dragHandleProps
              >
                <MdDragIndicator />
              </ItemHeaderButton>

              <FieldsetHeader
                title={itemTitle}
                titleSize={3}
                callback={handleIsOpen}
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
            <Collapsible show={isOpen}>
              <FormRow>
                <ControlGroup className="smaller-controlgroup-width">
                  <label htmlFor="institution">
                    {language.institutionName}
                  </label>
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
                  <label htmlFor="education-location">
                    {language.location}
                  </label>
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
      )}
    </Draggable>
  );
};

export default EducationItem;
