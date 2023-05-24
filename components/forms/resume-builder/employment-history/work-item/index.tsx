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
import MenuButtonSmall from "@/components/buttons/menu-button-small";
import ItemHeaderButton from "@/components/forms/form-utilities/item-header-button";
import { MdDragIndicator } from "react-icons/md";
import { CgTrash } from "react-icons/cg";

const WorkItem = ({
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
  }, [item, language]);

  return (
    <li className={`flex-c gap-md full-width`}>
      <Fieldset className={`${style.workItem} flex-c gap-md`}>
        <div className="flex-r justify-between">
          <ItemHeaderButton
            action={() => {
              console.log("Clicked. I'm already active");
            }}
            displaySide="left"
            value="sort item"
            type="button"
            defaultActive={true}
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
              <label htmlFor="company-name">{language.companyName}</label>
              <input
                type="text"
                name="company-name"
                {...register(`employment_history[${index}].companyName`)}
                autoComplete="company-name"
              />
            </ControlGroup>
            <ControlGroup className="smaller-controlgroup-width">
              <label htmlFor="position">{language.position}</label>
              <input
                type="text"
                name="position"
                {...register(`employment_history[${index}].position`)}
                autoComplete="position"
              />
            </ControlGroup>
          </FormRow>
          <FormRow>
            <ControlGroup className="smaller-controlgroup-width">
              <label htmlFor="work-location">{language.location}</label>
              <input
                type="text"
                name="work-location"
                {...register(`employment_history[${index}].location`)}
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
                    {...register(`employment_history[${index}].startDate`)}
                    autoComplete="start-date"
                  />
                </div>
                <div className="flex-c gap-xxs">
                  <label htmlFor="end-date">{language.endDate}</label>
                  <input
                    type="text"
                    name="end-date"
                    {...register(`employment_history[${index}].endDate`)}
                    autoComplete="end-date"
                  />
                </div>
                <div className="flex-c gap-xxs justify-center">
                  <label htmlFor="ongoing">{language.ongoing}</label>
                  <input
                    type="checkbox"
                    name="ongoing"
                    {...register(`employment_history[${index}].ongoing`)}
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
                registerAs={`employment_history[${index}].description`}
                watch={watch}
                language={language}
              />
            </ControlGroup>
          </FormRow>
          <div className="full-width flex-r justify-end">
            <MenuButtonSmall
              type="button"
              action={() => remove(index)}
              value="remove employment"
              className="warning"
            >
              {language.removeEmployment}
            </MenuButtonSmall>
          </div>
        </Collapsible>
      </Fieldset>
    </li>
  );
};

export default WorkItem;
