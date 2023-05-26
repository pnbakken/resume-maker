import { useState } from "react";
import style from "./index.style.module.scss";
import {
  Collapsible,
  ControlGroup,
  Fieldset,
  FieldsetHeader,
  FormRow,
} from "@/components/forms/form-utilities";
import ItemHeaderButton from "@/components/forms/form-utilities/item-header-button";
import { MdDragIndicator } from "react-icons/md";
import { CgTrash } from "react-icons/cg";
import ItemTitle from "@/components/typography/item-title";

const ReferenceItem = ({
  item,
  index,
  register,
  control,
  watch,
  language,
  remove,
  show = false,
}) => {
  const [isOpen, setIsOpen] = useState(show);
  function handleOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <li className={`flex-c gap-md full-width`}>
      <Fieldset className={`${style.ReferenceItem} flex-c gap-md`}>
        <div className="flex-r justify-between">
          <ItemHeaderButton
            action={() => {}}
            displaySide="left"
            value="sort item"
            type="button"
            defaultActive={true}
          >
            <MdDragIndicator />
          </ItemHeaderButton>
          <FieldsetHeader
            title={ItemTitle(
              item.referenceName,
              item.referenceCompany,
              language.referenceTitle || "Reference"
            )}
            titleSize={3}
            callback={handleOpen}
          />
          <ItemHeaderButton
            action={() => {
              remove(index);
            }}
            value="delete item"
            type="button"
            className="danger-button"
            displaySide="right"
          >
            <CgTrash />
          </ItemHeaderButton>
        </div>
        <Collapsible show={isOpen} className="flex-c gap-md">
          <FormRow>
            <ControlGroup className="smaller-controlgroup-width">
              <label htmlFor="referenceName">{language.name}</label>
              <input {...register(`references[${index}].referenceName`)} />
            </ControlGroup>
          </FormRow>
          <FormRow>
            <ControlGroup className="smaller-controlgroup-width">
              <label htmlFor="referencePosition">{language.position}</label>
              <input {...register(`references[${index}].referencePosition`)} />
            </ControlGroup>
            <ControlGroup className="smaller-controlgroup-width">
              <label htmlFor="referenceCompany">
                {language.referenceCompany}
              </label>
              <input {...register(`references[${index}].referenceCompany`)} />
            </ControlGroup>
          </FormRow>
          <FormRow>
            <ControlGroup className="smaller-controlgroup-width">
              <label htmlFor="referencePhone">{language.phone}</label>
              <input {...register(`references[${index}].phone`)} />
            </ControlGroup>
            <ControlGroup className="smaller-controlgroup-width">
              <label htmlFor="referenceEmail">{language.email}</label>
              <input {...register(`references[${index}].email`)} />
            </ControlGroup>
          </FormRow>
        </Collapsible>
      </Fieldset>
    </li>
  );
};

export default ReferenceItem;
