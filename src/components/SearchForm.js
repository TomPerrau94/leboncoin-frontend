import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchForm = ({ setSearch }) => {
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

    // On déclare une variable query qui sera passée dans l'url de reqûete
    let query = "";

    if (filters.length > 1) {
      query = filters.join("&");
      console.log(query);
    } else {
      query = filters.join();
      console.log(query);
    }

    setSearch(query);
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
          <div className="searchFormFiltersDate">
            <input
              type="text"
              name="dateInput"
              placeholder="Tri : les plus récentes"
              onChange={handleSortChange}
              value={sort}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
