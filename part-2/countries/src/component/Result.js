import React from "react";
import Detail from "./Detail";

const Result = ({ countries, onClickHandler, weather }) => {
  if (countries.length > 10) {
    return (
      <div>
        <p>Too many matches, please specify another filter</p>
      </div>
    );
  }

  if (countries.length === 1) {
    return <Detail country={countries[0]} weather={weather} />;
  }
  return (
    <div>
      {countries.map((country) => (
        <Country
          key={country.alpha3Code}
          country={country}
          showDetail={onClickHandler(country)}
        />
      ))}
    </div>
  );
};

const Country = ({ country, showDetail }) => {
  return (
    <div>
      {country.name} <button onClick={showDetail}>Show</button>
    </div>
  );
};

export default Result;
