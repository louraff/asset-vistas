import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import NewAssetFormModal from '../AssetModal/AssetModal';
import { v4 as uuidv4 } from 'uuid';

export default function AssetTable({ portfolio, setPortfolio, updateAsset, deleteAsset, user }) {
  const [assets, setAssets] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [open, setOpen] = useState(false);
  const [assetToEdit, setAssetToEdit] = useState(null);

  const handleAssetChange = (newAssetData) => {
    setAssetToEdit((prevAsset) => ({
      ...prevAsset,
      ...newAssetData,
    }));
  };

  const columns = [
    { field: 'ticker', editable: true, sortable: true, filterable: true, width: 150 },
    { field: 'units', editable: true, sortable: true, filterable: true, width: 150 },
    { field: 'sector', editable: true, sortable: true, filterable: true, width: 150 },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      filterable: false,
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

  const handleSave = async () => {
    if (assetToEdit) {
      console.log('Saving asset:', assetToEdit);
  
      await updateAsset(assetToEdit);
  
      const assetIndex = portfolio.assets.findIndex(asset => asset._id === assetToEdit._id);
      console.log('Asset index:', assetIndex);
      console.log('Portfolio before update:', portfolio);
  
      if (assetIndex !== -1) {
        let updatedPortfolio = { ...portfolio };  // Create a local copy of the portfolio
        updatedPortfolio.assets[assetIndex] = assetToEdit;  // Update the local copy
  
        console.log('Updated assets:', updatedPortfolio.assets);
  
        setPortfolio(updatedPortfolio);  // Set the portfolio state to the updated local copy
        setAssetToEdit(null);
        setOpen(false);
      }
  
      // This console log will still not reflect the updated state as setPortfolio is asynchronous
      console.log('Portfolio after update:', portfolio);
    }
  };
  
  

  const handleEditCellChangeCommit = React.useCallback(
    ({ id, field, props }) => {
      if (field === 'units') {
        updateAsset({ ...props.row, units: props.value });
      }
    },
    [updateAsset]
  );

  console.log('Asset data: ', portfolio ? portfolio.assets.map(asset => ({ id: asset._id || uuidv4(), ...asset })) : []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={portfolio ? portfolio.assets.map(asset => ({ id: asset._id || uuidv4(), ...asset })) : []}
        columns={columns}
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
  );
}
