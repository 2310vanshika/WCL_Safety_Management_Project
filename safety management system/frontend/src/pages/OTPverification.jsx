// // // import React, { useState } from 'react';
// // // //import OTPInput from '../components/otplayout';
// // // import axios from 'axios';
// // // import { useNavigate } from 'react-router-dom';

// // // const OTPVerification = () => {
// // //   const [error, setError] = useState(null); // State to hold error message
// // //   const navigate = useNavigate(); // Initialize useNavigate
// // //   const email = 'vanshikadwivedi2301@gmail.com;' // Replace this with the actual email or get it from props or state

// // //   const handleComplete = async (otp) => {
// // //     console.log('OTP Entered:', otp);
// // //     setError(null);
  
// // //     try {
// // //       const response = await axios.post("http://localhost:8080/api/auth/verify-otp", {
// // //         email: email,
// // //         otp: otp,
// // //       });
  
// // //       console.log("Response from API:", response.data);
  
// // //       if (response.data.message === 'Email verified successfully') {
// // //         console.log('OTP verified successfully!');
// // //         setError(null);
// // //         navigate('/login');
// // //       } else if (response.data.message === 'User not found') {
// // //         console.error('User not found. Please check your email address.');
// // //         setError('User not found. Please check your email address.');
// // //       } else {
// // //         console.error('Invalid OTP, please try again.', response.data);
// // //         setError('Invalid OTP, please try again.');
// // //       }
// // //     } catch (err) {
// // //       let errorMessage = 'An error occurred while verifying the OTP. Please try again.';
// // //       if (err.response && err.response.data) {
// // //         errorMessage = err.response.data.message;
// // //       } else if (err.message) {
// // //         errorMessage = err.message;
// // //       }
// // //       console.error('Error verifying OTP:', errorMessage);
// // //       setError(errorMessage);
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex items-center justify-center h-screen">
// // //       <div>
// // //         <h1 className="text-2xl font-bold mb-4">Enter OTP</h1>
// // //         {/* <OTPInput onComplete={handleComplete} /> */}
// // //         <input type="text" placeholder="Enter OTP" onChange={()}/>
// // //         <button
// // //           className="w-full py-2 text-white bg-blue-500 hover:bg-blue-700 focus:outline-none"
// // //           onClick={handleComplete}
// // //         ></button>
// // //         {error && (
// // //           <div className="mt-4 text-red-500">
// // //             {error} {/* Display error message */}
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default OTPVerification;
// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// // const OTPVerification = () => {
// //   const [key, setKey] = useState(''); // State to hold the OTP entered by the user
// //   const [error, setError] = useState(null); // State to hold error message
// //   const navigate = useNavigate(); // Initialize useNavigate
// //   const email = 'vanshikadwivedi2301@gmail.com'; // Replace this with the actual email or get it from props or state

// //   const handleComplete = async () => {
// //     console.log('OTP Entered:', key);
// //     setError(null);
  
// //     try {
// //       const response = await axios.post("http://localhost:8080/api/auth/verify-otp", {
// //         email: email,
// //         otp: key,
// //       });
  
// //       console.log("Response from API:", response.data);
  
// //       if (response.data.message === 'Email verified successfully') {
// //         console.log('OTP verified successfully!');
// //         setError(null);
// //         navigate('/login'); // Redirect to login page after successful verification
// //       } else if (response.data.message === 'User not found') {
// //         console.error('User not found. Please check your email address.');
// //         setError('User not found. Please check your email address.');
// //       } else {
// //         console.error('Invalid OTP, please try again.', response.data);
// //         setError('Invalid OTP, please try again.');
// //       }
// //     } catch (err) {
// //       let errorMessage = 'An error occurred while verifying the OTP. Please try again.';
// //       if (err.response && err.response.data) {
// //         errorMessage = err.response.data.message;
// //       } else if (err.message) {
// //         errorMessage = err.message;
// //       }
// //       console.error('Error verifying OTP:', errorMessage);
// //       setError(errorMessage);
// //     }
// //   };

