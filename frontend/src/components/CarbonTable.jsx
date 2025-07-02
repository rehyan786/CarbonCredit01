
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
          <td colSpan="4">{title}</td>
        </tr>
        {list.map((item, index) => (
          <tr key={`${title}-${index}`}>
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
    <div>
    <div className="carbon-table-container">
      <table className="carbon-table">
        <thead>
          <tr>
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
    {/* 2nd page */}
   <div className="carbon-info-grid">
          <div className="info-block">
            <h2>Carbon Tax</h2>
            <p className='abcd'>
             A carbon tax is a government-imposed fee on the burning of fossil fuels such as coal, oil, and gas. The goal is to put a price on greenhouse gas emissions, encouraging businesses and individuals to reduce their carbon footprint and invest in cleaner energy alternatives. For example, a tax of $50 per metric ton of CO₂ means a company must pay $50 for every ton it releases.
            </p>
            <p><strong>Carbon Tax is the most widely adopted pricing program</strong> in smaller economies or as complimentary policies.</p>
          </div>

          <div className="info-block">
            <h2>Carbon ETS</h2>
            <p className='abcd'>
             An ETS is a market-based approach that sets a cap on total emissions and allows companies to buy or sell carbon allowances (often called carbon credits). One credit typically permits the emission of one metric ton of CO₂ or CO₂-equivalent gases. ETS programs are central to national and regional climate strategies.
            </p>
            <p><strong>Carbon ETS covers more total emissions globally than any other pricing system.</strong>The EU ETS, China ETS, California system, and South Korea K-ETS alone cover billions of tons of CO₂, including major power and industrial sectors.</p>
          </div>

          <div className="info-block">
            <h2>Other / Hybrid</h2>
            <ul>
              <li><strong>OBPS – Output-Based Pricing System:</strong> Canada’s OBPS is a hybrid model used in provinces without their own compliant carbon pricing programs. Large industrial emitters are taxed only on emissions that exceed a performance benchmark (based on output efficiency).</li>
              <li><strong>EPS – Emissions Performance Standard:</strong>EPS is used in the UK and in some U.S. states. The program sets allowable emissions rate and overperformers may trade credits or pay penalties.</li>
              <li><strong>RGGI – Regional Greenhouse Gas Initiative:</strong> RGGI is a multistate cap-and-trade program covering the electricity generator sector across 11 U.S. states. States auction carbon allowances to power plants; revenue is reinvested into energy efficiency and renewables.</li>
            </ul>
          </div>

          <div className="info-block">
            <h2>European Carbon Credit Market</h2>
            <p className='abcd'>
              EU ETS is the European carbon credit contract which is exchange traded. It is a Futures contract for the purposes of trading and delivering EUAs (European Union Allowance – the official name for the region’s emission allowances). One EUA allows the holder to emit one ton of CO2 or C02 equivalent greenhouse gas. 
            </p>
            <p>It is the world’s first and largest compliance carbon market, and considered the template for other ETS systems worldwide.</p>
          </div>

          <div className="info-block">
            <h2>Nature Based Carbon Offset</h2>
            <p className='abcd'> 
              N-GEO futures contracts are comprised of Nature-Based offsets projects from the Verra registry – projects that fall under the Agriculture, Forestry, or Other Land Use (AFOLU) categories. Nature-based solutions can provide valuable contributions to biodiversity, but it’s also often considered more difficult to accurately verify the amount of carbon actually offset in nature-based projects.
            </p>
          </div>
          <div className="info-block">
            <h2>Aviation Industry Carbon Offset</h2>
            <p className='abcd'> 
             GEO’s futures contracts follow the International Civil Aviation Organization’s CORSIA standard.  These carbon offsets from three major registries – Verra, the American Carbon Registry, and the Climate Action Reserve. Because it is based on high-quality carbon credits that adhere to the international aviation industry standard for emissions offsetting. They are sometimes referred to as “Aviation Industry Carbon Offsets”.
            </p>
          </div>
          <div className="info-block">
            <h2>Tech Industry Carbon Offset</h2>
            <p className='abcd'> 
              C-GEO futures contracts are comprised of tech-based, non-AFOLU offset projects from the Verra registry that align with the CCPs. The C stands for “Core” or the Taskforce on Scaling Voluntary Carbon Markets’ Core Carbon Principles (CCPs). The CCP is an emerging set of transparent and consistent standards around the supply of carbon credits overseen by the Integrity Council for the Voluntary Carbon Markets. This is a tech based carbon futures contract.
            </p>
          </div>
          <div className="info-block">
            <h2>China Price</h2>
            <p className='abcd'> 
              China launched its own domestic ETS in 2021, though carbon credits had already traded been extensively at the provincial and municipal levels for years beforehand. The world’s largest in terms of emissions covered, China’s ETS is estimated to account for over 40% of the country’s carbon emissions (roughly 4 billion tCO2), largely from its power sector. The ETS is expected to expand to cover other sectors in the years to come, and should serve as an important tool in the Chinese government’s climate change mitigation plans
            </p>
          </div>
          <div className="info-block">
            <h2>South Korea Price</h2>
            <p className='abcd'> 
              One of the first mandatory country-level Emissions Trading Schemes as well as the third largest in the world, South Korea’s K-ETS was launched in 2015 and covers nearly three-quarters of the entire country’s S1+S2 emissions. As one of the first movers in the compliance markets the K-ETS is already in its third phase of implementation, with futures trading expected later in 2023 and individual/international participation in 2024. South Korea has set a national target of net zero by 2050, and the K-ETS will serve as a cornerstone to achieve that.
            </p>
          </div>
          <div className="info-block">
            <h2>New Zealand Spot Price</h2>
            <p className='abcd'> 
              Established in 2008, New Zealand’s NZ ETS is key to the government’s climate change targets, as evidenced by the fact that it’s been reviewed three times and amended seven times in the years since, with its fourth review currently under way in 2023. With all major sectors of New Zealand’s economy covered under the NZ ETS, it accounts for just over half of all of the island nation’s GHG emissions. One particular challenge for the New Zealand government is the fact that roughly half of the country’s emissions comes from agriculture – the country is still currently in the process of finalizing its accounting, reporting and pricing mechanisms for its farmers and growers.
            </p>
          </div>
          <div className="info-block">
            <h2>Australia Spot Price</h2>
            <p className='abcd'> 
              Initially, the Australian government introduced a carbon pricing scheme in 2011 but it was fairly quickly repealed in 2014. It would take until 2023 for Australia to take another crack at launching an ETS, featuring domestic offset-like products named Australian Carbon Credit Units, or ACCUs. While the Australian ETS is still in its nascent early stages, investors and speculators have already piled into ACCUs, even though the actual drafting of relevant legislation isn’t expected to begin until late 2023. Still, with ACCU prices capped at $75/tonne rising by CPI plus 2 percent a year, those loading up are expecting a supply/demand imbalance to drive prices towards the cap.
            </p>
          </div>
          <div className='info-block'>
            <h2>UK ETS Price</h2>
            <p>The UK ETS was launched in 2021 after Brexit, which replaced the UK’s participation in the EU ETS. Prices broadly align with the EU ETS but operates independently. It is a key policy tool to reach the UK’s legally binding net-zero target by 2050.</p>
          </div>
      </div>


    </div>
         
      
  );
};

export default CarbonTable;
