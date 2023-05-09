import React, { ChangeEvent, useEffect, useState, useContext } from "react";
import style from "./index.style.module.scss";
import {
  Collapsible,
  ControlGroup,
  Fieldset,
  FieldsetHeader,
  FormRow,
} from "../../form-utilities";
import MenuButtonSmall from "@/components/buttons/menu-button-small";
import ResumeContext from "@/context/resume-context";
import { toast } from "react-hot-toast";
const PersonalDetails = () => {
  const [resume, setResume] = useContext(ResumeContext);
  const [desiredTitle, setDesiredTitle] = useState(
    resume?.personal_details?.desiredTitle
      ? resume.personal_details.desiredTitle
      : ""
  );
  const [firstName, setFirstName] = useState(
    resume?.personal_details?.firstName ? resume.personal_details.firstName : ""
  );
  const [lastName, setLastName] = useState(
    resume?.personal_details?.lastName ? resume.personal_details.lastName : ""
  );
  const [emailAddress, setEmailAddress] = useState(
    resume?.personal_details?.emailAddress
      ? resume.personal_details.emailAddress
      : ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    resume?.personal_details?.phoneNumber
      ? resume.personal_details.phoneNumber
      : ""
  );
  const [country, setCountry] = useState(
    resume?.personal_details?.country ? resume.personal_details.country : ""
  );
  const [city, setCity] = useState(
    resume?.personal_details?.city ? resume.personal_details.city : ""
  );

  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(false);

  function handleChange(e: InputEvent, setter: Function): void {
    setter(e.target.value.trim());
  }

  function toggleShow(): void {
    setShow(!show);
  }

  function savePersonalDetails() {
    setDisabled(true);
    let savedResume;
    if (resume) {
      savedResume = {
        ...resume,
        personal_details: {
          ...(firstName && { firstName: firstName }),
          ...(lastName && { lastName: lastName }),
          ...(emailAddress && { emailAddress: emailAddress }),
          ...(phoneNumber && { phoneNumber: phoneNumber }),
          ...(country && { country: country }),
          ...(city && { city: city }),
          ...(desiredTitle && { desiredTitle: desiredTitle }),
        },
      };
    } else {
      savedResume = {
        personal_details: {
          ...(firstName && { firstName: firstName }),
          ...(lastName && { lastName: lastName }),
          ...(emailAddress && { emailAddress: emailAddress }),
          ...(phoneNumber && { phoneNumber: phoneNumber }),
          ...(country && { country: country }),
          ...(city && { city: city }),
          ...(desiredTitle && { desiredTitle: desiredTitle }),
        },
      };
    }

    setResume(savedResume);
    toast.success("Personal details saved!");
    setDisabled(false);
  }

  return (
    <Fieldset
      className={`${style.personalDetails} flex-c gap-md`}
      disabled={disabled}
    >
      <FieldsetHeader title="Personal Details" callback={toggleShow} />
      <Collapsible show={show}>
        <FormRow>
          <ControlGroup>
            <label htmlFor="desired-title">Desired Title</label>
            <input
              type="text"
              id="desired-title"
              name="desired-title"
              onChange={(e) => handleChange(e, setDesiredTitle)}
              defaultValue={desiredTitle}
            />
          </ControlGroup>
        </FormRow>
        <FormRow>
          <ControlGroup>
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              onChange={(e) => handleChange(e, setFirstName)}
              defaultValue={firstName}
            />
          </ControlGroup>
          <ControlGroup>
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              name="last-name"
              onChange={(e) => handleChange(e, setLastName)}
              defaultValue={lastName}
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
              defaultValue={emailAddress}
            />
          </ControlGroup>
          <ControlGroup>
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              onChange={(e) => handleChange(e, setPhoneNumber)}
              defaultValue={phoneNumber}
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
              defaultValue={country}
            />
          </ControlGroup>
          <ControlGroup>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              onChange={(e) => handleChange(e, setCity)}
              defaultValue={city}
            />
          </ControlGroup>
        </FormRow>
        <div className="flex-r justify-end full-width">
          <MenuButtonSmall
            onClick={savePersonalDetails}
            type="button"
            value="save details"
          >
            Save
          </MenuButtonSmall>
        </div>
      </Collapsible>
    </Fieldset>
  );
};

export default PersonalDetails;
