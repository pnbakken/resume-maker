import HeaderNav from "../navigation/header-nav";
import style from "./index.style.module.scss";

const Header = () => {
  return (
    <header className={`${style.header} full-width flex-c align-center`}>
      <HeaderNav />
    </header>
  );
};

export default Header;
