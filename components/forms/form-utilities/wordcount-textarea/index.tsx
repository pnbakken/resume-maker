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
}: {
  htmlId?: string;
  htmlName: string;
  className?: string;
  registerAs: string;
  register: any;
  watch: any;
  language: any;
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
    setCount(wordCount(watchTextArea));
  }, [watchTextArea]);

  return (
    <div>
      <textarea
        className={`${style.wordcountTextarea} ${className}`}
        id={htmlId}
        name={htmlName}
        {...register(registerAs)}
      ></textarea>
      <div className="full-width flex-r justify-end small-text">
        {count} {language.words}
      </div>
    </div>
  );
};

export default WordcountTextarea;
