import React, { useState, useEffect } from "react";
import axios from "axios";
import Result from "./component/Result";

const SECRET_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
  const endpoint = "https://restcountries.eu/rest/v2/all";
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [weather, setWeather] = useState({});
  const [capital, setCapital] = useState("");

  useEffect(() => {
    axios.get(endpoint).then((response) => {
      setCountries(response.data);
    });
  }, []);

  const onChangeHanlde = (event) => {
    const search = event.target.value.toLowerCase();
    setCountriesToShow(
      countries.filter((country) => {
        let name = country.name.toLowerCase();
        return name.search(search) >= 0;
      })
    );
    if (countriesToShow.length === 1) {
      if (countriesToShow[0].capital !== capital) {
        setCapital(countriesToShow[0].capital);
      }
    }
  };

  const onClickHandle = (country) => () => {
    setCountriesToShow([country]);
    setCapital(countriesToShow[0].capital);
  };

  useEffect(() => {
    if (capital.length !== 0) {
      const endpoint = `http://api.weatherstack.com/current?access_key=${SECRET_KEY}&query=${capital}`;
      axios.get(endpoint).then((response) => {
        console.log("Current", response.data);
        setWeather(response.data);
      });
    }
  }, [capital]);

  return (
    <div className="App">
      <p>
        find countries <input onChange={onChangeHanlde} />
      </p>
      <Result
        countries={countriesToShow}
        onClickHandler={onClickHandle}
        weather={weather}
      />
    </div>
  );
};

export default App;
