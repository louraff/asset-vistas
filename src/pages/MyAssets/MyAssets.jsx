import React, { useEffect, useState } from 'react';
import AssetTable from '../../components/AssetTable/AssetTable';
import axios from 'axios';
import usePortfolio from '../../utilities/usePortfolio'; 
import '../../components/css/AssetTable.css'

export default function MyAssets({ user }) {
  const { portfolio, updateAsset, deleteAsset, setPortfolio } = usePortfolio(user);

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
