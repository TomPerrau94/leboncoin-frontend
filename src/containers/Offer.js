import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();
  // Declare states
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  // Get data from server
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://leboncoin-api-tom.herokuapp.com/offer/${id}`
      );
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
    <div>
      <main className="container">
        <div className="offerPage">
          <article className="offerPageInfos">
            <img src={data.picture.url} alt="" />
            <div className="offerPageInfosHead card">
              <div className="offerPageInfosHeadText">
                <span className="offerPageInfosHeadTitle">{data.title}</span>
                <span className="offerPageInfosHeadPrice">{data.price} €</span>
              </div>
              <span className="offerPageInfosHeadDate">{data.created}</span>
            </div>
            <div className="offerPageInfosDescrition">
              <h4>Description</h4>
              <p>{data.description}</p>
            </div>
            <Link to="/">Go back to offers list</Link>
          </article>
          <aside className="offerPageSide">
            <div className="offerPageCreatorInfos card ">
              <span className="offerPageCreatorName">
                {data.creator.account.username}
              </span>
              <span className="offerPageCreatorOtherOffers">
                17 annonces créées
              </span>
            </div>
            <div className="offerBuy card">
              <button className="primaryButton">Acheter</button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Offer;
