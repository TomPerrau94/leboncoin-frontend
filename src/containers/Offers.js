import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import OffersSearch from "../containers/OffersSearch";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faShoppingCart,
  faSearch,
  faCaretDown,
  faUser,
  faSignOutAlt,
  faClock,
  faBell,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faShoppingCart,
  faSearch,
  faCaretDown,
  faUser,
  faSignOutAlt,
  faClock,
  faBell,
  faEye
);

const Offers = () => {
  // Declare states
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [search, setSearch] = useState(false);

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
    <span>Data is loading</span>
  ) : (
    <main className="container">
      <SearchForm setSearch={setSearch} />
      <div className="offersList">
        {!search ? (
          data.offers.map((offer, index) => {
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
          })
        ) : (
          <OffersSearch search={search} />
        )}
      </div>
      <div className="pagesNavigation"></div>
      {/* boucle 0 à nombre total de pages
         for (i = 0; i < nb total de pages; i += limit)
        renvoie un span 
          */}
    </main>
  );
};

export default Offers;
