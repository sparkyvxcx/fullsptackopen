import React from "react";

const Detail = ({ country, weather }) => {
  if (weather.current !== undefined) {
    return (
      <div>
        <h1>{country.name}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h2>Languages</h2>
        <ul>
          {country.languages.map((language) => (
            <Language key={language.name} language={language.name} />
          ))}
        </ul>
        <Countryflag flaglink={country.flag} />
        <Weather city={country.capital} weather={weather.current} />
      </div>
    );
  }
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((language) => (
          <Language key={language.name} language={language.name} />
        ))}
      </ul>
      <Countryflag flaglink={country.flag} />
    </div>
  );
};

const Weather = ({ city, weather }) => {
  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>Temperature: {weather.temperature} °C</p>
      <img src={weather.weather_icons} alt={`weather in ${city}`} />
      <p>
        wind: {weather.wind_speed} mph direction {weather.wind_dir}{" "}
      </p>
    </div>
  );
};

const Countryflag = ({ flaglink }) => (
  <div>
    <img src={flaglink} alt="flag" width="10%" height="10%" />
  </div>
);

const Language = ({ language }) => <li>{language}</li>;

export default Detail;
