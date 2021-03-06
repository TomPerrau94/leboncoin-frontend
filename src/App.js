import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Offers from "./containers/Offers";
import Offer from "./containers/Offer";
import Publish from "./containers/Publish";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Payment from "./containers/Payment";
import CGU from "./containers/CGU";
import CGV from "./containers/CGV";
import "./App.css";

import Cookies from "js-cookie";

function App() {
  // Regarder si un token et un username existe en tant que cookie
  const token = Cookies.get("token");
  const username = Cookies.get("username");
  const userId = Cookies.get("userId");

  const [user, setUser] = useState({ token, username, userId } || null);
  return (
    <>
      <Router>
        <div id="content">
          <header>
            <Header
              className="header container"
              user={user}
              setUser={setUser}
            />
          </header>
          <main>
            <Switch>
              <Route path="/offer/publish">
                <Publish />
              </Route>
              <Route path="/offer/:id">
                <Offer />
              </Route>
              <Route path="/payment">
                <Payment />
              </Route>
              <Route path="/login">
                <Login setUser={setUser} />
              </Route>
              <Route path="/signup">
                <Signup setUser={setUser} />
              </Route>
              <Route path="/cgu">
                <CGU />
              </Route>
              <Route path="/cgu">
                <CGU />
              </Route>
              <Route path="/cgv">
                <CGV />
              </Route>
              <Route exact path="/">
                <Offers />
              </Route>
            </Switch>
          </main>
        </div>
        <footer className="footer">
          <Footer
            technoLink="https://fr.reactjs.org/"
            technoName="React"
            companyLink="https://www.lereacteur.io"
            companyName="le Reacteur"
            authorLink="https://github.com/TomPerrau94"
            authorName="Tom Perrau"
          />
        </footer>
      </Router>
    </>
  );
}

export default App;
