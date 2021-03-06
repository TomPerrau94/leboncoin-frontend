import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faShoppingCart,
  faSearch,
  faCaretDown,
  faUser,
  faClock,
  faBell,
  faEye,
  faPlusSquare,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faShoppingCart,
  faSearch,
  faCaretDown,
  faUser,
  faClock,
  faBell,
  faEye,
  faPlusSquare,
  faCheckCircle
);

const Offers = () => {
  // Declare states
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

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

  return isLoading ? (
    <div className="container">
      <span>Data is loading</span>
    </div>
  ) : (
    <div className="container">
      <SearchForm setData={setData} />
      <div className="offersList">
        {data.offers.map((offer, index) => {
          return (
            <div className="offer card cardRounded" key={index}>
              <img src={offer.picture.secure_url} alt=""></img>
              <div className="offerInfos">
                <div className="offerTextInfos">
                  <span className="offerTitle">{offer.title}</span>
                  <span className="offerPrice">{offer.price} €</span>
                  <span>
                    <Link to={`/offer/${offer._id}`}>Voir l'annonce</Link>
                  </span>
                </div>
                <div className="offerDateInfos">
                  <span>{new Date(offer.created).toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pagesNavigation"></div>
      {/* boucle 0 à nombre total de pages
         for (i = 0; i < nb total de pages; i += limit)
        renvoie un span 
        pour le numéro de page : (i / limit) + 1
          */}
    </div>
  );
};

export default Offers;
