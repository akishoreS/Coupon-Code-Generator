import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home'; // Ensure you have a Home component
import CouponForm from './components/CouponForm';
import Logout from './components/Logout'; // Ensure you have a Logout component

function App() {
    return (
        <Routes>
            <Route path="/" element={<CouponForm />} />
            <Route path="/coupons" element={<Home />} />
            <Route path="/logout" element={<Logout />} />
        </Routes>
    );
}

export default App;
