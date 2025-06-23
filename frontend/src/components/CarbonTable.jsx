
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
  );
};

export default CarbonTable;
