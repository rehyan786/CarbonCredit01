const mongoose = require('mongoose');

// Schema for individual market entry
const marketEntrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  lastPrice: {
    type: String,
    required: true,
    trim: true
  },
  change: {
    type: String,
    default: "-",
    trim: true
  },
  ytdChange: {
    type: String,
    default: "-",
    trim: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Main schema for carbon markets data
const carbonMarketSchema = new mongoose.Schema({
  complianceMarkets: [marketEntrySchema],
  voluntaryMarkets: [marketEntrySchema],
  fetchDate: {
    type: Date,
    default: Date.now
  }
});

// Create indexes for faster queries
carbonMarketSchema.index({ fetchDate: -1 });

const CarbonMarket = mongoose.model('CarbonMarket', carbonMarketSchema);

module.exports = CarbonMarket;
