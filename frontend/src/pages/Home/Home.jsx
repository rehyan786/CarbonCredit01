// import React from 'react';
// import './Home.css';

// const Home = () => {
//   return (
//     <>
//       <div className='home'>
//         <div className='hero'>
//           <h1>Live Carbon Prices</h1>
//           <p></p>
//           <form>
//             <input type='text' placeholder='Search' />
//             <button type='submit'>Search</button>
//           </form>
//         </div>
//       </div>

//       <div className='carbon-table'>
//         <div className='table-layout'>
//           <p>#</p>
//           <p>Carbon</p>
//           <p>Last</p>
//           <p style={{textAlign:"center"}}>Change</p>
//           <p className='ytd'>YTD</p>
//           {/* <p className="typ">Type</p> */}
          
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;


// import React, { useEffect, useState } from 'react';
// import './Home.css';
// import CarbonTable from '../../components/CarbonTable'; // adjust path as per actual location
// import axios from 'axios';

// const Home = () => {
//   const [carbonData, setCarbonData] = useState([]);

//   useEffect(() => {
//     const fetchCarbonPrices = async () => {
//       try {
//         const res = await axios.get('http://localhost:3000/api/carbon-prices');
//         const { complianceMarkets, voluntaryMarkets } = res.data;

//         const combined = [
//           ...complianceMarkets.map((item) => ({ ...item, type: 'Compliance' })),
//           ...voluntaryMarkets.map((item) => ({ ...item, type: 'Voluntary' })),
//         ];

//         setCarbonData(combined);
//       } catch (error) {
//         console.error('Error fetching carbon prices:', error);
//       }
//     };

//     fetchCarbonPrices();
//   }, []);

//   return (
//     <>
//       <div className='home'>
//         <div className='hero'>
//           <h1>Live Carbon Prices</h1>
//           <form>
//             <input type='text' placeholder='Search' />
//             <button type='submit'>Search</button>
//           </form>
//         </div>
//       </div>

//       <CarbonTable data={carbonData} />
//     </>
//   );
// };

// export default Home;


// import React, { useEffect, useState } from 'react';
// import './Home.css';
// import CarbonTable from '../../components/CarbonTable';
// import axios from 'axios';

// const Home = () => {
//   const [complianceData, setComplianceData] = useState([]);
//   const [voluntaryData, setVoluntaryData] = useState([]);

//   useEffect(() => {
//     const fetchCarbonPrices = async () => {
//       try {
//         const res = await axios.get('http://localhost:3000/api/carbon-prices');
//         const { complianceMarkets, voluntaryMarkets } = res.data;

//         setComplianceData(complianceMarkets);
//         setVoluntaryData(voluntaryMarkets);
//       } catch (error) {
//         console.error('Error fetching carbon prices:', error);
//       }
//     };

//     fetchCarbonPrices();
//   }, []);

//   return (
//     <>
//       <div className='home'>
//         <div className='hero'>
//           <h1>Live Carbon Prices</h1>
//           <form>
//             <input type='text' placeholder='Search' />
//             <button type='submit'>Search</button>
//           </form>
//         </div>
//       </div>

//       <div className='tables-wrapper'>
//         <h2>Compliance Markets</h2>
//         <CarbonTable data={complianceData} />

//         <h2>Voluntary Markets</h2>
//         <CarbonTable data={voluntaryData} />
//       </div>
//     </>
//   );
// };

// export default Home;

// import React, { useEffect, useState } from 'react';
// import './Home.css';
// import CarbonTable from '../../components/CarbonTable';
// import axios from 'axios';

// const Home = () => {
//   const [carbonData, setCarbonData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchCarbonPrices = async () => {
//       try {
//         const res = await axios.get('http://localhost:3000/api/carbon-prices');
//         const { complianceMarkets, voluntaryMarkets } = res.data;

//         const combined = [
//           ...complianceMarkets.map((item) => ({ ...item, category: 'Compliance' })),
//           ...voluntaryMarkets.map((item) => ({ ...item, category: 'Voluntary' })),
//         ];

//         setCarbonData(combined);
//       } catch (error) {
//         console.error('Error fetching carbon prices:', error);
//       }
//     };

//     fetchCarbonPrices();
//   }, []);

//   const filteredData = carbonData.filter((item) =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="home">
//       <div className="hero">
//         <h1>Live Carbon Prices</h1>
//         <form onSubmit={(e) => e.preventDefault()}>
//           <input
//             type="text"
//             placeholder="Search"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button type="submit">Search</button>
//         </form>
//       </div>

//       <CarbonTable data={filteredData} />
//     </div>
//   );
// };

// export default Home;



import React, { useEffect, useState } from 'react';
import './Home.css';
import CarbonTable from '../../components/CarbonTable';
import axios from 'axios';

const Home = () => {
  const [carbonData, setCarbonData] = useState({
    compliance: [],
    voluntary: [],
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCarbonPrices = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/carbon-prices');
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
    <>
      <div className="home">
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
      </div>

      <CarbonTable data={carbonData} searchTerm={searchTerm} />
    </>
  );
};

export default Home;
