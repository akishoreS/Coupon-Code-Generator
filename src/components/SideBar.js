import React from 'react';
import './SideBar.css';
import logo from '../assets/logo.png';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <img src={logo} alt="Cordelia Cruises" />
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li><button onClick={() => window.location.href = '/'}>Homepage</button></li>
                    <li><button onClick={() => window.location.href = '/coupons'}>Coupon</button></li>
                    <li><button onClick={() => window.location.href = '/logout'}>Logout</button></li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
