import React, { useEffect, useState } from "react";
import axios from "axios";
import LineGraph from "../../Visuals/LineGraph";
import PieChart from "../../Visuals/PieChart";
import { fetchHistoricalData } from "../../utilities/historicalData-api";

export default function Dashboard({user}) {
  const [portfolio, setPortfolio] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [sectorAllocations, setSectorAllocations] = useState(null)

  useEffect(() => {
    const userId = user._id;

    axios
      .get(`/api/portfolio/${userId}`)
      .then((res) => {
        // check if res.data exists and it contains the assets property
        if (res.data && res.data.assets) {
          setPortfolio(res.data);
      
          const sectorAllocation = res.data.assets.reduce((acc, asset) => {
            const sector = asset.sector;
            acc[sector] = (acc[sector] || 0) + 1; // add one for each asset in a sector
            return acc;
          }, {});
          setSectorAllocations(sectorAllocation);
      
          fetchAndCalculateAssetValues(res.data.assets)
          .then(assetValues => {
            const historicalData = Object.values(assetValues);
            setHistoricalData(historicalData);
          })
          .catch(err => console.error('Error fetching historical data: ', err));
        } else {
          console.error(`Invalid data received from /api/portfolio/${userId}`);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      })

        // // Fetch historical data for each asset:
        // return Promise.all(
        //   res.data.assets.map(asset =>
        //     axios.get(`/api/historical-data/${asset._id}`)
        //     )
        //   );
      // })
      // .then((responses) => {
      //   // Map over the array of axios responses to get the actual data
      //   const historicalData = responses.map(response => response.data);
      //   setHistoricalData(historicalData)
      // })
      // .catch((error) => {
      //   console.error("Error fetching data: ", error);
      // })
  }, []);

  const fetchAndCalculateAssetValues = async (assets) => {
    const assetValues = {};
  
    for (const asset of assets) {
      const data = await fetchHistoricalData(asset.ticker, '60min');
      console.log(data);
      
      if (data) {
        const timeSeries = data['Time Series (60min)'];
        
        if (!timeSeries) {
          throw new Error('No time series data available');
        }
  
        // Get the latest timestamp (sort in reverse chronological order)
        const timestamps = Object.keys(timeSeries).sort((a, b) => new Date(b) - new Date(a));
        const latestTimestamp = timestamps[0];
  
        // Extract the closing price
        const closePrice = parseFloat(timeSeries[latestTimestamp]['4. close']);
  
        // Calculate the value of each asset
        const assetValue = closePrice * asset.units;
  
        // Store the calculated value for each asset
        assetValues[asset.ticker] = {
          datetime: latestTimestamp,
          value: assetValue
        };
      }
    }
  
    return assetValues;
  }
  


  // If portfolio data is still loading, display this loading message
  if (!portfolio) {
    return <p>Grabbing your portfolio now...</p>
  }

  console.log(portfolio)
  return (
    <>
    <h1>Dashboard</h1>
    <PieChart data={sectorAllocations} />
    <LineGraph data={historicalData} />
    <h2>{user.name}'s Portfolio</h2>
    <h1>{portfolio.TotalValue}</h1>
    {portfolio.assets.map(asset => (
      <div key={asset._id}>
      <h3>{asset.ticker}</h3>
      <p>Units: {asset.units}</p>
      <p>Sector: {asset.sector}</p>
      </div>
    ))}
    </>
  )
}