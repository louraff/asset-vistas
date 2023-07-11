import React, { useEffect, useState } from 'react';
import AssetTable from '../../components/AssetTable/AssetTable';


import axios from 'axios';


export default function MyAssets({user}) {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/portfolio/${user._id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setPortfolio(res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const updateAsset = (row) => {
    const newValue = row.units;

    axios
      .put(`/api/portfolio/${user._id}/asset/${row._id}`, { units: newValue })
      .then((res) => {
        if (res.data) {
          setPortfolio(res.data);
        }
      })
      .catch((error) => {
        console.error("Error updating asset: ", error);
      });
  };

  const deleteAsset = (id) => {
    console.log(`Deleting asset with id ${id} for user ${user._id}`);  
  
    if (!id) {
      console.error("Error deleting asset: Asset id is undefined");
      return;
    }
  
    axios
      .delete(`/api/portfolio/${user._id}/asset/${id}`)
      .then((res) => {
        if (res.data) {
          setPortfolio(res.data);
        }
      })
      .catch((error) => {
        console.error("Error deleting asset: ", error);
      });
  };


  return (
    <>
     <h1>MyAssets</h1>
      {portfolio ? (
        <AssetTable 
          portfolio={portfolio}
          updateAsset={updateAsset}
          deleteAsset={deleteAsset}
        />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
