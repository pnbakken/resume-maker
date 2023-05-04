import React from "react";
import style from "./index.style.module.scss";

const PersonalInfo = () => {
  return (
    <fieldset className={`${style.personalInfo}`}>
      <div className={style.formGroup}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
      </div>
    </fieldset>
  );
};

export default PersonalInfo;
