// import React from 'react';

const Card = ({ imageUrl, username, affectedPeople, accidentDate,className }) => {
  const displayAffectedPeople = Array.isArray(affectedPeople)?affectedPeople.join(','):"No affected people";
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 m-2 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg ${className}`}>
      <img className="w-full h-48 object-cover" src={imageUrl} alt="Accident" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{username}</div>
        <p className="text-gray-700 text-base">
          <strong>Affected People:</strong> {affectedPeople.join(', ')}
        </p>
        <p className="text-gray-600 text-sm mt-2">
          <strong>Date & Time:</strong> {new Date(accidentDate).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Card; 