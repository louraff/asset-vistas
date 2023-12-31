import "../css/AssetTable.css"
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import NewAssetFormModal from '../AssetModal/AssetModal';
import { v4 as uuidv4 } from 'uuid';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import axios from 'axios';
import { fetchHistoricalData } from "../../utilities/historicalData-api";
import { useSnackbar } from 'notistack';


export default function AssetTable({ portfolio, setPortfolio, updateAsset, deleteAsset, user }) {
  const [assets, setAssets] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [open, setOpen] = useState(false);
  const [assetToEdit, setAssetToEdit] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleAssetChange = (newAssetData) => {
    setAssetToEdit((prevAsset) => ({
      ...prevAsset,
      ...newAssetData,
    }));
  };

  const columns = [
    { field: 'ticker', headerName: 'TICKER', editable: true, sortable: true, filterable: true, width: 100 },
    { field: 'units', headerName: 'UNITS',editable: true, sortable: true, filterable: true, width: 70 },
    {field: 'totalValue', 
    headerName: 'TOTAL VALUE', 
    editable: false, 
    sortable: true, 
    filterable: true, 
    width: 120,
    valueGetter: (params) => params.row.totalValue,
    valueFormatter: ({ value }) => `$${Number(value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`},
    // { 
    //   field: 'totalValue', 
    //   headerName: 'Total Value', 
    //   valueGetter: (params) => params.row.units * params.row.currentPrice,
    //   editable: false,
    //   sortable: true, 
    //   filterable: true, 
    //   width: 150 
    // },
    {
      field: 'priceChange',
      headerName: '',
      renderCell: (params) => (
        params.row.oldPrice !== undefined ? // Check if oldPrice is not undefined
          params.row.currentPrice > params.row.oldPrice ?
            <ArrowUpwardIcon style={{ color: 'green' }} /> :
            params.row.currentPrice < params.row.oldPrice ?
              <ArrowDownwardIcon style={{ color: 'red' }} /> : null
          : null // oldPrice is undefined
      ),
      editable: false,
      sortable: true, 
      filterable: true, 
      width: 50 
    },
    { field: 'sector', headerName: 'SECTOR', editable: true, sortable: true, filterable: true, width: 250 }, 
    {
      field: 'action',
      headerName: 'EDIT',
      sortable: false,
      filterable: false,
      width: 250,
      
      renderCell: (params) => (
        <strong>
          <IconButton
            color="primary"
            aria-label="edit asset"
            onClick={() => {
              const id = params.id;
              setAssetToEdit(params.row);
              setOpen(true);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="delete asset"
            onClick={() => {
              console.log('Delete button clicked. Params:', params);
        console.log('Delete button investigation. Params.row: ', params.row);
        console.log('Delete button clicked. Params.row._id:', params.row._id);
        deleteAsset(params.row._id);
        deleteAssetLocally(params.row._id);
        enqueueSnackbar("Refresh the page for updated insights!", { anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
 
            }}
          >
            <DeleteIcon />
          </IconButton>
        </strong>
      ),
    },
];

  const handleClose = () => {
    setOpen(false);
    setAssetToEdit(null);
    setPortfolio((prevPortfolio) => ({ ...prevPortfolio }));
  };

  const updateAssetInComponent = async (newAsset) => {
    try {
      const response = await axios.put(`/api/portfolio/${user._id}/asset/${newAsset._id}`, newAsset);
      if (response.status === 200) {
        console.log('Updated asset returned from server:', response.data);
        return response.data;
      } else {
        throw new Error('Failed to update asset');
      }
    } catch (error) {
      console.error('Update Asset error:', error);
      return null;
    }
  };
  


const handleSave = async () => {
  if (assetToEdit) {
    console.log('Saving asset:', assetToEdit);

    const updatedAsset = await updateAssetInComponent(assetToEdit);

    if (!updatedAsset) {
      console.error('Error updating asset:', assetToEdit);
      return;
    }

    if (updatedAsset) {
      console.log('Updated asset:', updatedAsset);
      const assetIndex = portfolio.assets.findIndex(asset => asset._id === assetToEdit._id);
      console.log('Asset index:', assetIndex);
      console.log('Portfolio before update:', portfolio);

      if (assetIndex !== -1) {
        setPortfolio((prevPortfolio) => {
          let updatedAssets = [...prevPortfolio.assets];  // Create a new array
          updatedAssets[assetIndex] = updatedAsset;  // Update the new array
      
          let updatedPortfolio = { ...prevPortfolio, assets: updatedAssets };  // Assign new array to the portfolio
      
          return updatedPortfolio;  // Set the portfolio state to the updated portfolio
        });
        setAssetToEdit(null);
      }

    }
  }
  enqueueSnackbar("Refresh the page for updated insights!", { anchorOrigin: { vertical: 'bottom', horizontal: 'right' } });
  handleClose();  // Close the modal
  
};
useEffect(() => {
  console.log('Portfolio after update:', portfolio);
}, [portfolio])

useEffect(() => {
  (async function fetchAndSetAssetPrices() {
    const updatedAssets = [...assets]; // Create a copy of the assets array
    for (let i = 0; i < updatedAssets.length; i++) {
      try {
        const { oldPrice, currentPrice } = await fetchAssetPrices(updatedAssets[i].ticker);
        updatedAssets[i].oldPrice = oldPrice;
        updatedAssets[i].currentPrice = currentPrice;
      } catch (error) {
        console.error(`Failed to fetch prices for ${updatedAssets[i].ticker}: `, error);
      }
    }
    setAssets(updatedAssets); // Update the state with the new array
  })();
}, []); // This effect runs whenever the `assets` array changes

async function fetchAssetPrices(assetTicker) {
  const historicalData = await fetchHistoricalData(assetTicker, '1y');
  const currentPrice = historicalData[historicalData.length - 1].close;
  const oldPrice = historicalData[0].close;
  
  return {
    oldPrice,
    currentPrice,
  };
}

const deleteAssetLocally = (assetId) => {
  setPortfolio(prevPortfolio => {
      const updatedAssets = prevPortfolio.assets.filter(asset => asset._id !== assetId);
      return { ...prevPortfolio, assets: updatedAssets };
  });
};

  

const handleEditCellChangeCommit = React.useCallback(({ id, field, props }) => {
  if (field === 'units') {
        console.log('Updating units');
    updateAsset({ ...props.row, units: props.value });
  } else if (field === 'sector') {
        console.log('Updating sector');
    updateAsset({ ...props.row, sector: props.value });
  }
  
}, [updateAsset]);


  console.log("check if totalValue is being handled correctly in the front end: ", portfolio ? portfolio.assets.map(asset => ({ id: asset._id || uuidv4(), ...asset })) : []);

  // console.log('Asset data: ', portfolio ? portfolio.assets.map(asset => ({ id: asset._id || uuidv4(), ...asset })) : []);

  return (
    <div className="asset-parent-table">
      <h4 className="asset-header">My Assets</h4>
    <div className='asset-table-container'>
      <div className='table-group'>

      {/* <h4 className="asset-header">My Assets</h4> */}
    <div className="table-container">
      <DataGrid
      
        rows={portfolio ? portfolio.assets.map(asset => ({ id: asset._id || uuidv4(), ...asset })) : []}
        columns={columns}
        className="custom-data-grid"
        onEditCellChangeCommit={handleEditCellChangeCommit}
        getRowId={(row) => row.id}
        style={{ overflow: 'visible' }}
        editRowsModel={editingId ? { [editingId]: { units: { isEditable: true, value: '...' } } } : {}}
      />
      <NewAssetFormModal
        open={open}
        handleClose={handleClose}
        asset={assetToEdit}
        handleSave={handleSave}
        user={user}
        onAssetChange={handleAssetChange}
      />
      </div>
 
    </div>
    </div>
    </div>
  );
}