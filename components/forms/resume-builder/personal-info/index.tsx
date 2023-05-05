import React from "react";
import style from "./index.style.module.scss";

const PersonalInfo = () => {
  return (
    <fieldset className={`${style.personalInfo} flex-c gap-md`}>
      <h2>Personal Info</h2>
      <div className="flex-r wrap justify-center gap-md">
        <div className={style.formGroup}>
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />
        </div>
      </div>
      <div className="flex-r wrap justify-center gap-md">
        <div className={style.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" name="phone" />
        </div>
      </div>
    </fieldset>
  );
};

export default PersonalInfo;
