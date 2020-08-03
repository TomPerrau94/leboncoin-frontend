import React from "react";
import Logo from "../components/Logo";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ className, user, setUser }) => {
  const history = useHistory();
  return (
    <div className={className}>
      <Logo />
      <div className="headerLogin">
        {!user ? (
          <>
            <FontAwesomeIcon icon={"user"} />
            <Link to="/login">Se connecter</Link>
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={"sign-out-alt"} />
            <span
              onClick={() => {
                // On supprime le cookie
                Cookies.remove("token");

                // On repasse le state de user à null
                setUser(null);

                // On renvoie vers la home
                history.push("/");
              }}
            >
              Se déconnecter
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
