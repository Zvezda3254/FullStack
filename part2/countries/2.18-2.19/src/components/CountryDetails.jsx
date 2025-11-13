const CountryDetails = ({ country }) => {
  if (!country) return null;

  
  const languages = country.languages 
    ? Object.values(country.languages).join(', ') //if exists takes values and joins if more then one language
  : 'N/A';//if not returns N/A
  
  const officialName = country.name.official || 'N/A';
  const capital = country.capital ? country.capital : 'N/A';

  return (
    <div>
      <h2 >{country.name.common}</h2>
      <p >Official Name: {officialName}</p>
      
      <div >
        <p>Capital:{capital}</p>
        <p>
          Area/km2/:{country.area}
        </p>
        <p>Languages:{languages}</p>
      </div>

      <div >
        Flag:
        <img 
          src={country.flags.svg} 
          alt={`Flag of ${country.name.common}`} 
       />
      </div>
    </div>
  );
};
export default CountryDetails;
