const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

const SolarMarket = require('../models/SolarMarket');

/**
 * Fetches solar price data from carboncredits.com
 * @returns {Promise<Array>} Array of solar price data objects
 */
exports.getSolarPrices = async (req, res) => {
  try {
    // Check if we have recent data in the database (within the last hour)
    const recentData = await SolarMarket.find({
      fetchDate: { $gte: new Date(Date.now() - 60 * 60 * 1000) }
    }).sort({ fetchDate: -1 });

    // If we have recent data, return it instead of fetching
    if (recentData.length > 0 && !req.query.forceRefresh) {
      return res.status(200).json({
        data: recentData,
        fetchDate: recentData[0].fetchDate,
        source: 'database'
      });
    }

    // If no recent data or force refresh, scrape from website
    // const browser = await puppeteer.launch({
    //   headless: 'new',
    //   args: ['--no-sandbox', '--disable-setuid-sandbox']
    // });
//     const browser = await puppeteer.launch({
//   headless: true,
//   args: ['--no-sandbox', '--disable-setuid-sandbox']
// });

      //  const browser = await puppeteer.launch({
      //     headless: true,
      //     executablePath: puppeteer.executablePath(), // ✅ use downloaded Chrome
      //     args: ['--no-sandbox', '--disable-setuid-sandbox']
      //   });
 

        const browser = await puppeteer.launch({
            args: chromium.args,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
            //ignoreHTTPSErrors: true
          });



    const page = await browser.newPage();
    
    await page.goto('https://carboncredits.com/latest-solar-prices/', {
      waitUntil: 'networkidle2'
    });
    
    // Extract data from the table
    const solarData = await page.evaluate(() => {
      const table = document.getElementById('solarTable');
      if (!table) return null;
      
      const rows = Array.from(table.querySelectorAll('tbody tr'));
      
      return rows.map(row => {
        const cells = Array.from(row.querySelectorAll('td'));
        return {
          country: cells[0].textContent.trim(),
          utility: cells[1].textContent.trim() !== '-' ? cells[1].textContent.trim() : null,
          residential: cells[2].textContent.trim() !== '-' ? cells[2].textContent.trim() : null,
          commercial: cells[3].textContent.trim() !== '-' ? cells[3].textContent.trim() : null
        };
      });
    });
    
    await browser.close();
    
    if (!solarData) {
      return res.status(404).json({ message: 'Solar price table not found' });
    }
    
    // Save each country's data to the database
    const savedData = [];
    
    for (const item of solarData) {
      // Check if this country already exists in our database
      let existingEntry = await SolarMarket.findOne({ country: item.country });
      
      if (existingEntry) {
        // Create a history entry from the existing data before updating
        const historyEntry = {
          name: existingEntry.country,
          lastPrice: existingEntry.utility || existingEntry.residential || existingEntry.commercial,
          updatedAt: existingEntry.fetchDate
        };
        
        // Update the existing entry
        existingEntry.utility = item.utility;
        existingEntry.residential = item.residential;
        existingEntry.commercial = item.commercial;
        existingEntry.fetchDate = new Date();
        existingEntry.history.push(historyEntry);
        
        await existingEntry.save();
        savedData.push(existingEntry);
      } else {
        // Create a new entry
        const newEntry = new SolarMarket({
          country: item.country,
          utility: item.utility,
          residential: item.residential,
          commercial: item.commercial,
          fetchDate: new Date(),
          history: [{
            name: item.country,
            lastPrice: item.utility || item.residential || item.commercial,
            updatedAt: new Date()
          }]
        });
        
        await newEntry.save();
        savedData.push(newEntry);
      }
    }
    
    return res.status(200).json({
      data: savedData,
      fetchDate: new Date(),
      source: 'web'
    });
  } catch (error) {
    console.error('Error fetching solar prices:', error);
    return res.status(500).json({ message: 'Error fetching solar prices', error: error.message });
  }
};

