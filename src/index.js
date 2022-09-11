import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Challenges from './pages/Challenges';
import Challenge from './pages/Challenge';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Routes>
			<Route index element={<App />} />
			<Route path="challenges" element={<Challenges />} />
			<Route path="challenges/htmlbtn" element={<Challenge id={'htmlbtn'} title={'HTML Disabled Buttons'} />} />
		</Routes>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
