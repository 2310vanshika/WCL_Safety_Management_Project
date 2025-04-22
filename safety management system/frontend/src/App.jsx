// App.jsx
import { Route, Routes } from 'react-router-dom'; // Import Route and Routes
import Home from './pages/Home'; // Ensure this is the correct path to your Home component
import Register from './pages/Register'; 
import Login from './pages/Login';
import OTPVerificationPage from './pages/OTPVerification'; 
import Dashboard from './pages/DashBoard';

function App() {
  return (
    <Routes> {/* Use Routes to define your routes */}
      <Route path="/" element={<Home />} /> {/* Home component for the root path */}
      <Route path="/register" element={<Register />} /> {/* Register component for the /register path */}
      <Route path="/otpverification" element={<OTPVerificationPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  );
}

export default App;
