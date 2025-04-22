import React, { useEffect, useState } from "react";
import Card from "./Card";
import AccidentGraph from "./AccidentGraph";
import axios from "axios";

// Error Boundary for graceful error handling
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in error boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}

const DashBoard = () => {
  const [userName,setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [graph, setGraph] = useState(false);
  const [images, setImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [affectedPeople, setAffectedPeople] = useState(""); // State to hold affected people input


  useEffect(()=>{
    const storedCredentials = localStorage.getItem("loggedInUser");
    if (storedCredentials) {
      const { username } = JSON.parse(storedCredentials);
      setUsername(username);

      // Generate DiceBear avatar URL
      const seed = username; // Use the username as a seed for the avatar
      const avatarApiUrl = `https://avatars.dicebear.com/api/identicon/${seed}.svg`; // You can change "identicon" to any other style
      setAvatarUrl(avatarApiUrl);
      console.log("Username:", username); // Debugging
      console.log("Avatar URL:", avatarApiUrl); // Debugging
    }

  },[]);
  const toggleGraph = () => {
    setGraph((prevState) => !prevState);
  };

  const accidentData = {
    imageUrl: uploadedImageUrl || "https://images.unsplash.com/photo-1719937206642-ca0cd57198cc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    username: "Jane Doe",
    affectedPeople: affectedPeople.split(",").map(person => person.trim()), // Split input into an array
    accidentDate: new Date().toISOString(), // Use current date for demonstration
  };

  const accidentDates = [
    { accidentDate: "2024-01-15T08:45:00.000Z" },
    { accidentDate: "2024-02-10T09:30:00.000Z" },
    { accidentDate: "2024-02-18T07:20:00.000Z" },
    { accidentDate: "2024-03-25T10:45:00.000Z" },
    { accidentDate: "2024-06-14T12:00:00.000Z" },
    { accidentDate: "2024-06-28T18:30:00.000Z" },
    { accidentDate: "2024-06-28T18:30:00.000Z" },
  ];

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!images) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("images", images);

    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem("token");

      const response = await axios.post("http://localhost:8080/api/accidents", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });
      setUploadedImageUrl(response.data.secure_url);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image.");
    }
  };

  return (
    <div className="overflow-y-hidden">
      {/* Header Section */}
      <div className="flex justify-between px-6 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-x-4">
          <span className="text-lg">{userName}</span>
          {/* Profile Icon */}
          <img
            src={avatarUrl}
            alt="Profile"
            className="w-10 h-10 rounded-full border border-gray-300"
          />
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex justify-between px-6 mt-5">
        <div className="flex justify-center gap-x-6">
          <button
            onClick={toggleGraph}
            className={`px-4 border rounded ${
              graph
                ? "bg-green-200 hover:bg-green-400"
                : "bg-green-400 hover:bg-green-200"
            }`}
          >
            {graph ? "Show Accidents" : "Show Statistics"}
          </button>
        </div>
        <blockquote className="text-2xl font-semibold italic text-center text-slate-900">
          “Safety brings &nbsp;
          <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-green-500 relative inline-block">
            <span className="relative text-white"> first aid </span>
          </span>
          &nbsp; to the uninjured.”
        </blockquote>
      </div>

      {/* Image Upload and Affected People Section */}
      <div className="mt-6 bg-gradient-to-r from-green-400 to-green-600 border border-gray-700 py-6 px-8 rounded-lg shadow-2xl transform transition-transform hover:scale-105">
        <h3 className="text-lg font-bold text-center mb-4">Upload Accident Image</h3>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4 md:mb-0 md:mr-4 px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={affectedPeople}
            onChange={(e) => setAffectedPeople(e.target.value)}
            placeholder="Enter affected people (comma separated)"
           className="mb-2  md:mr-40 px-4 py-2 border border-gray-300 rounded w-900"/>
          <button
            onClick={handleImageUpload}
            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            Upload Image
          </button>
        </div>
        {uploadedImageUrl && (
          <div className="mt-4">
            <img
              src={uploadedImageUrl}
              alt="Uploaded Accident"
              className="max-w-full h-auto border border-gray-300 rounded"
            />
          </div>
        )}
      </div>

      <div className="flex w-[95vw] mx-auto border mt-4 mb-2">
        {graph ? (
          <div className="h-[80vh] border">
            <ErrorBoundary>
              <AccidentGraph accidents={accidentDates} />
            </ErrorBoundary>
          </div>
        ) : (
          <div className="overflow-hidden h-[80vh] flex flex-wrap justify-around">
  <Card
    className="transform transition-transform duration-300 hover:scale-105 hover:shadow-lg" // Add these classes to the Card component
    imageUrl={accidentData.imageUrl}
    username={accidentData.username}
    affectedPeople={accidentData.affectedPeople}
    accidentDate={accidentData.accidentDate}
  />
</div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
