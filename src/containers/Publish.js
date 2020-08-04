import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";
import Dropzone from "react-dropzone";

const Publish = () => {
  const token = Cookies.get("token");
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState();

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPrice(value);
  };

  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]);
  //   console.log(file);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(file);
    // Pour envoyer le fichier uploadé au serveur, il faut créer un objet formData (grâce à la class JS FormData()) qui va regrouper les entrées du formulaire en plus du fichier
    const formData = new FormData();

    // Pour ajouter les valeurs au formData on passe par la méthode append() qui associe une "clé" à une valeur. Attention à bien réutiliser les mêmes clés que ce que le back attend
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("picture", file);
    console.log(file);

    // Requête vers le serveur
    try {
      const response = await axios.post(
        "https://leboncoin-api-tom.herokuapp.com/offer/publish",
        formData,
        { headers: { authorization: "Bearer " + token } }
      );
      console.log(response.data);
      //   const offerId = response.data._id;
      //   const offerTitle = response.data.title;
      //   history.push(`/publishSuccess${offerId}/${offerTitle}`);
      history.push(`/offer/${response.data._id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return token ? (
    <div className="smallContainer card cardRounded publishOffer">
      <div className="formHead">
        <h2>Déposer une annonce</h2>
      </div>
      <form className="publishForm" onSubmit={handleSubmit}>
        <span className="inputLabel">Titre de l'annonce *</span>
        <input
          required
          type="text"
          name="title"
          onChange={handleTitleChange}
          value={title}
        />
        <span className="inputLabel">Texte de l'annonce *</span>
        <textarea
          required
          name="description"
          rows="5"
          cols="33"
          onChange={handleDescriptionChange}
          value={description}
        />
        <span className="inputLabel">Prix *</span>
        <input
          required
          type="text"
          name="price"
          onChange={handlePriceChange}
          value={price}
        />
        <span className="inputLabel">Photo *</span>
        <Dropzone
          className="dropzoneContainer"
          multiple={false}
          onDrop={(acceptedFiles) => {
            setFile(acceptedFiles[0]);
            console.log(acceptedFiles);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>
                  Glissez-déposez ou cliquez pour parcourir et ajouter votre
                  photo
                </p>
              </div>
            </section>
          )}
        </Dropzone>
        {/* <input type="file" name="file" onChange={handleFileChange} /> */}
        <button type="submit" className="secondaryButton">
          Valider
        </button>
      </form>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Publish;
