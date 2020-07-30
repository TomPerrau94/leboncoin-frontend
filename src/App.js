import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Offers from "./containers/Offers";
import Offer from "./containers/Offer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <Header className="header container" />
      </header>
      <main>
        <Router>
          <Switch>
            <Route path="/offer/:id">
              <Offer />
            </Route>
            <Route exact path="/">
              <Offers />
            </Route>
          </Switch>
        </Router>
      </main>
      <footer>
        <Footer
          className="footer"
          technoLink="https://fr.reactjs.org/"
          technoName="React"
          companyLink="https://www.lereacteur.io"
          companyName="le Reacteur"
          authorLink="https://github.com/TomPerrau94"
          authorName="Tom Perrau"
        />
      </footer>
    </div>
  );
}

export default App;
