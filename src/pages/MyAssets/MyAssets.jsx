import React, { useEffect, useState } from 'react';
import AssetTable from '../../components/AssetTable/AssetTable';
import axios from 'axios';
import usePortfolio from '../../utilities/usePortfolio'; 
import '../../components/css/AssetTable.css'
import { fetchHistoricalData } from "../../utilities/historicalData-api";


export default function MyAssets({ user }) {
  const { portfolio, updateAsset, deleteAsset, setPortfolio } = usePortfolio(user);

  const fetchAndCalculateAssetValues = async (assets) => {
    const assetValues = [];
  
    // Prepare an empty Map for each asset's data
    const assetData = new Map(assets.map(asset => [asset.ticker, []]));
    if (!assets || assets.length === 0) {
      return assetValues;
    }
    
    for (const asset of assets) {
      try {
        const data = await fetchHistoricalData(asset.ticker, '1y');
    
        if (data) {
          const timeSeries = Array.isArray(data) ? data : [data];
          
          for (const pointData of timeSeries) {
            const closePrice = parseFloat(pointData.close);
            const datetime = new Date(pointData.date).getTime();
            // const assetValue = closePrice * asset.units; 
    
            const assetValue = closePrice * asset.units;
            assetData.get(asset.ticker).push({ datetime: datetime, value: assetValue });
          }
    
          // Attach the fetched data back to the asset
          asset.historicalData = assetData.get(asset.ticker);
        }
      } catch (error) {
        console.error('Error fetching and processing data for asset:', asset.ticker, error);
      }
    }
    
  
    let timestamps = [];
    // combine all timestamps into one array
    for (const asset of assets) {
      const assetTimes = assetData.get(asset.ticker).map(a => a.datetime);
      timestamps = [...new Set([...timestamps, ...assetTimes])]; // Set is used to eliminate duplicates
    }
  
    timestamps.sort((a, b) => new Date(a) - new Date(b)); // sort timestamps
  
    // now we can calculate the total value for each timestamp
    for (const timestamp of timestamps) {
      let totalValueAtTimestamp = 0;
  
      for (const asset of assets) {
        const assetValues = assetData.get(asset.ticker);
        const assetAtTime = assetValues.find(a => a.datetime === timestamp);
        // console.log('Asset at time for asset', asset.ticker, 'at timestamp', timestamp, ':', assetAtTime);
        
        totalValueAtTimestamp += assetAtTime ? assetAtTime.value : 0;
      }
  
      assetValues.push({ datetime: timestamp, value: totalValueAtTimestamp });
    }
    // console.log('Asset values:', assetValues);
    return assetValues;
  };


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
