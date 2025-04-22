// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import wcl_logo from './wcl_logo.png';

// const RegisterPage = () => {
//   const [values, setValues] = useState({
//     username: "",
//     email: "",
//     password: ""
//   });

//   const navigate = useNavigate();
//   const [error, setError] = useState(""); 
//   const [success, setSuccess] = useState(""); 

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setValues({
//       ...values,
//       [e.target.name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:8080/api/auth/register", {
//         username: values.username,
//         email: values.email,
//         password: values.password
//       });
//       navigate("/OTPverification");
//       setSuccess(response.data.message); 
//       setError(""); 
//       navigate("/otpverification");
//     } catch (err) {
//       console.error(err);
//       if (err.response) {
//         setError(err.response.data.message); 
//       } else {
//         setError("An error occurred while registering.");
//       }
//       setSuccess(""); 
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white rounded-lg shadow-lg p-8 w-96">
//         <div className="flex justify-center mb-6">
//           <img 
//             src={wcl_logo} 
//             alt="WCL Logo" 
//             className="h-24 w-24" 
//           />
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
//               Username
//             </label>
//             <input
//               type="text"
//               className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
//               name="username"
//               value={values.username}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
//               Email address
//             </label>
//             <input
//               type="email"
//               className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
//               name="email"
//               value={values.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
//               name="password"
//               value={values.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="flex justify-between items-center mb-4">
//             <p className="text-gray-600">
//               Already Registered? <Link to="/login" className="text-blue-500 underline">Login</Link>
//             </p>
//             <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
//               Register
//             </button>
//           </div>
//           {error && <p className="text-red-500 mb-2">{error}</p>}
//           {success && <p className="text-green-500 mb-2">{success}</p>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import wcl_logo from './wcl_logo.png';

const RegisterPage = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState(""); 

  const handleChange = (e) => {
    const value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        username: values.username,
        email: values.email,
        password: values.password
      });
      
      // Show success message and navigate to OTP verification
      setSuccess(response.data.message);
      setError(""); 
      // Pass email to OTP verification page
      navigate("/otpverification", { state: { email: values.email } });
    } catch (err) {
      console.error(err);
      if (err.response) {
        setError(err.response.data.message); 
      } else {
        setError("An error occurred while registering.");
      }
      setSuccess(""); 
    }
  };

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
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
              name="username"
              value={values.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email address
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
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
              value={values.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              Already Registered? <Link to="/login" className="text-blue-500 underline">Login</Link>
            </p>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Register
            </button>
          </div>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          {success && <p className="text-green-500 mb-2">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
