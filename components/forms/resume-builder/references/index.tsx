import { useState } from "react";
import style from "./index.style.module.scss";
import { ResumeMakerSubSectionProps } from "@/types";
import {
  Collapsible,
  ControlGroup,
  Fieldset,
  FieldsetHeader,
  FormRow,
} from "../../form-utilities";
import { useFieldArray } from "react-hook-form";
import ReferenceItem from "./reference-item";
import MenuButtonSmall from "@/components/buttons/menu-button-small";
import { AiOutlineUserAdd } from "react-icons/ai";
const References = ({
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
    <Fieldset className={`${style.References} flex-c gap-md `}>
      <FieldsetHeader
        title={language.references}
        titleSize={2}
        callback={handleShow}
        isOpen={show}
      />
      <Collapsible show={show}>
        <FormRow>
          <ControlGroup className="flex-r full-width gap-xxs">
            <input
              type="checkbox"
              name="references-on-request"
              {...register("referencesOnRequest")}
            />
            <label htmlFor="references-on-request">
              {language.referencesOnRequest}
            </label>
          </ControlGroup>
        </FormRow>
        <ReferencesManager
          register={register}
          language={language}
          control={control}
          watch={watch}
        />
      </Collapsible>
    </Fieldset>
  );
};

export default References;

function ReferencesManager({ register, language, control, watch }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "references",
  });

  return (
    <div className={`${style.referencesManager} flex-c gap-md`}>
      <ul className="no-list-style flex-c gap-md">
        {fields &&
          fields.map((item, index) => {
            return (
              <ReferenceItem
                key={index}
                item={item}
                index={index}
                language={language}
                register={register}
                remove={remove}
                watch={watch}
                control={control}
              />
            );
          })}
      </ul>
      <div className="flex-r full-width align-center">
        <MenuButtonSmall
          type="button"
          action={() => append({})}
          value="Add work item"
          className="flex-r gap-xxs align-center"
        >
          <AiOutlineUserAdd /> {language.addReference}
        </MenuButtonSmall>
      </div>
    </div>
  );
}
