import { useState } from "react";
import style from "./index.style.module.scss";
import { Collapsible, Fieldset, FieldsetHeader } from "../../form-utilities";

const Education = ({ language, register, control, watch }) => {
  const [show, setShow] = useState(true);
  function handleShow() {
    setShow(!show);
  }

  return (
    <Fieldset>
      <FieldsetHeader
        title={language.education}
        callback={handleShow}
        isOpen={show}
      />
      <Collapsible show={show}>Education here</Collapsible>
    </Fieldset>
  );
};

export default Education;
