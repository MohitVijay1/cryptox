import React, { useState, useEffect } from 'react';
import Coin from './Coin'
import './App.css'

function App() {
  const [coin, setcoin] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then(res => res.json())
      .then(res => {
       
        setcoin(res)
      });
  }, [])
  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coin.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input
            className='coin-input'
            type='text'
            
            onChange={handleChange}
            placeholder='Search..' 
          />
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}

export default App
