const express = require('express');
const router = express.Router();
const HistoricalData = require('../../models/historicalData');

router.get('/:assetId', async (req, res) => {
  const { assetId } = req.params;

  try {
    const historicalData = await HistoricalData.find({ asset: assetId }).sort('date');
    
    if (!historicalData) {
      return res.status(404).json({ message: 'Historical data not found for the provided assetId' });
    }

    res.json(historicalData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
