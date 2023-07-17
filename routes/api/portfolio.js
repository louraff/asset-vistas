const express = require('express');
const router = express.Router();
const Portfolio = require('../../models/portfolio'); 
const User = require('../../models/user');
const Asset = require('../../models/asset'); 
const axios = require('axios');

 async function fetchHistoricalData(symbol, range='1y') {
    const url = `https://api.iex.cloud/v1/data/core/historical_prices/${symbol}?range=${range}&token=${process.env.REACT_APP_IEX_API_KEY}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        console.error('Failed to fetch historical data from API ', err);
        throw err;
    }
}


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
        console.log('New asset created:', newAsset);

        // Add asset to portfolio and save
        portfolio.assets.push(newAsset);

        // Calculate the value of the new asset and add it to the total value of the portfolio
        const data = await fetchHistoricalData(newAsset.ticker, '1y');
    console.log("Data fetched: ", data)
    
    if(data && data.length > 0) {
        const lastClosePrice = data[0].close;  // Get the last close price
        const assetValue = lastClosePrice * newAsset.units;
        newAsset.currentPrice = lastClosePrice; // Update the current price
        newAsset.totalValue = assetValue; // Update the total value
        await newAsset.save(); // Save the changes

        portfolio.TotalValue = (portfolio.TotalValue || 0) + assetValue;

        await portfolio.save();
    }
    else {
        console.error('No historical data available for ticker: ', newAsset.ticker);
    }

        // Send response
        res.json(portfolio);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});

router.put('/:userId/asset/:assetId', async (req, res) => {
    try {
        const { userId, assetId } = req.params;
        const updatedAssetData = req.body;

        // Find the asset directly and update it
        // const asset = await Asset.findByIdAndUpdate(assetId, updatedAssetData, { new: true });

        const asset = await Asset.findById(assetId);


        if (!asset) {
            return res.status(404).json({message: "Asset not found"});
        }
        // Update the fields on the asset
        if (updatedAssetData.currentPrice) {
            // Update oldPrice to the currentPrice before updating currentPrice
            asset.oldPrice = asset.currentPrice;
        }
        // Update the fields on the asset
        Object.assign(asset, updatedAssetData);

        await asset.save();

        res.json(asset);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});

router.delete('/:userId/asset/:assetId', async (req, res) => {
    console.log(`Received DELETE request for asset ${req.params.assetId} for user ${req.params.userId}`); 

    try {
        const { userId, assetId } = req.params;

        // Find the user first
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the portfolio for the user using user's portfolio ID
        const portfolio = await Portfolio.findById(user.portfolio).populate('assets');

        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }

        // Find the asset index in the portfolio
        const assetIndex = portfolio.assets.findIndex(asset => asset._id.toString() === assetId);

        if (assetIndex === -1) {
            return res.status(404).json({ message: "Asset not found" });
        }

        // Remove the asset from the portfolio and from the Asset collection
        const asset = portfolio.assets[assetIndex];
        portfolio.assets.splice(assetIndex, 1);
        await Asset.findByIdAndRemove(asset._id);

        await portfolio.save();

        res.json(portfolio);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});




module.exports = router