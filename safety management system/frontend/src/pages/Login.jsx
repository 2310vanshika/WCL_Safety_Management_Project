import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import wcl_logo from './wcl_logo.png';

const LoginPage = () => {
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate(); // Initialize useNavigate
  const [error, setError] = useState(""); // State to hold error message
  const [loading, setLoading] = useState(false); // State to handle loading status

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const token = localStorage.getItem('token');
    if (loggedInUser&&token) {
      console.log("User is already logged in, redirecting to dashboard");
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    // console.log("Form submitted with values:", values);
    e.preventDefault();
    setLoading(true); // Set loading to true
    setError(""); // Clear previous error message
    
    try {
      // Make the API call to login
      const response = await axios.post('http://localhost:8080/api/auth/login', values);
      console.log("API response:", response.data);
      
      // Check if login was successful
      if (response.data.message.trim() === 'Successfully logged in') {
        // Store user data in localStorage
        console.log("User data and token saved to localStorage:", response.data.user, response.data.token);
        localStorage.setItem('loggedInUser', JSON.stringify(response.data.user)); // Save user data to localStorage
        localStorage.setItem('token', response.data.token); // Save token to localStorage

        // Redirect to dashboard
        console.log("Login successful, Navigating to dashboard");
        navigate("/dashboard"); 
      } else {
        // Handle error from response if login failed
        setError(response.data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again later."); // Set generic error message
    } finally {
      setLoading(false); // Reset loading status
    }
  };

  useEffect(() => {
    if (error) {
      console.error("Error occurred:", error);
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <div className="flex justify-center mb-6">
          <img 
            src={wcl_logo}
            alt="WCL Logo"
            className="h-24 w-24" 
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email address
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              Not a user? <Link to="/register" className="text-blue-500 underline">Register Here!</Link>
            </p>
            <button 
              type="submit" 
              className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Logging in...' : 'Login'} {/* Update button text based on loading status */}
            </button>
          </div>
          {error && <p className="text-red-500 mb-2">{error}</p>} {/* Display error message */}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
