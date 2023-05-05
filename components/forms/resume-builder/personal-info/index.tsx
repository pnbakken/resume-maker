import React from "react";
import style from "./index.style.module.scss";
import { ControlGroup, FormRow } from "../../form-utilities";

const PersonalInfo = () => {
  return (
    <fieldset className={`${style.personalInfo} flex-c gap-md`}>
      <h2>Personal Info</h2>
      <FormRow>
        <ControlGroup>
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />
        </ControlGroup>
      </FormRow>
      <FormRow>
        <ControlGroup>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" name="phone" />
        </ControlGroup>
      </FormRow>
      <FormRow>
        <ControlGroup>
          <label htmlFor="country">Country</label>
          <input type="text" id="country" name="country" />
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="city">City</label>
          <input type="text" id="city" name="city" />
        </ControlGroup>
      </FormRow>
    </fieldset>
  );
};

export default PersonalInfo;
