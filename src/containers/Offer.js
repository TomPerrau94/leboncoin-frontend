import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Offer = () => {
  const token = Cookies.get("token");
  const username = Cookies.get("username");
  const userId = Cookies.get("userId");

  const { id } = useParams();
  const history = useHistory();

  // Declare states
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  // Get data from server
  useEffect(() => {
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
    fetchData();
    console.log("Data is loaded");
  }, [id]);

  return isLoading ? (
    <div className="container">
      <span>Data is loading</span>
    </div>
  ) : (
    <div>
      <div className="container">
        <div className="offerPage">
          <article className="offerPageInfos">
            <img src={data.picture.secure_url} alt="" />
            <div className="offerPageInfosHead card">
              <div className="offerPageInfosHeadText">
                <span className="offerPageInfosHeadTitle">{data.title}</span>
                <span className="offerPageInfosHeadPrice">{data.price} €</span>
              </div>
              <span className="offerPageInfosHeadDate">
                {new Date(data.created).toLocaleString()}
              </span>
            </div>
            <div className="offerPageInfosDescrition">
              <h4>Description</h4>
              <p>{data.description}</p>
            </div>
            <Link to="/">Retourner à la liste d'offres</Link>
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
              <button
                className="primaryButton"
                onClick={() => {
                  if (token) {
                    history.push("/payment", {
                      username: username,
                      userId: userId,
                      offerId: data._id,
                    });
                  } else {
                    history.push("/login");
                  }
                }}
              >
                <FontAwesomeIcon icon="shopping-cart" />
                Acheter
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Offer;
