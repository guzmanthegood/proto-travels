import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import citiesData from '../data/cities.json'; // Ajusta la ruta según tu estructura de archivos

const Index = () => {
  const router = useRouter();

  const [cityCode, setCityCode] = useState('VCEI');
  const [checkin, setCheckin] = useState('2024-11-24');
  const [checkout, setCheckout] = useState('2024-11-26');

  useEffect(() => {
    const { city: queryCity, checkin: queryCheckin, checkout: queryCheckout } = router.query;

    if (queryCity) setCityCode(queryCity as string);
    if (queryCheckin) setCheckin(queryCheckin as string);
    if (queryCheckout) setCheckout(queryCheckout as string);
  }, [router.query]);

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
            <select value={cityCode} onChange={(e) => setCityCode(e.target.value)}>
              {Object.entries(citiesData.cities).map(([code, { name }]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
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
