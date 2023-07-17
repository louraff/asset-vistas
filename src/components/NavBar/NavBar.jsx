import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import '../css/NavBar.css'


import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser, isBarOpen, setIsSidebarOpen }) {

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }


 // style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}> */}

  return (
    <div id="sidebar-wrapper">
    <div id="sidebar">
    <CDBSidebar id="sidebar-corners">
    <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>} onClick={() => setIsSidebarOpen(prevState => !prevState)}>
        <a href="/dashboard" className="text-decoration-none" style={{ color: 'inherit' }}>
        Welcome, {user.name}
        </a>
      </CDBSidebarHeader>

      <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
          <Link to='/dashboard'activeClassName="activeClicked">              
            <CDBSidebarMenuItem icon="chart-line">Dashboard</CDBSidebarMenuItem>
          </Link>
          {/* <Link to='/assets' activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">My Assets</CDBSidebarMenuItem>
          </Link> */}
          <Link to='/add-asset' activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="plus">Add Asset</CDBSidebarMenuItem>
          </Link>
          <Link to='/profile' activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
          </Link>
          <Link to='' onClick={handleLogOut} activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="exit">Log Out</CDBSidebarMenuItem>
          </Link>

          </CDBSidebarMenu>
       </CDBSidebarContent>

      <CDBSidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 5px',
          }}
        >
          Asset Vistas
        </div>
      </CDBSidebarFooter>
    </CDBSidebar>
  </div>
  </div>
);
};



