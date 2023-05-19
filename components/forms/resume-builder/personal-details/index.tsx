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
import { useLanguage } from "@/context/language-context";
import WordcountTextarea from "../../form-utilities/wordcount-textarea";
import { useFieldArray } from "react-hook-form";
import Heading from "@/components/typography/heading";
const PersonalDetails = ({ register, language, watch, control }) => {
  const [workingResume, setWorkingResume] = useContext(WorkingResumeContext);
  const resume = workingResume;

  const [show, setShow] = useState(true);
  const [disabled, setDisabled] = useState(false);
  function toggleShow(): void {
    setShow(!show);
  }

  return (
    <Fieldset className={`${style.personalDetails} flex-c gap-md`}>
      <FieldsetHeader
        title={language.personalDetails}
        titleSize={2}
        callback={toggleShow}
        isOpen={show}
      />
      <Collapsible show={show} className="flex-c gap-lg">
        <FormRow>
          <ControlGroup className="standard-controlgroup-width">
            <label htmlFor="desired-title">{language.desiredTitle}</label>
            <input
              type="text"
              id="desired-title"
              name="desired-title"
              {...register("personal_details.desiredTitle")}
            />
          </ControlGroup>
        </FormRow>
        <FormRow>
          <ControlGroup className="standard-controlgroup-width">
            <label htmlFor="first-name">{language.firstName}</label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              {...register("personal_details.firstName")}
            />
          </ControlGroup>
          <ControlGroup className="standard-controlgroup-width">
            <label htmlFor="last-name">{language.lastName}</label>
            <input
              type="text"
              id="last-name"
              name="last-name"
              {...register("personal_details.lastName")}
            />
          </ControlGroup>
        </FormRow>
        <FormRow>
          <ControlGroup className="standard-controlgroup-width">
            <label htmlFor="email">{language.email}</label>
            <input
              type="email"
              id="email"
              name="email"
              {...register("personal_details.emailAddress")}
            />
          </ControlGroup>
          <ControlGroup className="standard-controlgroup-width">
            <label htmlFor="phone">{language.phone}</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              {...register("personal_details.phoneNumber")}
            />
          </ControlGroup>
        </FormRow>
        <FormRow>
          <ControlGroup className="standard-controlgroup-width">
            <label htmlFor="country">{language.country}</label>
            <input
              type="text"
              id="country"
              name="country"
              {...register("personal_details.country")}
            />
          </ControlGroup>
          <ControlGroup className="standard-controlgroup-width">
            <label htmlFor="city">{language.city}</label>
            <input
              type="text"
              id="city"
              name="city"
              {...register("personal_details.city")}
            />
          </ControlGroup>
        </FormRow>
        <FormRow>
          <ControlGroup className="full-width">
            <label htmlFor="personal-introduction">
              {language.personalIntroduction}
            </label>
            <WordcountTextarea
              htmlId="personal-introduction"
              htmlName="personal-introduction"
              registerAs="personal_details.personalIntroduction"
              register={register}
              watch={watch}
              language={language}
            />
          </ControlGroup>
        </FormRow>
        <PersonalLinksManager
          register={register}
          watch={watch}
          control={control}
          language={language}
        />
        <div className="flex-r justify-end full-width">
          <MenuButtonSmall type="submit" value="save details">
            {language.saveResume}
          </MenuButtonSmall>
        </div>
      </Collapsible>
    </Fieldset>
  );
};

export default PersonalDetails;

function PersonalLinksManager({ register, watch, control, language }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "personal_details.personalLinks",
  });
  return (
    <div className="flex-c gap-sm">
      <div>
        <Heading size={3}>Links</Heading>
      </div>
      <div>
        {fields.length > 0 && (
          <ul className="flex-c gap-sm">
            {fields.map((item, index) => (
              <PersonalLink
                key={item.id}
                register={register}
                watch={watch}
                control={control}
                language={language}
                index={index}
                remove={remove}
              />
            ))}
          </ul>
        )}
      </div>
      <div>
        <button type="button" onClick={() => append({})}>
          {language.addPersonalLink}
        </button>
      </div>
    </div>
  );
}

function PersonalLink({ register, watch, control, language, index, remove }) {
  return (
    <li className={`${style.personalLinkItem} flex-c full-width gap-sm`}>
      <FormRow>
        <ControlGroup className="standard-controlgroup-width">
          <label htmlFor={`personal-link-${index}-name`}>
            {language.personalLinkName}
          </label>
          <input
            type="text"
            id={`personal-link-${index}-name`}
            name={`personal-link-${index}-name`}
            autoComplete="link-name"
            {...register(`personal_details.personalLinks.${index}.name`)}
          />
        </ControlGroup>
        <ControlGroup className="standard-controlgroup-width">
          <label htmlFor={`personal-link-${index}-url`}>
            {language.personalLinkUrl}
          </label>
          <input
            type="url"
            id={`personal-link-${index}-url`}
            name={`personal-link-${index}-url`}
            autoComplete="link-url"
            {...register(`personal_details.personalLinks.${index}.url`)}
          />
        </ControlGroup>
      </FormRow>
      <div className="full-width flex-r justify-end">
        <MenuButtonSmall
          action={() => remove(index)}
          value="delete-link"
          className="warning"
          type="button"
        >
          {language.deletePersonalLink || "Delete link"}
        </MenuButtonSmall>
      </div>
    </li>
  );
}
