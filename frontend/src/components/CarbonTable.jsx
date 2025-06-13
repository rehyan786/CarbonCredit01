// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./CarbonTable.css";

// const CarbonTable = () => {
//   const [carbonData, setCarbonData] = useState([]);

//   useEffect(() => {
//     const fetchCarbonPrices = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/carbon-prices");
//         const { complianceMarkets, voluntaryMarkets } = res.data;

//         const combinedMarkets = [
//           ...complianceMarkets.map((item) => ({ ...item, type: "Compliance" })),
//           ...voluntaryMarkets.map((item) => ({ ...item, type: "Voluntary" })),
//         ];

//         setCarbonData(combinedMarkets);
//       } catch (error) {
//         console.error("Error fetching carbon prices:", error);
//       }
//     };

//     fetchCarbonPrices();
//   }, []);

//   return (
//     <div className="carbon-table">
//       <table>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Carbon</th>
//             <th>Last</th>
//             <th>Change</th>
//             <th>YTD</th>
//             {/* <th>Type</th> */}
//           </tr>
//         </thead>
//         <tbody>
//           {carbonData.map((market, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>{market.name}</td>
//               <td>{market.lastPrice}</td>
//               <td>{market.change}</td>
//               <td>{market.ytdChange}</td>
//               {/* <td>{market.type}</td> */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CarbonTable;


// import React from 'react';
// import './CarbonTable.css'; // optional

// const CarbonTable = ({ data }) => {
//   return (
//     <div className='carbon-table'>
//       <div className='table-layout table-header'>
//         <p>#</p>
//         <p>Carbon</p>
//         <p>Last</p>
//         <p style={{ textAlign: 'center' }}>Change</p>
//         <p className='ytd'>YTD</p>
//       </div>

//       {data.map((item, index) => (
//         <div key={index} className='table-layout table-row'>
//           <p>{index + 1}</p>
//           <p>{item.name}</p>
//           <p>{item.lastPrice}</p>
//           <p style={{ textAlign: 'center' }}>{item.change}</p>
//           <p className='ytd'>{item.ytdChange}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CarbonTable;


// import React from 'react';
// import './CarbonTable.css';

// const CarbonTable = ({ data }) => {
//   return (
//     <div className='carbon-table'>
//       <div className='table-layout table-header'>
//         <p>#</p>
//         <p>Carbon</p>
//         <p>Last</p>
//         <p style={{ textAlign: 'center' }}>Change</p>
//         <p className='ytd'>YTD</p>
//       </div>

//       {data.map((item, index) => (
//         <div key={item._id || index} className='table-layout table-row'>
//           <p>{index + 1}</p>
//           <p>{item.name}</p>
//           <p>{item.lastPrice}</p>
//           <p
//             style={{
//               textAlign: 'center',
//               color: item.change?.includes('-') ? 'red' : 'green',
//             }}
//           >
//             {item.change}
//           </p>
//           <p
//             className='ytd'
//             style={{
//               color: item.ytdChange?.includes('-') ? 'red' : 'green',
//             }}
//           >
//             {item.ytdChange}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CarbonTable;

import React from 'react';
import './CarbonTable.css';

const CarbonTable = ({ data, searchTerm }) => {
  if (!data) return null;

  const filterData = (list) =>
    Array.isArray(list)
      ? list.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  const renderSection = (title, list) => {
    return (
      <>
        <tr className="section-header">
          <td colSpan="5">{title}</td>
        </tr>
        {list.map((item, index) => (
          <tr key={`${title}-${index}`}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.lastPrice || '-'}</td>
            <td style={{ color: item.change?.includes('-') ? 'red' : 'limegreen' }}>
              {item.change || '-'}
            </td>
            <td style={{ color: item.ytdChange?.includes('-') ? 'red' : 'limegreen' }}>
              {item.ytdChange || '-'}
            </td>
          </tr>
        ))}
      </>
    );
  };

  const filteredCompliance = filterData(data.compliance);
  const filteredVoluntary = filterData(data.voluntary);

  return (
    <div className="carbon-table-container">
      <table className="carbon-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Carbon</th>
            <th>Last</th>
            <th>Change</th>
            <th>YTD</th>
          </tr>
        </thead>
        <tbody>
          {renderSection('Compliance Markets', filteredCompliance)}
          {renderSection('Voluntary Markets', filteredVoluntary)}
        </tbody>
      </table>
    </div>
  );
};

export default CarbonTable;
