const mongoose = require('mongoose');
const User = require('../models/user');
const Asset = require('../models/asset');

const Schema = mongoose.Schema;

const historicalDataSchema = new Schema({
    asset: {type: Schema.Types.ObjectId,
        ref: 'Asset'},
    date: Date,
    price: Number,
})


module.exports = mongoose.model('HistoricalData', historicalDataSchema)