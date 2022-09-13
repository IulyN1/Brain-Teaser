import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Challenges from './pages/Challenges';
import Challenge from './pages/Challenge';
import ChallengeSolve from './pages/ChallengeSolve';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Routes>
			<Route index element={<App />} />
			<Route path="challenges" element={<Challenges />} />
			<Route
				path="challenges/htmlbtn"
				element={
					<Challenge
						id={'htmlbtn'}
						title={'HTML Disabled Buttons'}
						level={'Easy'}
						points={5}
						description={
							'In this day and age, web attacks have become more and more cunning and dangerous. Web developers need to take into consideration multiple aspects when building their applications in order to achieve a great level of security and they need to adhere to certain rules in order to achieve it. Nevertheless, unexperienced developers can make basic security mistakes without realizing. Can you spot the beginner mistake in this challenge?'
						}
					/>
				}
			/>
			<Route
				path="challenges/solve/htmlbtn"
				element={<ChallengeSolve id={'htmlbtn'} title={'HTML Disabled Buttons'} />}
			/>
		</Routes>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
