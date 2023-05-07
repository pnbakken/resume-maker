import React, { ChangeEvent, useEffect, useState } from "react";
import style from "./index.style.module.scss";
import { ControlGroup, FormRow } from "../../form-utilities";

const PersonalInfo = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    console.log(firstName);
  }, [firstName]);
  useEffect(() => {
    console.log(lastName);
  }, [lastName]);
  useEffect(() => {
    console.log(emailAddress);
  }, [emailAddress]);
  useEffect(() => {
    console.log(phoneNumber);
  }, [phoneNumber]);
  useEffect(() => {
    console.log(country);
  }, [country]);
  useEffect(() => {
    console.log(city);
  }, [city]);

  function handleChange(e: InputEvent, setter: Function): void {
    setter(e.target.value.trim());
  }

  return (
    <fieldset className={`${style.personalInfo} flex-c gap-md`}>
      <h2>Personal Information</h2>
      <FormRow>
        <ControlGroup>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            onChange={(e) => handleChange(e, setFirstName)}
          />
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            onChange={(e) => handleChange(e, setLastName)}
          />
        </ControlGroup>
      </FormRow>
      <FormRow>
        <ControlGroup>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => handleChange(e, setEmailAddress)}
          />
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            onChange={(e) => handleChange(e, setPhoneNumber)}
          />
        </ControlGroup>
      </FormRow>
      <FormRow>
        <ControlGroup>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            onChange={(e) => handleChange(e, setCountry)}
          />
        </ControlGroup>
        <ControlGroup>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            onChange={(e) => handleChange(e, setCity)}
          />
        </ControlGroup>
      </FormRow>
    </fieldset>
  );
};

export default PersonalInfo;