// //   return (
// //     <div className="flex items-center justify-center h-screen">
// //       <div>
// //         <h1 className="text-2xl font-bold mb-4">Enter OTP</h1>
// //         <input 
// //           type="text" 
// //           placeholder="Enter OTP" 
// //           value={key} 
// //           onChange={(e) => setKey(e.target.value)} // Update state on input change
// //           className="border border-gray-300 rounded py-2 px-4 mb-4"
// //         />
// //         <button
// //           className="w-full py-2 text-white bg-blue-500 hover:bg-blue-700 focus:outline-none"
// //           onClick={handleComplete} // Call handleComplete on button click
// //         >
// //           Verify OTP
// //         </button>
// //         {error && (
// //           <div className="mt-4 text-red-500">
// //             {error} {/* Display error message */}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default OTPVerification;
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const OTPVerification = () => {
//   const [key, setKey] = useState(''); // State to hold the OTP entered by the user
//   const [error, setError] = useState(null); // State to hold error message
//   const [loading, setLoading] = useState(false); // State to handle loading status
//   const navigate = useNavigate(); // Initialize useNavigate
//   const email = 'vanshikadwivedi2301@gmail.com'; // Replace this with the actual email or get it from props or state

//   const handleComplete = async () => {
//     console.log('Request payload:', { email: email, otp: key });
    
//     try {
//         const response = await axios.post(`http://localhost:8080/api/auth/verify-otp`, {
//         email: email,
//         otp: key,
//       });

//       console.log("Response from API:", response.data);

//       if (response.data.message === 'Email verified successfully') {
//         console.log('OTP verified successfully!');
//         setKey(''); // Clear the OTP input field
//         setError(null);
//         navigate('/login'); // Redirect to login page after successful verification
//       } else if (response.data.message === 'User not found') {
//         console.error('User not found. Please check your email address.');
//         setError('User not found. Please check your email address.');
//       } else {
//         console.error('Invalid OTP, please try again.', response.data);
//         setError('Invalid OTP, please try again.');
//       }
//     } catch (err) {
//       let errorMessage = 'An error occurred while verifying the OTP. Please try again.';
//       if (err.response && err.response.data) {
//         errorMessage = err.response.data.message;
//       } else if (err.message) {
//         errorMessage = err.message;
//       }
//       console.error('Error verifying OTP:', err.response.data);
//       setError(errorMessage);
//     } finally {
//       setLoading(false); // Reset loading status
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div>
//         <h1 className="text-2xl font-bold mb-4">Enter OTP</h1>
//         <input 
//           type="text" 
//           placeholder="Enter OTP" 
//           value={key} 
//           onChange={(e) => setKey(e.target.value)} // Update state on input change
//           className="border border-gray-300 rounded py-2 px-4 mb-4"
//         />
//         <button
//           className={`w-full py-2 text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'} focus:outline-none`}
//           onClick={handleComplete} // Call handleComplete on button click
//           disabled={loading} // Disable button while loading
//         >
//           {loading ? 'Verifying...' : 'Verify OTP'}
//         </button>
//         {error && (
//           <div className="mt-4 text-red-500">
//             {error} {/* Display error message */}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OTPVerification;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const OTPVerification = () => {
  const location = useLocation(); // Access location object
  const { email } = location.state || {}; // Get email from state
  const [key, setKey] = useState(''); // State to hold the OTP entered by the user
  const [error, setError] = useState(null); // State to hold error message
  const [loading, setLoading] = useState(false); // State to handle loading status
  const navigate = useNavigate(); // Initialize useNavigate

  const handleComplete = async () => {
    setLoading(true); // Set loading to true
    try {
      const response = await axios.post(`http://localhost:8080/api/auth/verify-otp`, {
        email: email, // Use the email from the state
        otp: key,
      });

      if (response.data.message === 'Email verified successfully') {
        console.log('OTP verified successfully!');
        setKey(''); // Clear the OTP input field
        setError(null);
        navigate('/login'); // Redirect to login page after successful verification
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      let errorMessage = 'An error occurred while verifying the OTP. Please try again.';
      if (err.response && err.response.data) {
        errorMessage = err.response.data.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false); // Reset loading status
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="text-2xl font-bold mb-4">Enter OTP</h1>
        <input 
          type="text" 
          placeholder="Enter OTP" 
          value={key} 
          onChange={(e) => setKey(e.target.value)} // Update state on input change
          className="border border-gray-300 rounded py-2 px-4 mb-4"
        />
        <button
          className={`w-full py-2 text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'} focus:outline-none`}
          onClick={handleComplete} // Call handleComplete on button click
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
        {error && (
          <div className="mt-4 text-red-500">
            {error} {/* Display error message */}
          </div>
        )}
      </div>
    </div>
  );
};

export default OTPVerification;
