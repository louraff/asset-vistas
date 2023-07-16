import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import EditAssetForm from '../EditAssetForm/EditAssetForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "../css/EditAssetForm.css"

export default function NewAssetFormModal({ open, handleClose, onAssetChange, asset, handleSave, user }) {
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

      console.log(handleSave);
      
    return (
        <ThemeProvider theme={darkTheme}>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className="dialogContainer">
        <DialogContent>
        <EditAssetForm 
            onAssetChange={onAssetChange} 
            user={user} 
            asset={asset} 
            onSubmit={handleSave} 
            onCancel={handleClose} 
        />
            </DialogContent>
            <DialogActions>
            {/* <div className="button-container">
                    <button onClick={handleClose} color="secondary" className="cancel-button">
                    Cancel
                    </button>
                    <Button onClick={handleSave} color="primary" className="asset-button">
                    Save
                    </Button>
                 </div> */}
            </DialogActions>
        </Dialog>
        </ThemeProvider>
    );
}
