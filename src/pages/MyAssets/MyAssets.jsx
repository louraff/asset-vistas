import React, { useEffect, useState } from 'react';
import AssetTable from '../../components/AssetTable/AssetTable';
import axios from 'axios';
import usePortfolio from '../../utilities/usePortfolio'; 

export default function MyAssets({ user }) {
  const { portfolio, updateAsset, deleteAsset, setPortfolio } = usePortfolio(user);

  return (
    <>
      <h1>MyAssets</h1>
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
