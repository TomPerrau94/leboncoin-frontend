import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const SearchForm = ({ setData }) => {
  const [searchInput, setSearchInput] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sort, setSort] = useState("");

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);
  };

  const handlePriceMinChange = (event) => {
    const value = event.target.value;
    setPriceMin(value);
  };

  const handlePriceMaxChange = (event) => {
    const value = event.target.value;
    setPriceMax(value);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSort(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // On définit tableau filters qui regroupera les filtres rentrés
    let filters = [];

    // On récupère les filtres rentrés par l'user
    if (searchInput) {
      filters.push(`title=${searchInput}`);
    }

    if (priceMin) {
      filters.push(`priceMin=${priceMin}`);
    }

    if (priceMax) {
      filters.push(`priceMax=${priceMax}`);
    }

    if (sort) {
      filters.push(`sort=${sort}`);
    }

    // On déclare une variable search qui sera passée dans l'url de reqûete et qui contiendra les éléments du tableau filters dans une string
    let search = "";

    if (filters.length > 1) {
      search = filters.join("&");
      console.log(search);
    } else {
      search = filters.join();
      console.log(search);
    }

    try {
      const response = await axios.get(
        `https://leboncoin-api-tom.herokuapp.com/offer/with-count?${search}`
      );
      //   console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="searchOffers card cardRounded">
      <div className="searchFormContainer">
        <div className="searchFormLine topLine">
          <div className="relative">
            <input
              type="text"
              name="searchInput"
              placeholder="Que recherchez-vous ?"
              onChange={handleSearchInputChange}
              value={searchInput}
            />
            <span className="searchIcon">
              <FontAwesomeIcon icon="search" />
            </span>
          </div>

          <button type="submit" className="secondaryButton">
            Rechercher
          </button>
        </div>
        <div className="searchFormLine bottomLine">
          <div className="searchFormFiltersPrice">
            <span>Prix entre</span>
            <input
              type="text"
              name="priceInput"
              placeholder="prix min"
              onChange={handlePriceMinChange}
              value={priceMin}
            />
            <span>et</span>
            <input
              type="text"
              name="priceInput"
              placeholder="prix max"
              onChange={handlePriceMaxChange}
              value={priceMax}
            />
          </div>
          <select onChange={handleSortChange} className="searchFormFiltersDate">
            <option value="date-desc">Les plus récentes</option>
            <option value="date-asc">Les plus anciennes</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="price-asc">Prix croissant</option>
          </select>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
