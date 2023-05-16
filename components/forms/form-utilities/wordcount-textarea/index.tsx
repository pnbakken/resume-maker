import React, { createRef, useEffect, useState } from "react";
import style from "./index.style.module.scss";
import { ControlGroup } from "..";

const WordcountTextarea = ({
  htmlId,
  htmlName,
  className = "",
  registerAs,
  register,
  watch,
  language,
}) => {
  const [count, setCount] = useState(0);

  function wordCount(value: string): number {
    console.log(value);
    if (value) {
      const sentence = value.trim().split(" "); // create "replacePunctuation" regex function.

      const sentenceMinusExtraWhiteSpace = sentence.filter(
        (word) => word !== "" && word !== " "
      );
      return sentenceMinusExtraWhiteSpace.length;
    } else return 0;
  }

  const watchTextArea = watch(registerAs);

  useEffect(() => {
    console.log("watching textarea");
    console.log(watchTextArea);
    setCount(wordCount(watchTextArea));
  }, [watchTextArea]);

  return (
    <div>
      <textarea
        className={`${style.wordcountTextarea} ${className}`}
        id={htmlId}
        {...register(registerAs)}
      ></textarea>
      <div className="full-width flex-r justify-end">
        {count} {language.words}
      </div>
    </div>
  );
};

export default WordcountTextarea;
