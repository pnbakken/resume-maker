import { useState, useContext } from "react";
import style from "./index.style.module.scss";
import { Collapsible, Fieldset, FieldsetHeader } from "../../form-utilities";
import ResumeContext from "@/context/resume-collection-context";
import { useFieldArray } from "react-hook-form";
import WorkItem from "./work-item";
import MenuButtonSmall from "@/components/buttons/menu-button-small";
import {
  MdOutlineDragHandle,
  MdOutlineDragIndicator,
  MdOutlinePostAdd,
} from "react-icons/md";
import { ResumeMakerSubSectionProps } from "@/types";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DragPlaceholder from "@/components/utility/drag-placeholder";

const EmploymentHistory = ({
  register,
  language,
  control,
  watch,
}: ResumeMakerSubSectionProps) => {
  const [show, setShow] = useState(true);

  function handleShow() {
    setShow(!show);
  }

  return (
    <Fieldset className={`${style.employmentHistory} flex-c gap-md `}>
      <FieldsetHeader
        title={language.employmentHistory}
        titleSize={2}
        callback={handleShow}
        isOpen={show}
      />
      <Collapsible show={show}>
        <EmploymentHistoryManager
          register={register}
          control={control}
          language={language}
          watch={watch}
        />
      </Collapsible>
    </Fieldset>
  );
};

export default EmploymentHistory;

function EmploymentHistoryManager({
  register,
  language,
  control,
  watch,
}: ResumeMakerSubSectionProps) {
  const { fields, append, move, remove } = useFieldArray({
    control,
    name: "employment_history",
  });

  const onDragEnd = (result) => {
    if (!result.destination) {
      // dropped outside the list
      return;
    }

    move(result.source.index, result.destination.index);
  };

  return (
    <div className={`${style.employmentHistoryManager} flex-c gap-md`}>
      {fields.length > 0 && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="employment-history"
            renderClone={(provided, snapshot, rubric) => (
              <DragPlaceholder
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                Employment
              </DragPlaceholder>
            )}
          >
            {(provided) => (
              <ul
                className={`${style.employmentHistoryList} no-list-style flex-c gap-md`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {fields.map((item, index) => {
                  return (
                    <WorkItem
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
          <MdOutlinePostAdd /> {language.addEmployment}
        </MenuButtonSmall>
      </div>
    </div>
  );
}
