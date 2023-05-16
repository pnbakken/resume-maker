import {
  ControlGroup,
  Fieldset,
  FormRow,
} from "@/components/forms/form-utilities";
import style from "./index.style.module.scss";

const WorkItem = ({ item, language, register, remove, index }) => {
  return (
    <li key={item.id} className={`${style.workItem} flex-c gap-md full-width`}>
      <Fieldset className="flex-c gap-md">
        <FormRow>
          <ControlGroup className="smaller-controlgroup-width">
            <label htmlFor="company-name">{language.companyName}</label>
            <input
              type="text"
              name="company-name"
              {...register(`employment_history.${index}.companyName`)}
            />
          </ControlGroup>
          <ControlGroup className="smaller-controlgroup-width">
            <label htmlFor="position">{language.position}</label>
            <input
              type="text"
              name="position"
              {...register(`employment_history.${index}.position`)}
            />
          </ControlGroup>
        </FormRow>
        <div className="full-width flex-r justify-end">
          <button type="button" onClick={() => remove(index)}>
            {language.removeEmployment}
          </button>
        </div>
      </Fieldset>
    </li>
  );
};

export default WorkItem;
