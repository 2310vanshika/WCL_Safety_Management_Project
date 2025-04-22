// import React, { useState, useEffect, useRef } from 'react';

// const OTPInput = ({ onComplete }) => {
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const inputRefs = useRef([]);

//   const handleChange = (e, index) => {
//     const value = e.target.value;

//     // Only accept numbers
//     if (/^\d*$/.test(value)) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

//       // Move to the next input field if the current field is filled
//       if (value && index < 5) {
//         inputRefs.current[index + 1].focus();
//       }

//       // Call onComplete if all inputs are filled
//       if (newOtp.every((digit) => digit)) {
//         onComplete(newOtp.join(''));
//       }
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === 'Backspace' && !otp[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   return (
//     <div className="flex space-x-2">
//       {otp.map((digit, index) => (
//         <input
//           key={index}
//           type="text"
//           value={digit}
//           onChange={(e) => handleChange(e, index)}
//           onKeyDown={(e) => handleKeyDown(e, index)}
//           ref={(el) => (inputRefs.current[index] = el)}
//           maxLength={1} // Only accept one character
//           className="w-12 h-12 text-center text-xl border border-gray-300 rounded focus:outline-none focus:border-blue-500"
//         />
//       ))}
//     </div>
//   );
// };

// export default OTPInput;
