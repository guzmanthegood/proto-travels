import { useState } from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();

  // Set default values for city and dates
  const [city, setCity] = useState('VCEI');
  const [checkin, setCheckin] = useState(() => {
    const today = new Date();
    today.setMonth(today.getMonth() + 2);
    return today.toISOString().split('T')[0];
  });
  const [checkout, setCheckout] = useState(() => {
    const today = new Date();
    today.setMonth(today.getMonth() + 2);
    today.setDate(today.getDate() + 3);
    return today.toISOString().split('T')[0];
  });

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
