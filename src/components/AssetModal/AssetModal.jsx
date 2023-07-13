import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import NewAssetForm from '../NewAssetForm/NewAssetForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';


export default function NewAssetFormModal({ open, handleClose, onAssetChange, asset, handleSave, user }) {
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
      
    return (
        <ThemeProvider theme={darkTheme}>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a New Asset</DialogTitle>
        <DialogContent>
            <NewAssetForm 
                onAssetChange={onAssetChange} user={user} asset={asset} onSave={handleSave}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
        </ThemeProvider>
    );
}