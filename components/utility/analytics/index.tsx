"use client";

import { useEffect } from "react";
import style from "./index.style.module.scss";
import { hotjar } from "react-hotjar";
const Analytics = () => {
  useEffect(() => {
    hotjar.initialize(3518650, 6);
  }, []);

  return <></>;
};

export default Analytics;
