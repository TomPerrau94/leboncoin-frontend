import React from "react";
import Logo from "../components/Logo";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ className, user, setUser }) => {
  const history = useHistory();
  return (
    <div className={className}>
      <div className="headerLeft">
        <div className="logoContainer">
          <Logo />
        </div>
        <div className="headerPublishButtonContainer">
          <button
            className="primaryButton headerPublishButton"
            onClick={() => {
              history.push("/offer/publish");
            }}
          >
            <FontAwesomeIcon icon="plus-square" />
            Déposer une annonce
          </button>
        </div>
        <div className="headerSearchContainer">
          <FontAwesomeIcon icon="search" />
          <span
            className="headerSearch"
            onClick={() => {
              history.push("/");
            }}
          >
            Rechercher
          </span>
        </div>
      </div>
      <div className="headerRight">
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
    </div>
  );
};

export default Header;
