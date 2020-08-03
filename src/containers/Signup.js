import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Signup = ({ setUser }) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Requête vers le serveur pour inscrire le nouvel user
    const userInput = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "https://leboncoin-api-tom.herokuapp.com/user/sign_up",
        userInput
      );
      console.log(response.data);

      if (response.data.token) {
        alert("Bienvenue !");

        const token = response.data.token;

        Cookies.set("token", token);

        setUser({ token: token });

        history.push("/");
      }
    } catch (error) {
      console.log("erreur");
      console.log(error.message);
    }
  };
  return (
    <div className="container card cardRounded signupPage">
      <div className="signupFeaturesContainer">
        <div className="signupFeaturesTitle">
          <h2>Pourquoi créer un compte ?</h2>
        </div>
        <div className="signupFeatures">
          <div className="signupFeature">
            <div className="signupFeatureIcon">
              <FontAwesomeIcon icon="clock" />
            </div>
            <div className="signupFeatureText">
              <h3 className="signupFeatureTitle">Gagnez du temps</h3>
              <p className="signupFeatureDescription">
                Publiez vos annonces rapidement, avec vos informations
                pré-remplies chaque fois que vous souhaitez déposer une nouvelle
                annonce.
              </p>
            </div>
          </div>
          <div className="signupFeature">
            <div className="signupFeatureIcon">
              <FontAwesomeIcon icon="bell" />
            </div>
            <div className="signupFeatureText">
              <h3 className="signupFeatureTitle">
                Soyez les premiers informés
              </h3>
              <p className="signupFeatureDescription">
                Créez des alertes Immo ou Emploi et ne manquez jamais l’annonce
                qui vous intéresse.
              </p>
            </div>
          </div>
          <div className="signupFeature">
            <div className="signupFeatureIcon">
              <FontAwesomeIcon icon="eye" />
            </div>
            <div className="signupFeatureText">
              <h3 className="signupFeatureTitle">Visibilité</h3>
              <p className="signupFeatureDescription">
                Suivez les statistiques de vos annonces (nombre de fois où votre
                annonce a été vue, nombre de contacts reçus).
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="signupFormContainer">
        <div className="formHead signupFormHead">
          <h2>Créez un compte</h2>
        </div>
        <form className="signupForm" onSubmit={handleSubmit}>
          <span className="inputLabel">Pseudo *</span>
          <input
            required
            type="text"
            name="username"
            onChange={handleUsernameChange}
            value={username}
          />
          <span className="inputLabel">Adresse email *</span>
          <input
            required
            type="mail"
            name="email"
            onChange={handleEmailChange}
            value={email}
          />
          <div className="signupFormHalfInputs">
            <div className="signupFormPasswordInput">
              <span className="inputLabel">Mot de passe *</span>
              <input
                required
                type="password"
                name="password"
                onChange={handlePasswordChange}
                value={password}
              />
            </div>
            <div className="signupFormConfirmPasswordInput">
              <span className="inputLabel">Confirmer le mot de passe *</span>
              <input
                required
                type="password"
                name="confirmPassword"
                onChange={handleConfirmPasswordChange}
                value={confirmPassword}
              />
            </div>
          </div>
          <div className="signupFormConsent">
            <input required type="checkbox" name="conditionsConsent" />
            <span>
              "J'accepte les{" "}
              <Link to="/cgv">Conditions Générales de Vente </Link> et les{" "}
              <Link to="/cgu">Conditions Générales d'utilisation</Link> "
            </span>
          </div>
          <button type="submit" className="secondaryButton">
            Créer mon compte personnel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
