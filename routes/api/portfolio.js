const express = require('express');
const router = express.Router();
const Portfolio = require('../../models/portfolio'); 
const User = require('../../models/user');
const Asset = require('../../models/asset'); 
const axios = require('axios');

const fetchHistoricalData = async (symbol, interval, outputsize='compact') => {
    const params = {
        function: 'TIME_SERIES_INTRADAY',
        symbol,
        interval,
        outputsize,
        apikey: process.env.REACT_APP_API_KEY,
    };

    try {
        const response = await axios.get('https://www.alphavantage.co/query', {params});
        return response.data;
    } catch (err) {
        console.error('Failed to fetch histrical data from API ', err);
        throw err
    }
};

router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        const portfolio = await Portfolio.findById(user.portfolio).populate('assets');
    
        if (!portfolio) {
          return res.status(404).json({ message: "Portfolio not found" });
        }
    
        res.json(portfolio)
      } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"})
      }
});


router.post('/:userId/asset', async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log(`Received User ID: ${userId}`);

        // Find the user first
        const user = await User.findById(userId);
        console.log("Found user:", user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User's portfolio ID:", user.portfolio);

        // Find the portfolio for the user using user's portfolio ID
        const portfolio = await Portfolio.findById(user.portfolio);
        console.log("Found portfolio:", portfolio);

        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }

        const newAssetData = req.body;
        console.log('New asset data:', newAssetData);

        // Create new asset
        const newAsset = new Asset(newAssetData);
        await newAsset.save();

        // Add asset to portfolio and save
        portfolio.assets.push(newAsset);

        // Calculate the value of the new asset and add it to the total value of the portfolio
        const data = await fetchHistoricalData(newAsset.ticker, '60min');
        console.log("Data fetched: ", data)
        if(data && data['Time Series (60min)']) {
            // Parse the data based on the structure of AlphaVantage's API response
        const lastUpdateTime = Object.keys(data['Time Series (60min)'])[0];  // Get the last update time
        const lastClosePrice = data['Time Series (60min)'][lastUpdateTime]['4. close'];  // Get the last close price
        const assetValue = lastClosePrice * newAsset.units;
        portfolio.TotalValue = (portfolio.TotalValue || 0) + assetValue;
     

        await portfolio.save();
    }
        // Send response
        res.json(portfolio);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});


module.exports = router