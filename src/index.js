import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterView from './screens/RegisterView';
import HomePage from './screens/HomePage';
import PhysicalTrainings from './screens/PhysicalTrainings';
import NonImmersive from './screens/NonImmersive';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter> 
        <Routes>
            <Route index element={<App />} />
            <Route path="signup" element={<RegisterView />} />
            <Route path="home" element={<HomePage />} />
            <Route path="physicaltrainings" element={<PhysicalTrainings />} />
            <Route path="physicaltrainings/nonimmersive" element={<NonImmersive />} />
        </Routes>
    </BrowserRouter>
);

