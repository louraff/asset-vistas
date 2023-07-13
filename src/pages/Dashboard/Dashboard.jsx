import React, { useEffect, useState } from "react";
import axios from "axios";
// import LineGraph from "../../Visuals/LineGraph";
import PieChart from "../../Visuals/PieChart";
import LineGraph from "../../Visuals/LineGraph";
import Card from "../../components/Card/Card";
import { fetchHistoricalData } from "../../utilities/historicalData-api";

export default function Dashboard({user}) {
  const [portfolio, setPortfolio] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [sectorAllocations, setSectorAllocations] = useState(null)

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
        // console.log('Data for', asset.ticker, ':', data);
      
        if (data) {
          // Check if data.values is an array. If it's not, convert it to an array.
          const timeSeries = Array.isArray(data) ? data : [data];
          // console.log('Time series data for asset', asset.ticker, ':', timeSeries);
  
          if (!timeSeries) {
            throw new Error('No time series data available');
          }
      
          for (const pointData of timeSeries) {
            const closePrice = parseFloat(pointData.close);
            const datetime = new Date(pointData.date).getTime(); // Convert the date to a UNIX timestamp
            const assetValue = closePrice * asset.units;
            // console.log(`For asset ${asset.ticker} at time ${datetime}: closePrice is ${closePrice}, assetValue is ${assetValue}`);
            assetData.get(asset.ticker).push({ datetime: datetime, value: assetValue });
          }
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
  
  useEffect(() => {
    console.log("Sector Allocations:", sectorAllocations);
  }, [sectorAllocations]);

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
            acc[sector] = (acc[sector] || 0) + asset.units; // add one for each asset in a sector
            return acc;
          }, {});
        console.log("Calculated Sector Allocations:", sectorAllocation); // Logging the calculated value

          setSectorAllocations(sectorAllocation);

          fetchAndCalculateAssetValues(res.data.assets)
            .then(assetValues => {
              if(assetValues.length > 0) {
              const sortedData = assetValues.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
              setHistoricalData(sortedData);
              // console.log('Sorted historical data:', sortedData);
            } else {
              // console.error('No asset values to sort.');
            }})
            .catch(err => {
              console.error('Error fetching historical data: ', err);
              throw err; // rethrow the error
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);


  async function highestValue() {
    const assets = portfolio.assets;
    let highestValuedAsset;
    let highestValue = 0;

    for (const asset of assets) {
        try {
            const data = await fetchHistoricalData(asset.ticker);
            if (data && data.length > 0) {
                const latestData = data[data.length -1];
                const closePrice = parseFloat(latestData.close);
                const assetValue = asset.units * closePrice;

                if (assetValue > highestValue) {
                    highestValue = assetValue;
                    highestValuedAsset = asset;
                }
            }
        } catch (error) {
                console.error('Error calculating highest valued asset:', asset.ticker, error);
            }
        }
    return Promise.resolve(highestValuedAsset);
}

async function highestGrowth() {
    const assets = portfolio.assets;
    let highestGrowth = 0;
    let highestGrowthAsset = null;

    for (const asset of assets) {
        try {
            const data = await fetchHistoricalData(asset.ticker);
            if (data && data.length > 1) {
                const initialData = data[0];
                const latestData = data[data.length - 1];
                const initialClosePrice = parseFloat(initialData.close);
                const latestClosePrice = parseFloat(latestData.close);
                const growth = ((latestClosePrice - initialClosePrice) / initialClosePrice) * 100;

                if (growth > highestGrowth) {
                    highestGrowth = growth;
                    highestGrowthAsset = asset;
                }
            }
        } catch (error) {
            console.error('Error calculating highest growth asset:', asset.ticker, error);
        }
    }

    return Promise.resolve(highestGrowthAsset);
}


async function highestLoss() {
    const assets = portfolio.assets;
    let highestLoss = 0;
    let highestLossAsset = null;

    for (const asset of assets) {
        try {
            const data = await fetchHistoricalData(asset.ticker);
            if (data && data.length > 1) {
                const initialData = data[0];
                const latestData = data[data.length - 1];
                const initialClosePrice = parseFloat(initialData.close);
                const latestClosePrice = parseFloat(latestData.close);
                const loss = ((initialClosePrice - latestClosePrice) / initialClosePrice) * 100;

                if (loss > highestLoss) {
                    highestLoss = loss;
                    highestLossAsset = asset;
                }
            }
        } catch (error) {
            console.error('Error calculating highest loss asset:', asset.ticker, error);
        }
    }

    return Promise.resolve(highestLossAsset);
}



function assetCount() {
    return portfolio.assets.length;
}


  // If portfolio data is still loading, display this loading message
  if (!portfolio) {
    return <p>Grabbing your portfolio now...</p>
  }

  console.log(portfolio)
  // console.log("Historical data:", historicalData);
  return (
    <>
    <h1>Dashboard</h1>
    <PieChart data={sectorAllocations} />
    <h2>{user.name}'s Portfolio</h2>
    <LineGraph data={historicalData} />
    <div className="card-container">
      <Card header="Highest Value Asset" calculate={highestValue} portfolio={portfolio} />
      <Card header="Asset with Highest Growth" calculate={highestGrowth} portfolio={portfolio} />
      <Card header="Asset with Highest Loss" calculate={highestLoss} portfolio={portfolio} />
      <Card header="Total Number of Assets" calculate={assetCount} portfolio={portfolio} />
    </div>
    <h1>{portfolio.TotalValue}</h1>
    {/* <LineChart data={historicalData.map(point => point.value)} labels={historicalData.map(point => new Date(point.datetime))} /> */}
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