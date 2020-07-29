import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Offers from "./containers/Offers";
import Offer from "./containers/Offer";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <Header className="header" />
      </header>
      <main>Leboncoin</main>
    </div>
  );
}

export default App;
