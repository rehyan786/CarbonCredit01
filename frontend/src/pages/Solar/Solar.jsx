

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
   <div>
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
    <div className='carbon-info-grid'>
       <div className='info-block-1'>
          <h2>Solar Pricing: What is LCOE?</h2>
          <p className='abcd'>LCOE (Levelized Cost of Electricity) is a key metric used to <strong>compare the cost of generating electricity from different energy sources</strong>, including <strong>solar PV</strong>, wind, fossil fuels, and nuclear power. It represents the total lifetime cost of a power system divided by the total energy produced over its lifespan, measured in $/MWh (dollars per megawatt-hour).</p>
          <p>For Solar PV, the LCOE calculation includes:</p>
          <ul>
            <li>Capital & Financing Costs</li>
            <li>Operation and Maintenance</li>
            <li>System lifespan & Degradation Rate</li>
            <li>Energy Production Over Time</li>
          </ul>
       </div>
       <div className='info-block-2'>
        <h2>Utility Solar PV Pricing</h2>
        <p className='abcd'>Utility solar PV pricing refers to the cost of <strong>large-scale</strong> solar photovoltaic (PV) projects that <strong>supply electricity to the grid</strong>, typically operated by utilities or independent power producers (IPPs). These projects range from megawatt (MW) to gigawatt (GW) scale, making them the most cost-effective form of solar energy due to economies of scale and lower installation costs per kilowatt-hour (kWh).</p>
         <p className='abcd'>The solar price for utility-scale projects is measured using LCOE, which  typically has the lowest LCOE among all solar PV sectors.</p>
         <p>As solar prices continue to decline, utility solar PV plays a key role in the global energy transition, supporting large-scale renewable energy adoption.</p>
       </div>
       <div className="info-block-3">
          <h2>Residential Solar PV Pricing</h2>
          <p>Residential solar PV refers to <strong>home</strong> solar power systems that generate electricity using photovoltaic (PV) panels. The solar price for  <strong>residential installations</strong> depends on factors like system size, installation costs, location, and available incentives.</p>
           <p>While residential solar pricing is typically higher per megawatt-hour (MWh) than utility-scale projects, <strong>homeowners can lower costs through net metering, tax credits, and long-term energy savings</strong>.</p>
       </div>
       <div className="info-block-4">
          <h2>Commercial Solar PV Pricing</h2>
          <p>Commercial solar PV refers to solar photovoltaic (PV) systems installed<strong> on businesses, offices, factories, and other commercial properties to</strong> generate electricity. The solar price for commercial projects varies based on system size, location, energy needs, and available incentives.</p>
          <p>Unlike residential solar, commercial solar pricing benefits from <strong>economies of scale</strong>, resulting in a lower levelized cost of electricity (LCOE). Businesses can offset energy costs through net metering, power purchase agreements (PPAs), and tax credits, making commercial solar an efficient and cost-effective solution for reducing long-term electricity expenses.</p>
       </div>
    </div>
  </div>
  );
};

export default Solar;
