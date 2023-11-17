import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterView from './screens/RegisterView';
import ActivateView from './screens/userProccess/ActivateView';
import HomePage from './screens/HomePage';
import PhysicalTrainings from './screens/PhysicalTrainings';
import NonImmersive from './screens/NonImmersive';

import Membserships from './screens/MembsershipsList';
import SuccesSignUp from './screens/userProccess/SuccesSignUp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter> 
        <Routes>
            <Route index element={<App />} />
            <Route path="signup" element={<RegisterView />} />
            <Route path="home" element={<HomePage />} />
            <Route path="home/physicaltrainings" element={<PhysicalTrainings />} />
            <Route path="home/physicaltrainings/nonimmersive" element={<NonImmersive />} />
            <Route path="signup/membership" element={<Membserships />} />
            <Route path="successRegistration" element={<SuccesSignUp />} />
            <Route path="activateAccount/*" element={<ActivateView />} />
        </Routes>
    </BrowserRouter>
);

