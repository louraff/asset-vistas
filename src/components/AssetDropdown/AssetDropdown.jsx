import { Dropdown } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import React from 'react';
import '../css/AssetDropdown.css'

export default function AssetDropdown({ data, updateAsset, deleteAsset }) {

    const handleSelect = (key, event) => {
        if (key === 'edit') {
          updateAsset(data._id);
        } else if (key === 'delete') {
          deleteAsset(data._id);
        }
      };
    
      return (
        <DropdownButton onSelect={handleSelect} title="" variant="success" className="my-dropdown" id="dropdown-basic" style={{zIndex: 9999}}>
            <Dropdown.Item className="asset-edit" eventKey="edit">Edit</Dropdown.Item>
            <Dropdown.Item className="asset-delete" eventKey="delete">Delete</Dropdown.Item>
        </DropdownButton>
      );
    }