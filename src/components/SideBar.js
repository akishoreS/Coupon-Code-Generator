import React from 'react';
import './SideBar.css';
import logo from '../assets/logo.png'
const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <img src={logo} alt="Cordelia Cruises" />
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li><a href="#">Homepage</a></li>
                    <li><a href="#">Coupon</a></li>
                    <li><a href="#">Logout</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
