import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryDetails from './components/CountryDetails'


const App = () => {
const [value, setValue] = useState('');//user input 
const [allCountries, setAllCountries] = useState([]);//all fetched 
const [selectedCountry, setSelectedCountry] = useState(null); //currently selected country
const [filteredCountries, setFilteredCountries] = useState([]); //filtered results

useEffect(() => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
        setAllCountries(response.data);
    })
    
}, []); 

    const handleChange = (event) => {
        const newValue = event.target.value;
        
        
        setValue(newValue);
        setSelectedCountry(null); 

        
        if (!newValue.trim()) {
            setFilteredCountries([]);
            return;
        }

        const lowerCaseQuery = newValue.toLowerCase();//input value to lower case 
        const results = allCountries.filter(country => 
            country.name.common.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredCountries(results);//results of filter
    };


   const renderResults = () => {
    const count = filteredCountries.length;
    
    if (value.length === 0) {
        return <p></p>
    }
    
    if (count > 10) {
    return (
        <p >Too many matches , specify another filter.</p>
    );
    } 
    
    
    if (count === 1) {
    
    return <CountryDetails country={filteredCountries} />;
    }
    
    
    if (count > 1 && count <= 10) {
    return (
        <ul >
        {filteredCountries.map(country => (
            <li key={country.name.common}>
            <p>{country.name.common} 
            <button onClick={() => setSelectedCountry(country)}>Show</button>
            </p>
            </li>
        ))}
        </ul>
    );
    }
};

return (
    <div >
    <form >
    find country: <input value={value} onChange={handleChange} />
    </form>
    {selectedCountry 
        ? <CountryDetails country={selectedCountry} />
        : renderResults()
    }
    </div>
);
};

export default App;