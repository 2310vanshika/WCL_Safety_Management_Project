
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AccidentGraph = ({ accidents }) => {
  // Initialize an array to count accidents per month (12 months)
  const accidentCountByMonth = new Array(12).fill(0);

  // Process the accidents data to count accidents per month
  accidents.forEach((accident) => {
    const accidentDate = new Date(accident.accidentDate); // Convert to Date object
    const month = accidentDate.getMonth(); // Get month (0 for January, 11 for December)
    accidentCountByMonth[month]++;
  });

  // Prepare data for the chart
  const data = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
    datasets: [
      {
        label: 'Number of Accidents',
        data: accidentCountByMonth,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Accidents by Month',
      },
    },
    maintainAspectRatio: false, // This ensures the chart expands to fill the container
  };

  return (
    <div className="w-[95vw] h-[80vh] mx-auto p-4">
      <Bar data={data} options={options} />
    </div>
  );
};

export default AccidentGraph;

