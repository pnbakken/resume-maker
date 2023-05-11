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
import ResumeContext from "@/context/resume-collection-context";
import { toast } from "react-hot-toast";
import WorkingResumeContext from "@/context/working-resume-context";
const PersonalDetails = ({ register }) => {
  const [workingResume, setWorkingResume] = useContext(WorkingResumeContext);
  const resume = workingResume;

  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(false);

  function toggleShow(): void {
    setShow(!show);
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
              {...register("personal_details.desiredTitle")}
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
              {...register("personal_details.firstName")}
            />
          </ControlGroup>
          <ControlGroup>
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              name="last-name"
              {...register("personal_details.lastName")}
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
              {...register("personal_details.emailAddress")}
            />
          </ControlGroup>
          <ControlGroup>
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              {...register("personal_details.phoneNumber")}
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
              {...register("personal_details.country")}
            />
          </ControlGroup>
          <ControlGroup>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              {...register("personal_details.city")}
            />
          </ControlGroup>
        </FormRow>
        <div className="flex-r justify-end full-width">
          <MenuButtonSmall type="submit" value="save details">
            Save
          </MenuButtonSmall>
        </div>
      </Collapsible>
    </Fieldset>
  );
};

export default PersonalDetails;
