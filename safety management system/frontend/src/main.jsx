// main.jsx
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
    <BrowserRouter> {/* Wrap App with BrowserRouter */}
        <App />
    </BrowserRouter>
);
