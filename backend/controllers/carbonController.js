const fetch = require('node-fetch');
const CarbonMarket = require('../models/CarbonMarket');

/**
 * Fetch carbon credit prices from external API
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getCarbonPrices = async (req, res) => {
  try {
    // Check if we have recent data in the database (within the last hour)
    const recentData = await CarbonMarket.findOne({
      fetchDate: { $gte: new Date(Date.now() - 60 * 60 * 1000) }
    }).sort({ fetchDate: -1 });

    // If we have recent data, return it instead of fetching
    if (recentData && !req.query.forceRefresh) {
      return res.json({
        complianceMarkets: recentData.complianceMarkets,
        voluntaryMarkets: recentData.voluntaryMarkets,
        fetchDate: recentData.fetchDate,
        source: 'database'
      });
    }

    // If no recent data or force refresh, fetch from API
    const response = await fetch("https://carboncredits.com/wp-content/themes/fetchcarbonprices.php", {
      headers: {
        "accept": "*/*",
        "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
        "dnt": "1",
        "priority": "u=1, i",
        "referer": "https://carboncredits.com/carbon-prices-today/",
        "sec-ch-ua": "\"Google Chrome\";v=\"137\", \"Chromium\";v=\"137\", \"Not/A)Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();
    
    // Process the CSV-like data into a structured JSON object
    const processedData = processData(data);
    
    // Save the data to the database
    const carbonMarket = new CarbonMarket(processedData);
    await carbonMarket.save();
    
    // Add source and return the data
    processedData.source = 'api';
    processedData.fetchDate = new Date();
    
    res.json(processedData);
  } catch (error) {
    console.error('Error fetching carbon prices:', error);
    res.status(500).json({ error: 'Failed to fetch carbon prices' });
  }
};

/**
 * Process the CSV-like data into a structured JSON format
 * @param {String} data - Raw data from the API
 * @returns {Object} Structured data object
 */
const processData = (data) => {
  const lines = data.trim().split('\n');
  const result = {
    complianceMarkets: [],
    voluntaryMarkets: []
  };
  
  let currentSection = 'complianceMarkets';
  
  // Skip the header line
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check if we're moving to voluntary markets section
    if (line.startsWith('"Voluntary Markets"')) {
      currentSection = 'voluntaryMarkets';
      continue;
    }
    
    // Skip empty lines
    if (!line) continue;
    
    // Parse the line, removing quotes and splitting by commas
    const parts = line.split('","').map(part => 
      part.replace(/^"|"$/g, '').trim()
    );
    
    if (parts.length >= 4) {
      const market = {
        name: parts[0],
        lastPrice: parts[1],
        change: parts[2],
        ytdChange: parts[3]
      };
      
      result[currentSection].push(market);
    }
  }
  
  return result;
};

/**
 * Add new carbon market data manually
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const addCarbonMarketData = async (req, res) => {
  try {
    const { complianceMarkets, voluntaryMarkets } = req.body;
    
    // Create new carbon market entry
    const carbonMarket = new CarbonMarket({
      complianceMarkets,
      voluntaryMarkets,
      fetchDate: new Date()
    });
    
    // Save to database
    await carbonMarket.save();
    
    res.status(201).json({
      message: 'Carbon market data added successfully',
      data: carbonMarket
    });
  } catch (error) {
    console.error('Error adding carbon market data:', error);
    res.status(500).json({ error: 'Failed to add carbon market data' });
  }
};

/**
 * Get historical carbon market data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getHistoricalData = async (req, res) => {
  try {
    const { startDate, endDate, limit = 10 } = req.query;
    
    // Build query object
    const query = {};
    
    if (startDate || endDate) {
      query.fetchDate = {};
      if (startDate) query.fetchDate.$gte = new Date(startDate);
      if (endDate) query.fetchDate.$lte = new Date(endDate);
    }
    
    // Execute query
    const data = await CarbonMarket.find(query)
      .sort({ fetchDate: -1 })
      .limit(parseInt(limit))
      .exec();
      
    res.json(data);
  } catch (error) {
    console.error('Error fetching historical carbon data:', error);
    res.status(500).json({ error: 'Failed to fetch historical carbon data' });
  }
};

module.exports = {
  getCarbonPrices,
  addCarbonMarketData,
  getHistoricalData
};
