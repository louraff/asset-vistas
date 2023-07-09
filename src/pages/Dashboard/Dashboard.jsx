import React, { useEffect, useState } from "react";
import axios from "axios";
import LineGraph from "../../Visuals/LineGraph";
import PieChart from "../../Visuals/PieChart";

export default function Dashboard({user}) {
  const [portfolio, setPortfolio] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [sectorAllocations, setSectorAllocations] = useState(null)

  useEffect(() => {
    const userId = user._id;

    axios
      .get(`/api/portfolio/${userId}`)
      .then((res) => {
        setPortfolio(res.data);

        const sectorAllocation = res.data.assets.reduce((acc, asset) => {
          const sector = asset.sector;
          acc[sector] = (acc[sector] || 0) + 1; // add one for each asset in a sector
          return acc;
        }, {});
        setSectorAllocations(sectorAllocation);

        // Fetch historical data for each asset:
        return Promise.all(
          res.data.assets.map(asset =>
            axios.get(`/api/historical-data/${asset._id}`)
            )
          );
      })
      .then((responses) => {
        // Map over the array of axios responses to get the actual data
        const historicalData = responses.map(response => response.data);
        setHistoricalData(historicalData)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      })
  }, []);

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