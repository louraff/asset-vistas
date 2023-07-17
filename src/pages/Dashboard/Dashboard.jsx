import React, { useEffect, useState } from "react";
import HighestGrowthAssetCard from "../../components/Cards/HighestGrowthAssetCard";
import HighestLossAssetCard from "../../components/Cards/HighestLossAssetCard";
import HighestValueAssetCard from "../../components/Cards/HighestValueAssetCard";
import TotalAssetsCard from "../../components/Cards/TotalAssetsCard";
import axios from "axios";
import PieChart from "../../Visuals/PieChart";
import LineGraph from "../../Visuals/LineGraph";
import AssetTable from "../../components/AssetTable/AssetTable";
import { fetchHistoricalData } from "../../utilities/historicalData-api";
import usePortfolio from "../../utilities/usePortfolio";
import "../../components/css/Dashboard.css"
import "../App/App.css"


export default function Dashboard({user,
  portfolio,
  setPortfolio,
  historicalData,
  setHistoricalData,
  sectorAllocations,
  setSectorAllocations,
  highestValueAsset,
  setHighestValueAsset,
  highestGrowthAsset,
  setHighestGrowthAsset,
  highestLossAsset,
  setHighestLossAsset,
  numAssets,
  setNumAssets,}) {
  // const [portfolio, setPortfolio] = useState(null);
  // const [historicalData, setHistoricalData] = useState([]);
  // const [sectorAllocations, setSectorAllocations] = useState(null)
  // const [highestValueAsset, setHighestValueAsset] = useState({});
  // const [highestGrowthAsset, setHighestGrowthAsset] = useState({});
  // const [highestLossAsset, setHighestLossAsset] = useState({});
  // const [numAssets, setNumAssets] = useState(0);
  // const { updateAsset, deleteAsset} = usePortfolio(user);

  const { updateAsset, deleteAsset } = usePortfolio(user);

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
    
            const assetValue = closePrice * asset.units;
            assetData.get(asset.ticker).push({ datetime: datetime, value: assetValue });
          }
    
          // Attach the fetched data back to the asset
          asset.historicalData = assetData.get(asset.ticker);
          asset.currentPrice = parseFloat(timeSeries[timeSeries.length - 1].close); // set currentPrice
          asset.oldPrice = parseFloat(timeSeries[timeSeries.length - 2].close); // set oldPrice
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

// In the calculateHighestValueAsset function
const calculateHighestValueAsset = (assets) => {
  if (!assets || assets.length === 0) {
    return {};
  }

  let highestValueAsset = assets[0];

  highestValueAsset.totalValue = Array.isArray(highestValueAsset.historicalData)
    ? highestValueAsset.historicalData[highestValueAsset.historicalData.length - 1].value
    : 0;

  for (let i = 1; i < assets.length; i++) {
    let asset = assets[i];

    if (Array.isArray(asset.historicalData)) {
      asset.totalValue = asset.historicalData[asset.historicalData.length - 1].value;

      if (asset.totalValue > highestValueAsset.totalValue) {
        highestValueAsset = asset;
      }
    }
  }

  return highestValueAsset;
};

const calculateAssetChange = (asset) => {
  if (!asset.historicalData || asset.historicalData.length === 0) {
    return 0;
  }

  let firstValue = asset.historicalData[0].value;
  let lastValue = asset.historicalData[asset.historicalData.length - 1].value;

  let change = lastValue - firstValue;

  return change;
};

const calculateHighestGrowthAsset = (assets) => {
  if (!assets || assets.length === 0) {
    return {};
  }

  let highestGrowthAsset = assets[0];
  let highestGrowthValue = calculateAssetChange(highestGrowthAsset);

  for (let i = 1; i < assets.length; i++) {
    let assetGrowthValue = calculateAssetChange(assets[i]);
    if (assetGrowthValue > highestGrowthValue) {
      highestGrowthAsset = assets[i];
      highestGrowthValue = assetGrowthValue;
    }
  }

  return { asset: highestGrowthAsset, totalValue: highestGrowthValue };
};

