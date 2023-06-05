import React from "react";
import style from "./index.style.module.scss";
import { MdOutlineDragIndicator } from "react-icons/md";

const DragPlaceholder = ({ ref, children, ...props }) => {
  return (
    <div
      className={`${style.DragPlaceholder} flex-r align-center gap-sm`}
      {...props}
      ref={ref}
    >
      <>
        <MdOutlineDragIndicator /> DragPlaceholder
        {children}
      </>
    </div>
  );
};

export default DragPlaceholder;
