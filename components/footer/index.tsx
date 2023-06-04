import React from "react";
import style from "./index.style.module.scss";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      className={`${style.Footer} flex-c align-center full-width top-level-indent`}
    >
      <div className={`flex-c full-width xl-component-width tw-py-5`}>
        <Link href="https://pnbakken.no">Pål N. Bakken</Link>
      </div>
    </footer>
  );
};

export default Footer;
