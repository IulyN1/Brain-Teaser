import { Routes, Route } from 'react-router-dom';
import App from './App';
// pages
import Settings from './pages/Settings';
import ChangePassword from './pages/ChangePassword';
import Register from './pages/Register';
import Login from './pages/Login';
import Challenges from './pages/Challenges';
import Challenge from './pages/Challenge';
import ChallengeSolve from './pages/ChallengeSolve';

function RenderRoutes() {
	return (
		<Routes>
			<Route index element={<App />} />
			<Route path="settings" element={<Settings />} />
			<Route path="changepassword" element={<ChangePassword />} />
			<Route path="register" element={<Register />} />
			<Route path="login" element={<Login />} />
			<Route path="challenges" element={<Challenges />} />
			<Route path="challenges/:id" element={<Challenge />} />
			<Route path="challenges/solve/:id" element={<ChallengeSolve />} />
		</Routes>
	);
}

export default RenderRoutes;
