import React, { useState } from "react";
import style from "./index.style.module.scss";
import { Collapsible, Fieldset, FieldsetHeader } from "../../form-utilities";

const Skills = ({ register, language, control, watch }) => {
  const [isOpen, setIsOpen] = useState(true);
  function handleOpen() {
    setIsOpen(!isOpen);
  }
  return (
    <Fieldset className={`${style.Skills} flex-c gap-md`}>
      <FieldsetHeader
        title={language.skills}
        titleSize={2}
        callback={handleOpen}
        isOpen={isOpen}
      />
      <Collapsible show={isOpen}>Skills</Collapsible>
    </Fieldset>
  );
};

export default Skills;
