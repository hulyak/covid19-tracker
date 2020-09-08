import React, { useState, useEffect } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from '@material-ui/core';
import './App.css';
import InfoBox from './components/InfoBox';
import Map from './components/Map';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2, // us ,usa fr
          }));

          setCountries(countries); // change the countries
        });
    };
    getCountriesData(); // call useEffect
  }, []);

  const onCountryChange = (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
  };
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app__dropdown">
            {/* worldwide selected */}
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {/* Loop through all the countries and show a dropdown list of the options  - short term memory for state */}
              {countries.map((country) => (
                <MenuItem value={country.value} key={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="Coronavirus cases" total={20000} cases={123} />
          <InfoBox title="Recovered" total={40000} cases={1234} />
          <InfoBox title="Deaths" total={40000} cases={1234} />
        </div>
        <Map />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <h3>Worldwide new cases</h3>
          {/* <Table /> */}
          {/* <Graph /> */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
