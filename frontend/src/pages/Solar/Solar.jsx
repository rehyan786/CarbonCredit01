

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Solar.css';

const Solar = () => {
  const [solarData, setSolarData] = useState([]);

  useEffect(() => {
    const fetchSolar = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/solar-prices');
        const data = res.data.data || [];

        // ✅ Sort alphabetically by country (case-insensitive)
        const sorted = [...data].sort((a, b) =>
          a.country.toLowerCase().localeCompare(b.country.toLowerCase())
        );

        setSolarData(sorted);
      } catch (err) {
        console.error('Failed to fetch solar data', err);
      }
    };

    fetchSolar();
  }, []);

  return (
    <div className="solar-page">
      <h1>Live Solar Prices</h1>
      <table className="solar-table">
        <thead>
          <tr>
            <th>Country</th>
            <th>Utility</th>
            <th>Residential</th>
            <th>Commercial</th>
          </tr>
        </thead>
        <tbody>
          {solarData.map((entry, idx) => (
            <tr key={entry._id || idx}>
              <td>{entry.country}</td>
              <td>{entry.utility || '-'}</td>
              <td>{entry.residential || '-'}</td>
              <td>{entry.commercial || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Solar;
