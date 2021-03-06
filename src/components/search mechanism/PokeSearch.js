import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import SearchedPokes from "./SearchedPokes";

import "./PokeSearch.css";

const PokeSearch = ({ pokemons }) => {
  const [text, setText] = useState(""); // this is the searched word
  const [searchedPoke, setSearchedPoke] = useState([]);
  const [fill, setFill] = useState("#000");

  const onTermSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setSearchedPoke(
      pokemons.filter((el) => {
        const regex = new RegExp(`${text}`, "gi");
        return el.name.toString().match(regex);
      })
    );
  }, [text, pokemons]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="search container" data-testid="search-container">
      <form onSubmit={onTermSubmit}>
        <div className="search-wrapper">
          <span className="search-icon">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              style={{ fill: fill }}
            >
              <path d="M20.067 18.933l-4.157-4.157a6 6 0 10-.884.884l4.157 4.157a.624.624 0 10.884-.884zM6.5 11c0-2.62 2.13-4.75 4.75-4.75S16 8.38 16 11s-2.13 4.75-4.75 4.75S6.5 13.62 6.5 11z"></path>
            </svg>
          </span>
          <input
            className="search-input"
            onChange={handleChange}
            value={text}
            placeholder="Find an awesome Poke"
            onMouseEnter={() => setFill("#333")}
            onMouseLeave={() => setFill("#acacac")}
            aria-label="search-input"
            data-testid="search-input"
          />
        </div>
      </form>
      {text !== "" && <SearchedPokes searchedContent={searchedPoke} />}
    </div>
  );
};

PokeSearch.propTypes = {
  pokemons: PropTypes.array.isRequired,
};

export default PokeSearch;
