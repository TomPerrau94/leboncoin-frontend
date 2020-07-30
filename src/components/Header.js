import React from "react";
import Logo from "../components/Logo";

const Header = ({ className }) => {
  return (
    <div className={className}>
      <Logo />
    </div>
  );
};

export default Header;
