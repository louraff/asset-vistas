import React, { useEffect, useState } from 'react';
import AssetTable from '../../components/AssetTable/AssetTable';
import axios from 'axios';
import usePortfolio from '../../utilities/usePortfolio'; 
import '../../components/css/AssetTable.css'
import { fetchHistoricalData } from '../../utilities/historicalData-api';
import { v4 as uuidv4 } from 'uuid'; 


export default function MyAssets({ user, portfolio, setPortfolio }) {
  const { updateAsset, deleteAsset } = usePortfolio(user);
  const [latestPrices, setLatestPrices] = useState({});


  const calculateTotalValue = (asset) => {
    const latestPrice = latestPrices[asset.ticker]; // Get the latest price from the latestPrices object

    const totalValue = latestPrice ? latestPrice * asset.units : 0; // Calculate the total value based on the latest price
    return totalValue;
  };

  useEffect(() => {
    const fetchLatestPrices = async () => {
      const tickers = portfolio ? portfolio.assets.map(asset => asset.ticker) : [];
      const symbols = tickers.join(',');

      try {
        const response = await fetchHistoricalData(symbols, '1d'); // Fetch latest price data for the symbols
        const prices = response.reduce((acc, data) => {
          const { symbol, close } = data;
          acc[symbol] = close; // Store the latest price for each symbol in the object
          return acc;
        }, {});

        setLatestPrices(prices); // Update the latestPrices state with the fetched prices

        const updatedAssets = portfolio.assets.map(asset => {
          const totalValue = calculateTotalValue(asset);
          return {
            ...asset,
            totalValue
          };
        });
        setPortfolio({ ...portfolio, assets: updatedAssets });

      } catch (error) {
        console.error('Failed to fetch latest prices:', error);
      }
    };

    fetchLatestPrices();
  }, []);
  
  const rows = portfolio
    ? portfolio.assets.map(asset => ({
        id: asset._id || uuidv4(),
        totalValue: calculateTotalValue(asset), // calculate totalValue
        ...asset
      }))
    : [];

  return (
    <>
     
      {portfolio ? (
        <AssetTable
          portfolio={portfolio}
          updateAsset={updateAsset}
          deleteAsset={deleteAsset}
          user={user}
          setPortfolio={setPortfolio}
        />
        
      ) : (
        <p>Loading...</p>
      )}
     
    </>
  );
}
