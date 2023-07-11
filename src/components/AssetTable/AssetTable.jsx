import React, {useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';



export default function AssetTable({ portfolio, updateAsset, deleteAsset }) {
    const [editRowsModel, setEditRowsModel] = useState({});
    const [editingId, setEditingId] = useState(null);


  const columns = [
    { field: 'ticker', editable: false, sortable: true, filterable: true },
    { field: 'units', editable: false, sortable: true, filterable: true },
    { field: 'sector', editable: false, sortable: true, filterable: true },
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
        setEditingId(id);
        setEditRowsModel({
            ...editRowsModel,
            [id]: {
                ...editRowsModel[id],
                units: { value: params.row.units, isEditable: true },
            },
        });
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
                deleteAsset(params.row._id)}}
            >
              <DeleteIcon />
            </IconButton>
          </strong>
        ),
    }
  ];

  const handleEditCellChangeCommit = React.useCallback(
    ({ id, field, props }) => {
      if (field === 'units') {
        updateAsset({ ...props.row, units: props.value });
      }
    },
    [updateAsset]
  );

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
  rows={portfolio ? portfolio.assets : []}
  columns={columns}
  onEditCellChangeCommit={handleEditCellChangeCommit}
  getRowId={(row) => row._id}
  style={{ overflow: 'visible' }} 
  editRowsModel={editingId ? {[editingId]: {units: {isEditable: true, value: '...' }}} : {}}
/>

    </div>
  );
}