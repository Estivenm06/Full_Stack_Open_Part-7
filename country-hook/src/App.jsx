import React, { useState, useEffect } from "react";
import request from "./services/request";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  try {
    useEffect(() => {
      request.getAll().then((res) => setCountry(res));
    }, [country, name]);
    const countrytoFind = country.find((e) =>
      e.name.common.toUpperCase().includes(name.toUpperCase())
    );
    return countrytoFind;
  } catch (error) {
    console.log(error.message);
  }
  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img
        src={country.flags.png}
        height="100"
        alt={`flag of ${country.name.common}`}
      />
    </div>
  );
};

const App = () => {
  try {
    const nameInput = useField("text");
    const [name, setName] = useState("");
    const country = useCountry(name);
    const countryToShow =
      name.toUpperCase() === country.name.common.toUpperCase()
        ? country
        : false;

    const fetch = (e) => {
      e.preventDefault();
      setName(nameInput.value);
    };

    return (
      <div>
        <form onSubmit={fetch}>
          <input {...nameInput} />
          <button>find</button>
        </form>

        <Country country={countryToShow} />
      </div>
    );
  } catch (error) {
    console.log(error.message);
  }
};

export default App;
