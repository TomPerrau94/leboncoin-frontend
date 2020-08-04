import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm.js";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51HCMySHlsuvqmp7oRZBeEy4SHRXXvuTMydqWlphq3etqxblQEQznurXt9i4yanMUaPOXBAeNxhLZmznj4QoH7Ak200VqNTm8CH"
);

const Payment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const location = useLocation();
  const { userId, offerId } = location.state;

  // Requête pour récupérer les infos liées à l'annonce
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://leboncoin-api-tom.herokuapp.com/offer/${offerId}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
    console.log("Data is loaded");
  }, [offerId]);

  return isLoading ? (
    <div className="container">
      <span>Data is loading</span>
    </div>
  ) : (
    <div className="offerPayment smallContainer card cardRounded">
      <div className="formHead">
        <h2>Acheter en ligne</h2>
      </div>
      <div className="offerRecap">
        <img src={data.picture.secure_url} alt=""></img>
        <span className="offerPageInfosHeadTitle">{data.title}</span>
        <span className="offerPageInfosHeadPrice">{data.price} €</span>
      </div>
      <div className="offerPaymentStripeContainer">
        <span className="offerPaymentStripeTitle">
          Vos coordonnées bancaires
        </span>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            userId={userId}
            offerId={offerId}
            offerPrice={data.price}
            offerTitle={data.title}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
