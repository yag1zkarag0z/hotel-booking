import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { assets, cities } from '../assets/assets';
import { addDays, getToday, isValidDateRange } from '../utils/bookingDates';

const Hero = () => {
  const navigate = useNavigate();
  const today = getToday();
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState('');

  const handleCheckInChange = (event) => {
    const nextCheckIn = event.target.value;
    setCheckIn(nextCheckIn);
    setError('');

    if (checkOut && checkOut <= nextCheckIn) {
      setCheckOut('');
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const matchedCity = cities.find(
      (city) => city.toLowerCase() === destination.trim().toLowerCase(),
    );

    if (!matchedCity) {
      setError('Please select a destination from the list.');
      return;
    }

    if (!isValidDateRange(checkIn, checkOut)) {
      setError('Check-out must be after the check-in date.');
      return;
    }

    const search = new URLSearchParams({
      destination: matchedCity,
      checkIn,
      checkOut,
      guests: String(guests),
    });

    navigate(`/hotels?${search.toString()}`);
  };

  return (
    <div className='relative flex min-h-screen flex-col items-start justify-center bg-[url("/src/assets/heroImage.png")] bg-cover bg-center bg-no-repeat px-6 md:px-16 lg:px-24 xl:px-32 text-white'>
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 max-w-3xl pt-24">
        <p className="inline-flex rounded-full border border-white/15 bg-white/15 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.28em] text-white/90 backdrop-blur-md">
          The Ultimate Hotel Experience
        </p>

        <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl lg:text-7xl">
          Discover Your Perfect Gateway Destination
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-7 text-white/85 md:text-base">
          Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Start your journey today.
        </p>
      </div>

      <form onSubmit={handleSearch} className='relative z-10 mt-10 w-full max-w-5xl rounded-2xl bg-white/95 px-5 py-5 text-gray-700 shadow-2xl shadow-black/20 backdrop-blur-md flex flex-col gap-4 md:flex-row md:items-end'>
        <div className="w-full">
          <div className='flex items-center gap-2 text-sm font-medium text-gray-600'>
            <img src={assets.locationIcon} className='h-4 w-4' alt="" />
            <label htmlFor="destinationInput">Destination</label>
          </div>
          <input list='destinations' id="destinationInput" type="text" value={destination} onChange={(event) => { setDestination(event.target.value); setError(''); }} className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100" placeholder="Choose a city" required />
          <datalist id='destinations'>
            {cities.map((city, index) => (
              <option value={city} key={index} />
            ))}
          </datalist>
        </div>

        <div className="w-full">
          <div className='flex items-center gap-2 text-sm font-medium text-gray-600'>
            <img src={assets.calenderIcon} className='h-4 w-4' alt="" />
            <label htmlFor="checkIn">Check in</label>
          </div>
          <input id="checkIn" type="date" min={today} value={checkIn} onChange={handleCheckInChange} className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100" required />
        </div>

        <div className="w-full">
          <div className='flex items-center gap-2 text-sm font-medium text-gray-600'>
            <img src={assets.calenderIcon} className='h-4 w-4' alt="" />
            <label htmlFor="checkOut">Check out</label>
          </div>
          <input id="checkOut" type="date" min={addDays(checkIn || today, 1)} value={checkOut} onChange={(event) => { setCheckOut(event.target.value); setError(''); }} disabled={!checkIn} className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100 disabled:cursor-not-allowed disabled:bg-gray-100" required />
        </div>

        <div className='w-full md:w-28'>
          <label htmlFor="guests" className="text-sm font-medium text-gray-600">Guests</label>
          <select id="guests" value={guests} onChange={(event) => setGuests(Number(event.target.value))} className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100" required>
            {[1, 2, 3, 4].map((guestCount) => (
              <option key={guestCount} value={guestCount}>
                {guestCount}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className='flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-white transition hover:bg-gray-900 cursor-pointer max-md:w-full'>
         <img src={assets.searchIcon} className='h-7' alt="" /> 
          <span>Search</span>
        </button>
        {error && <p className="text-sm text-red-600 md:absolute md:-bottom-7 md:left-1" role="alert">{error}</p>}
      </form>
    </div>
  )
}

export default Hero
