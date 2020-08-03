import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const OffersSearch = ({ search, setSearch }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  // Load data
  useEffect(() => {
    // Get data from server
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://leboncoin-api-tom.herokuapp.com/offer/with-count?${search}`
        );
        //   console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
    console.log("Data is loaded");
  }, [search]);

  return isLoading ? (
    <span>Data is loading</span>
  ) : (
    <div className="offersListWithSearch">
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
                <span>{new Date(offer.created).toLocaleString()}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OffersSearch;
