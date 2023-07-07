const mongoose = require('mongoose');
const Portfolio = require('../models/portfolio');

const Schema = mongoose.Schema;

const assetSchema = new Schema({
    ticker: {
        type: String,
        required: true
    },
    units: {
        type: Number,
        required: true
    },
    sector: {
        type: String,
        enum: ['Energy', 'Materials', 'Industrials', 'Utilities', 'Healthcare', 'Financials', 'Consumer Discretionary', 'Consumer Staples', 'Information Technology', 'Communication Services', 'Real Estate'],
        required : true 
    },
    currentPrice: Number, 
    totalValue: Number,
})


module.exports = mongoose.model('Asset', assetSchema)