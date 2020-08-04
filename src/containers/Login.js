import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginCheck, setLoginCheck] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Requête vers le serveur pour récupérer le token de l'user

    const userInput = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "https://leboncoin-api-tom.herokuapp.com/user/log_in",
        userInput
      );
      console.log(response.data);

      if (response.data.token) {
        // On récupère la valeur du token et du username
        const token = response.data.token;
        const username = response.data.account.username;
        const userId = response.data._id;

        // On sauvegarde le token et le username dans un cookie
        Cookies.set("token", token, {
          expires: 7,
          samesite: "none",
          secure: true,
        });
        Cookies.set("username", username, {
          expires: 7,
          samesite: "none",
          secure: true,
        });
        Cookies.set("userId", userId, {
          expires: 7,
          samesite: "none",
          secure: true,
        });

        // On remplace le bouton du header
        setUser({ token: token, username: username, userId: userId });

        // On change le state de loginCheck
        setLoginCheck(true);

        // On redirige l'utilisateur vers la homepage
        history.push("/");
      }
    } catch (error) {
      console.log("erreur");
      console.log(error.message);
      setLoginCheck(false);
      setPassword("");
    }
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const history = useHistory();

  return (
    <div className="loginPage smallContainer">
      <div className="loginFormContainer card">
        <div className="formHead loginFormHead">
          <h2>Connexion</h2>
        </div>
        <form className="loginForm" onSubmit={handleSubmit}>
          <span className="inputLabel">Adresse email</span>
          {loginCheck ? (
            <input
              type="mail"
              name="email"
              onChange={handleEmailChange}
              value={email}
            />
          ) : (
            <input
              style={{ borderColor: "red" }}
              type="mail"
              name="email"
              onChange={handleEmailChange}
              value={email}
            />
          )}
          <span className="inputLabel">Mot de passe</span>
          {loginCheck ? (
            <input
              type="password"
              name="password"
              onChange={handlePasswordChange}
              value={password}
            />
          ) : (
            <input
              style={{ borderColor: "red" }}
              type="password"
              name="password"
              onChange={handlePasswordChange}
              value={password}
            />
          )}

          {!loginCheck ? (
            <span className="loginErrorMessage">
              Votre email et/ou mot de passe est/sont incorrect(s)
            </span>
          ) : null}
          <button type="submit" className="secondaryButton">
            Se connecter
          </button>
        </form>
      </div>
      <div className="loginPageLink card">
        <span>Vous n'avez pas de compte ?</span>
        <button
          className="tertiaryButton"
          onClick={() => {
            history.push("/signup");
          }}
        >
          Créer un compte
        </button>
      </div>
    </div>
  );
};

export default Login;
