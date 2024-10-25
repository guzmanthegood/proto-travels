import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import citiesData from '../data/cities.json'; // Asegúrate de ajustar la ruta de tu archivo JSON

const Index = () => {

  const router = useRouter();

  // Función para calcular fechas por defecto
  const getDefaultDates = () => {
    const today = new Date();
    const checkin = new Date(today.setMonth(today.getMonth() + 1));
    const checkout = new Date(checkin);
    checkout.setDate(checkin.getDate() + 3);
    
    return {
      checkin: checkin.toISOString().split('T')[0],
      checkout: checkout.toISOString().split('T')[0]
    };
  };

  const { checkin: defaultCheckin, checkout: defaultCheckout } = getDefaultDates();

  const [cityCode, setCityCode] = useState('VCEI');
  const [checkin, setCheckin] = useState(defaultCheckin);
  const [checkout, setCheckout] = useState(defaultCheckout);

  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const { city: queryCity, checkin: queryCheckin, checkout: queryCheckout } = router.query;

    if (queryCity) setCityCode(queryCity as string);
    if (queryCheckin) setCheckin(queryCheckin as string);
    if (queryCheckout) setCheckout(queryCheckout as string);
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
    router.push({
      pathname: '/availability',
      query: { city: cityCode, checkin, checkout },
    });
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
              placeholder="Search by city..."
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
