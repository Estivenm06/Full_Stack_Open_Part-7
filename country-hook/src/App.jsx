import React, { useState } from "react";

import { useField } from "./hook/useField";
import { useCountry } from "./hook/useCountry";
import { Country } from "./components/Country";

const App = () => {
    const nameInput = useField("text");
    const [country, setCountry] = useState([]);

    const onSubmit = async (e) => {
      e.preventDefault();
      const name = e.target.querySelector('input').value;
      if(name.trim() === '') {
        alert('Input is empty.')
        return;
      }
      const {country} = await useCountry(name);
      setCountry([country]);
    };

    return (
      <div>
        <form onSubmit={onSubmit}>
          <input {...nameInput} />
          <button>find</button>
        </form>
        {country.length !== 0 ? (
          <Country country={country[0]} />
        ): (
          <div>No country to search...</div>
        )}
      </div>
    );
};

export default App;
