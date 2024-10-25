import { useState, useEffect } from 'react';
import citiesData from '../data/cities.json'; // Asegúrate de ajustar la ruta de tu archivo JSON

const Index = () => {
  const [cityCode, setCityCode] = useState('');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const today = new Date();
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(today.getMonth() + 1);

    const checkinDate = oneMonthFromNow.toISOString().split('T')[0];
    const checkoutDate = new Date(oneMonthFromNow.setDate(oneMonthFromNow.getDate() + 3)).toISOString().split('T')[0];

    setCheckin(checkinDate);
    setCheckout(checkoutDate);
  }, []);

  const handleCityChange = (event) => {
    const input = event.target.value.toLowerCase();
    setCityCode(input);

    if (input.length > 0) {
      const filteredSuggestions = Object.entries(citiesData.cities).filter(
        ([code, city]) =>
          city.name.toLowerCase().includes(input) ||
          code.toLowerCase().includes(input) ||
          city.countryName.toLowerCase().includes(input)
      );
      setSuggestions(filteredSuggestions);
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
      setSuggestions([]);
    }
  };

  const handleSelectCity = (code) => {
    setCityCode(code);
    setDropdownVisible(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí redirigimos a la página de disponibilidad con los parámetros seleccionados
    if (cityCode && checkin && checkout) {
      window.location.href = `/availability?city=${cityCode}&checkin=${checkin}&checkout=${checkout}`;
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Search for Hotels</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit} className="search-form">
          <label>
            City:
            <input
              type="text"
              value={cityCode}
              onChange={handleCityChange}
              placeholder="Search by city, code, or country"
              onFocus={() => setDropdownVisible(true)}
              onBlur={() => setTimeout(() => setDropdownVisible(false), 200)}
            />
            {isDropdownVisible && suggestions.length > 0 && (
              <ul className="autocomplete-dropdown">
                {suggestions.map(([code, city]) => (
                  <li key={code} onClick={() => handleSelectCity(code)}>
                    {city.name} ({code}) - {city.countryName}
                  </li>
                ))}
              </ul>
            )}
          </label>
          <label>
            Check-in:
            <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} />
          </label>
          <label>
            Check-out:
            <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} />
          </label>
          <button type="submit">Search</button>
        </form>
      </main>
    </div>
  );
};

export default Index;
