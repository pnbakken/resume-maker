import Link from "next/link";
import style from "./index.style.module.scss";

const HeaderNav = () => {
  return (
    <div className="top-level-indent">
      <nav
        className={`${style.headerNav} flex-r full-width xl-component-width`}
      >
        <div className={`${style.navBrand} full-width`}>
          <Link href="/">Resume Maker</Link>
        </div>
      </nav>
    </div>
  );
};

export default HeaderNav;
