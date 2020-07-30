import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchForm = ({ input, setInput, handleSubmit }) => {
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInput(value);
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
              onChange={handleInputChange}
              value={input}
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
              onChange={handleInputChange}
              value={input}
            />
            <span>et</span>
            <input
              type="text"
              name="priceInput"
              placeholder="prix max"
              onChange={handleInputChange}
              value={input}
            />
          </div>
          <div className="searchFormFiltersDate">
            <input
              type="text"
              name="dateInput"
              placeholder="Tri : les plus récentes"
              onChange={handleInputChange}
              value={input}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