/**
 * Add new solar market data manually
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.addSolarMarketData = async (req, res) => {
  try {
    const { country, utility, residential, commercial } = req.body;
    
    if (!country) {
      return res.status(400).json({ message: 'Country name is required' });
    }
    
    // Check if this country already exists
    let existingEntry = await SolarMarket.findOne({ country });
    
    if (existingEntry) {
      // Create a history entry from the existing data before updating
      const historyEntry = {
        name: existingEntry.country,
        lastPrice: existingEntry.utility || existingEntry.residential || existingEntry.commercial,
        updatedAt: existingEntry.fetchDate
      };
      
      // Update the existing entry
      existingEntry.utility = utility || existingEntry.utility;
      existingEntry.residential = residential || existingEntry.residential;
      existingEntry.commercial = commercial || existingEntry.commercial;
      existingEntry.fetchDate = new Date();
      existingEntry.history.push(historyEntry);
      
      await existingEntry.save();
      
      return res.status(200).json({
        message: 'Solar market data updated successfully',
        data: existingEntry
      });
    } else {
      // Create a new entry
      const newEntry = new SolarMarket({
        country,
        utility,
        residential,
        commercial,
        fetchDate: new Date(),
        history: [{
          name: country,
          lastPrice: utility || residential || commercial,
          updatedAt: new Date()
        }]
      });
      
      await newEntry.save();
      
      return res.status(201).json({
        message: 'Solar market data added successfully',
        data: newEntry
      });
    }
  } catch (error) {
    console.error('Error adding solar market data:', error);
    return res.status(500).json({ error: 'Failed to add solar market data' });
  }
};

/**
 * Get historical solar market data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getHistoricalData = async (req, res) => {
  try {
    const { country, startDate, endDate, limit = 10 } = req.query;
    
    // Build query object
    const query = {};
    
    if (country) {
      query.country = country;
    }
    
    if (startDate || endDate) {
      query.fetchDate = {};
      if (startDate) query.fetchDate.$gte = new Date(startDate);
      if (endDate) query.fetchDate.$lte = new Date(endDate);
    }
    
    // Execute query
    const data = await SolarMarket.find(query)
      .sort({ fetchDate: -1 })
      .limit(parseInt(limit))
      .exec();
      
    res.json(data);
  } catch (error) {
    console.error('Error fetching historical solar data:', error);
    res.status(500).json({ error: 'Failed to fetch historical solar data' });
  }
};

/**
 * Mock function to return hardcoded solar price data when web scraping is not possible
 * This can be used for testing or as a fallback
 */
exports.getMockSolarPrices = (req, res) => {
  const solarData = [
    { country: "Australia", utility: "$38.65", residential: null, commercial: null },
    { country: "Austria", utility: null, residential: "$108.18", commercial: null },
    { country: "Belgium", utility: "$90.22", residential: "$129.17", commercial: null },
    { country: "Brazil", utility: "$46.02", residential: null, commercial: null },
    { country: "Canada", utility: "$75.20", residential: null, commercial: null },
    { country: "China", utility: "$50.78", residential: null, commercial: null },
    { country: "Denmark", utility: "$42.33", residential: "$114.32", commercial: "$77.76" },
    { country: "France", utility: "$33.94", residential: "$123.65", commercial: "$73.98" },
    { country: "Hungary", utility: "$86.05", residential: "$141.69", commercial: "$104.93" },
    { country: "India", utility: "$35.60", residential: null, commercial: null },
    { country: "Italy", utility: "$60.52", residential: "$207.15", commercial: "$88.77" },
    { country: "Japan", utility: "$172.05", residential: "$223.30", commercial: null },
    { country: "South Korea", utility: "$96.57", residential: null, commercial: "$98.13" },
    { country: "Netherlands", utility: "$79.97", residential: null, commercial: "$89.50" },
    { country: "Norway", utility: null, residential: null, commercial: "$140.45" },
    { country: "United States", utility: "$44.25", residential: "$126.54", commercial: "$94.18" }
  ];
  
  return res.status(200).json(solarData);
};