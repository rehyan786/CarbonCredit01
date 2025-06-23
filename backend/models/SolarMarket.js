const mongoose = require('mongoose');

// Schema for individual market entry (history)
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

// Main schema for SolarMarket
const SolarMarketSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true,
        unique: true
    },
    utility: {
        type: String,
        default: null
    },
    residential: {
        type: String,
        default: null
    },
    commercial: {
        type: String,
        default: null
    },
    history: [marketEntrySchema], // Array of historical market entries
    fetchDate: {
        type: Date,
        default: Date.now
    }
});

// Optional: index for fetchDate if you need to query by it
SolarMarketSchema.index({ fetchDate: -1 });

module.exports = mongoose.model('SolarMarket', SolarMarketSchema);