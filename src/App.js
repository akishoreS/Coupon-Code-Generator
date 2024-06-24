import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import CouponForm from './components/CouponForm';
import Logout from './components/Logout';

function App() {
    return (
        <Routes>
            {/* Set CouponForm as the default route */}
            <Route path="/" element={<Navigate to="/coupons" />} />
            <Route path="/coupons" element={<CouponForm />} />
            <Route path="/home" element={<Home />} />
            <Route path="/logout" element={<Logout />} />
        </Routes>
    );
}

export default App;
