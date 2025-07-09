
import React, { useEffect, useState } from 'react';
import './Home.css';
import CarbonTable from '../../components/CarbonTable';
import axios from 'axios';
import LineGraph from '../../components/LineBar';


const Home = () => {
  const [carbonData, setCarbonData] = useState({
    compliance: [],
    voluntary: [],
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCarbonPrices = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/carbon-prices`);
        const { complianceMarkets, voluntaryMarkets } = res.data;

        setCarbonData({
          compliance: complianceMarkets,
          voluntary: voluntaryMarkets,
        });
      } catch (error) {
        console.error('Error fetching carbon prices:', error);
      }
    };

    fetchCarbonPrices();
  }, []);

  return (
  <div className="home">
    <h1 className='' style={{ fontSize: '8vw',paddingTop:'4vh' }}>Carbon Credit</h1>
    <LineGraph />
    <div className="hero">
      <h1>Live Carbon Prices</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>

    {/* ✅ Put CarbonTable inside the same container */}
    <CarbonTable data={carbonData} searchTerm={searchTerm} />
  </div>
);

};

export default Home;
