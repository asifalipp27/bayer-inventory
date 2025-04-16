import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from '../pages/dasboard/dashboard';
import ProtectedRoute from './ProtectedRoute';
import Signup from '../auth/Signup';
import Login from '../auth/Login';
import SingleInventory from '../components/singleInventory/SingleInventory';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/inventory/:id" element={<ProtectedRoute><SingleInventory /></ProtectedRoute>} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;