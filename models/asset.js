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
    currentPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    oldPrice: {
        type: Number,
        required: true,
        default: 0,
    }, 
    totalValue: Number,
    priceChange: {
        type: Number,
        default: 0,
      }
})

assetSchema.pre('save', function (next) {
    if (!this.isNew && this.isModified('currentPrice')) {
      this.oldPrice = this.get('currentPrice', null, { getters: false });
    }
    next();
  });
  


module.exports = mongoose.model('Asset', assetSchema)