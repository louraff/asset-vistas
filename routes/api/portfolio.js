const express = require('express');
const router = express.Router();
const Portfolio = require('../../models/portfolio'); 
const User = require('../../models/user');
const Asset = require('../../models/asset'); 

router.get('/:userId', async (req, res) => {
    try {
        // Look up a portfolio that has the user ID equal to the one in the request parameters.
        // Use the populate method to replace the IDs in the assets field with the actual asset documents.
        console.log(Portfolio);

        const portfolio = await Portfolio.findOne({user: req.params.userId }).populate('assets');
        // Return the portfolio as JSON.
        res.json(portfolio)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"})
    }
})

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

        // Create new asset
        const newAsset = new Asset(newAssetData);
        await newAsset.save();

        // Add asset to portfolio and save
        portfolio.assets.push(newAsset);
        await portfolio.save();

        // Send response
        res.json(portfolio);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});


// router.post('/:userId/asset', async (req, res) => {
//     try {

//         const portfolioId = req.params.userId;  
//         console.log("Received portfolio ID:", portfolioId);

//         const user = await User.findById(portfolioId);
//         console.log("Found user:", user);

//         const por = await Portfolio.findOne({user: portfolioId}); 
//         console.log("Found portfolio:", por);

//         const newAssetData = req.body;
//         const userId = req.params.userId;

//         console.log(`User ID: ${userId}`);

//         // Find the portfolio for the user
//         const portfolio = await Portfolio.findOne({user: userId});

//         if (!portfolio) {
//             return res.status(404).json({ message: "Portfolio not found" });
//         }

//         // Create new asset
//         const newAsset = new Asset(newAssetData);
//         await newAsset.save();

//         // Add asset to portfolio and save
//         portfolio.assets.push(newAsset);
//         await portfolio.save();

//         // Send response
//         res.json(portfolio);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({message: "Server Error"});
//     }
// });

module.exports = router