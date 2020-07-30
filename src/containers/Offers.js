import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faShoppingCart,
  faSearch,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
library.add(faShoppingCart, faSearch, faCaretDown);

const Offers = () => {
  // Declare states
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [input, setInput] = useState("");

  // Get data from server
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://leboncoin-api-tom.herokuapp.com/offer/with-count"
      );
      //   console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Load data
  useEffect(() => {
    fetchData();
    console.log("Data is loaded");
  }, []);

  // Search function
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return isLoading ? (
    <span>Data is loading</span>
  ) : (
    <div>
      <main className="container">
        <SearchForm
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
        />
        <div className="offersList">
          {data.offers.map((offer, index) => {
            return (
              <div className="offer card cardRounded" key={index}>
                <img src={offer.picture.url} alt=""></img>
                <div className="offerInfos">
                  <div className="offerTextInfos">
                    <span className="offerTitle">{offer.title}</span>
                    <span className="offerPrice">{offer.price} €</span>
                    <span>
                      <Link to={`/offer/${offer._id}`}>Voir l'annonce</Link>
                    </span>
                  </div>
                  <div className="offerDateInfos">
                    <span>{offer.created}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pagesNavigation">
          <Link to="/offer/wifth-count?page=2">Page 2</Link>
        </div>
      </main>
    </div>
  );
};

export default Offers;
