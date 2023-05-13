import { useState, useContext } from "react";
import style from "./index.style.module.scss";
import { Collapsible, Fieldset, FieldsetHeader } from "../../form-utilities";
import ResumeContext from "@/context/resume-collection-context";

const EmploymentHistory = ({ register, language }) => {
  const [resume, setResume] = useContext(ResumeContext);
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(!show);
  }

  return (
    <Fieldset className={`${style.employmentHistory} flex-c gap-md`}>
      <FieldsetHeader
        title={language.employmentHistory}
        callback={handleShow}
      />
      <Collapsible show={show}>Employment history menu here</Collapsible>
    </Fieldset>
  );
};

export default EmploymentHistory;

function EmploymentHistoryManager(register, language) {
  return (
    <div className={`${style.employmentHistoryManager}`}>
      This is the employment history manager
    </div>
  );
}
