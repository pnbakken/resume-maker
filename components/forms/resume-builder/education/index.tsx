import { useState } from "react";
import style from "./index.style.module.scss";
import { Collapsible, Fieldset, FieldsetHeader } from "../../form-utilities";
import { useFieldArray } from "react-hook-form";
import EducationItem from "./education-item";
import MenuButtonSmall from "@/components/buttons/menu-button-small";
import { MdOutlinePostAdd } from "react-icons/md";
import { ResumeMakerSubSectionProps } from "@/types";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DragPlaceholder from "@/components/utility/drag-placeholder";

const Education = ({
  language,
  register,
  control,
  watch,
}: ResumeMakerSubSectionProps) => {
  const [show, setShow] = useState(true);
  function handleShow() {
    setShow(!show);
  }

  return (
    <Fieldset className="flex-c gap-md">
      <FieldsetHeader
        title={language.education}
        titleSize={2}
        callback={handleShow}
        isOpen={show}
      />
      <Collapsible show={show}>
        <EducationManager
          language={language}
          register={register}
          control={control}
          watch={watch}
        />
      </Collapsible>
    </Fieldset>
  );
};

export default Education;

function EducationManager({
  language,
  register,
  control,
  watch,
}: ResumeMakerSubSectionProps) {
  const { fields, append, move, remove } = useFieldArray({
    control,
    name: "education",
  });

  const onDragEnd = (result) => {
    if (!result.destination) {
      // dropped outside the list
      return;
    }

    move(result.source.index, result.destination.index);
  };

  return (
    <div className={`${style.educationManager} flex-c gap-md`}>
      {fields.length > 0 && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="education"
            renderClone={(provided, snapshot, rubric) => (
              <DragPlaceholder
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              ></DragPlaceholder>
            )}
          >
            {(provided) => (
              <ul
                className={`${style.educationList} no-list-style flex-c gap-md`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {fields.map((item, index) => {
                  return (
                    <EducationItem
                      item={item}
                      language={language}
                      register={register}
                      remove={remove}
                      key={item.id}
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
      <div className="flex-r full-width align-center">
        <MenuButtonSmall
          type="button"
          action={() => append({})}
          value="Add work item"
          className="flex-r gap-xxs align-center"
        >
          <MdOutlinePostAdd /> {language.addEducation}
        </MenuButtonSmall>
      </div>
    </div>
  );
}
