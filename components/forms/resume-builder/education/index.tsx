import { useState } from "react";
import style from "./index.style.module.scss";
import { Collapsible, Fieldset, FieldsetHeader } from "../../form-utilities";
import { useFieldArray } from "react-hook-form";
import EducationItem from "./education-item";
import MenuButtonSmall from "@/components/buttons/menu-button-small";
import { MdOutlinePostAdd } from "react-icons/md";

const Education = ({ language, register, control, watch }) => {
  const [show, setShow] = useState(true);
  function handleShow() {
    setShow(!show);
  }

  return (
    <Fieldset className="flex-c gap-md">
      <FieldsetHeader
        title={language.education}
        titleSize={2}
        callback={handleShow}
        isOpen={show}
      />
      <Collapsible show={show}>
        <EducationManager
          language={language}
          register={register}
          control={control}
          watch={watch}
        />
      </Collapsible>
    </Fieldset>
  );
};

export default Education;

function EducationManager({ language, register, control, watch }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <div className={`${style.educationManager} flex-c gap-md`}>
      {fields.length > 0 && (
        <ul className={`${style.educationList} no-list-style flex-c gap-md`}>
          {fields.map((item, index) => {
            return (
              <EducationItem
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
          <MdOutlinePostAdd /> {language.addEducation}
        </MenuButtonSmall>
      </div>
    </div>
  );
}
