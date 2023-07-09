const mongoose = require('mongoose');
const User = require('../models/user');
const Asset = require('../models/asset');

const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
    user: {type: Schema.Types.ObjectId,
    ref: 'User'},
    assets: [{type: Schema.Types.ObjectId, 
    ref: 'Asset'}],
    TotalValue: Number
})


module.exports = mongoose.model('Portfolio', portfolioSchema)