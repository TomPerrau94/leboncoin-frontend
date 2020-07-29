import React from "react";
import Logo from "../components/Logo";

const Header = ({ className }) => {
  return (
    <div className={`${className} container`}>
      <Logo />
    </div>
  );
};

export default Header;
