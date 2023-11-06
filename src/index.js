import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterView from './screens/RegisterView';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter> 
        <Routes>
            <Route index element={<App />} />
            <Route path="signup" element={<RegisterView />} />
        </Routes>
    </BrowserRouter>
);

