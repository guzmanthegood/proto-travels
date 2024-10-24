import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


const Index = () => {
  const router = useRouter();

  // Definir estado para los valores del formulario
  const [city, setCity] = useState('VCEI');
  const [checkin, setCheckin] = useState('2024-11-24');
  const [checkout, setCheckout] = useState('2024-11-26');

  useEffect(() => {
    // Inicializar los valores del formulario con los parámetros de la query
    const { city: queryCity, checkin: queryCheckin, checkout: queryCheckout } = router.query;

    if (queryCity) setCity(queryCity as string);
    if (queryCheckin) setCheckin(queryCheckin as string);
    if (queryCheckout) setCheckout(queryCheckout as string);
  }, [router.query]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      pathname: '/availability',
      query: {
        city,
        checkin,
        checkout,
      },
    });
  };

  return (
    <div className="container">
      <header>
        <h1>Proto Travels</h1>
        <p>Your gateway to unforgettable stays!</p>
      </header>
      <main className="main-content">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="checkin">Check-in:</label>
            <input
              type="date"
              id="checkin"
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="checkout">Check-out:</label>
            <input
              type="date"
              id="checkout"
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
            />
          </div>
          <button type="submit">Search Availability</button>
        </form>
      </main>
    </div>
  );
};

export default Index;
