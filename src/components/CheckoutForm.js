import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
// import Cookies from "js-cookie";

const CheckoutForm = ({ userId, offerId, offerPrice, offerTitle }) => {
  // const token = Cookies.get("token");
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Récupération des données bancaires entrées par l'user
    const cardElement = elements.getElement(CardElement);

    // Création d'un token via API Stripe
    // Envoi des données bancaires dans la requête
    const stripeResponse = await stripe.createToken(cardElement, {
      name: userId,
    });
    console.log(stripeResponse);
    const stripeToken = stripeResponse.token.id;

    // Une fois le token reçu de l'API Stripe, on l'envoie au serveur via une requête depuis l'API Stripe
    const response = await axios.post(
      "https://leboncoin-api-tom.herokuapp.com/payment",
      {
        token: stripeToken,
        title: offerTitle,
        amount: Number(offerPrice) * 100,
      }
    );
    console.log(response.data);

    // Si la réponse du serveur est favorable, le paiement est validé
    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };

  return !completed ? (
    <form onSubmit={handleSubmit} className="offerPaymentForm">
      <div className="offerPaymentStripeFormContainer">
        <CardElement />
        <button type="submit" className="primaryButton">
          Procéder au paiement
        </button>
      </div>
    </form>
  ) : (
    <div className="offerPaymentStripeFormContainer">
      <span>Paiement effectué avec succès !</span>
    </div>
  );
};

export default CheckoutForm;
