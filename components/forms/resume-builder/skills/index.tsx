import React, { useState } from "react";
import style from "./index.style.module.scss";
import {
  Collapsible,
  ControlGroup,
  Fieldset,
  FieldsetHeader,
  FormRow,
} from "../../form-utilities";
import { ResumeMakerSubSectionProps } from "@/types";
import MenuButtonSmall from "@/components/buttons/menu-button-small";
import { useFieldArray } from "react-hook-form";
import SkillItem from "./skill-item";
import { MdOutlinePostAdd } from "react-icons/md";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DragPlaceholder from "@/components/utility/drag-placeholder";

const Skills = ({
  register,
  language,
  control,
  watch,
}: ResumeMakerSubSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  function handleOpen() {
    setIsOpen(!isOpen);
  }
  return (
    <Fieldset className={`${style.Skills} flex-c gap-md`}>
      <FieldsetHeader
        title={language.skills}
        titleSize={2}
        callback={handleOpen}
        isOpen={isOpen}
      />
      <Collapsible show={isOpen}>
        <SkillsManager
          register={register}
          language={language}
          watch={watch}
          control={control}
        />
      </Collapsible>
    </Fieldset>
  );
};

export default Skills;

function SkillsManager({
  register,
  language,
  control,
  watch,
}: ResumeMakerSubSectionProps) {
  const { fields, append, move, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const [showSkillLevel, setShowSkillLevel] = useState(false);

  const onDragEnd = (result) => {
    if (!result.destination) {
      // dropped outside the list
      return;
    }

    move(result.source.index, result.destination.index);
  };

  return (
    <div className={`${style.SkillsManager} flex-c gap-md`}>
      <FormRow>
        <ControlGroup styles={{ opacity: "0.4" }}>
          <label htmlFor="showSkillLevel">{language.showSkillLevel}</label>
          <input
            type="checkbox"
            id="showSkillLevel"
            checked={false}
            disabled={true}
            {...register("showSkillLevel")}
          />
        </ControlGroup>
      </FormRow>
      {fields.length > 0 && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="skills"
            renderClone={(provided, snapshot, rubric) => (
              <DragPlaceholder
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                Skill
              </DragPlaceholder>
            )}
          >
            {(provided, snapshot) => (
              <ul
                className={`${style.SkillsList} no-list-style flex-c gap-md`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {fields.map((item, index) => {
                  return (
                    <SkillItem
                      key={index}
                      item={item}
                      language={language}
                      register={register}
                      remove={remove}
                      index={index}
                      watch={watch}
                    />
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
      <div className="full-width">
        <MenuButtonSmall
          action={() => append({})}
          type="button"
          value="add skill"
          className="flex-r gap-xxs align-center"
        >
          <MdOutlinePostAdd />
          {language.addSkill}
        </MenuButtonSmall>
      </div>
    </div>
  );
}