const calculateHighestLossAsset = (assets) => {
  if (!assets || assets.length === 0) {
    return {};
  }

  let highestLossAsset = assets[0];
  let highestLossValue = calculateAssetChange(highestLossAsset);

  for (let i = 1; i < assets.length; i++) {
    let assetLossValue = calculateAssetChange(assets[i]);
    if (assetLossValue < highestLossValue) {
      highestLossAsset = assets[i];
      highestLossValue = assetLossValue;
    }
  }

  return { asset: highestLossAsset, totalValue: highestLossValue };
};



// Function to calculate the number of assets
const calculateNumberOfAssets = (assets) => {
  return assets ? assets.length : 0;
};

  useEffect(() => {
    console.log("Sector Allocations:", sectorAllocations);
  }, [sectorAllocations]);

  useEffect(() => {
    const userId = user._id;
  
    axios
      .get(`/api/portfolio/${userId}`)
      .then(async (res) => {
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
  
          await fetchAndCalculateAssetValues(res.data.assets)
            .then(assetValues => {
              if(assetValues.length > 0) {
                const sortedData = assetValues.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
                setHistoricalData(sortedData);
                // console.log('Sorted historical data:', sortedData);
                
                // Calculate highest value, growth and loss assets after historical data has been fetched and calculated.
                if (res.data.assets && res.data.assets.length > 0) {
                  setHighestValueAsset(calculateHighestValueAsset(res.data.assets));
                  setNumAssets(calculateNumberOfAssets(res.data.assets));
                  setHighestLossAsset(calculateHighestLossAsset(res.data.assets));
                  setHighestGrowthAsset(calculateHighestGrowthAsset(res.data.assets));
                }
              } else {
                // console.error('No asset values to sort.');
              }}).catch(err => {
                console.error('Error fetching historical data: ', err);
                throw err; // rethrow the error
              });
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);
  
  


  // If portfolio data is still loading, display this loading message
  if (!portfolio) {
    return <p>Grabbing your portfolio now...</p>
  }

  console.log(portfolio)
  // console.log("Historical data:", historicalData);
  return (
    <div className="main-content">
    
    <div className="row">
    <div className="col-12">
    <div className="card-chart cardd">
    <div className="card-header">
    <div className="rowy">
    <div className="text-left col-sm-6">   
    <h5 className="card-categoryy">Total Portfolio Value</h5>
    <h2 className="card-title-main">£ {portfolio.TotalValue.toLocaleString()}</h2>
  </div>
  <div className="card-body">
  <div className="chart-area line-graph">
  <LineGraph data={historicalData} />
  </div>
  </div>
  </div>
 
  </div>
  </div>

</div>
</div>
  

    <div className="cards">
      <HighestValueAssetCard 
        ticker={highestValueAsset ? highestValueAsset.ticker : 'Loading...'}
        value={highestValueAsset ? highestValueAsset.totalValue : 'Loading...'}
      />
    
      <HighestGrowthAssetCard 
        ticker={highestGrowthAsset && highestGrowthAsset.asset ? highestGrowthAsset.asset.ticker : 'Loading...'}
        value={highestGrowthAsset ? highestGrowthAsset.totalValue : 'Loading...'}
      />
<HighestLossAssetCard 
        ticker={highestLossAsset && highestLossAsset.asset ? highestLossAsset.asset.ticker : 'Loading...'}
        value={highestLossAsset ? highestLossAsset.totalValue : 'Loading...'}
      />
      <TotalAssetsCard 
        numAssets={numAssets}
      />
     </div>
<div className="bottom-row">
     <div className="donut">
        <h3 className="donut">Sector Allocation Overview</h3>
        <PieChart data={sectorAllocations} />
      </div>
     {/* <div className="asset-table asset-table-dashboard"> */}
      {/* <div className="asset-dash-container"> */}
     {/* <h3 className="assets">My Assets</h3> */}
     <AssetTable
            portfolio={portfolio}
            updateAsset={updateAsset}
            deleteAsset={deleteAsset}
            user={user}
            setPortfolio={setPortfolio}
            className="actual-table"
          />
          </div>
      </div>
    // </div>
    )
  }
    