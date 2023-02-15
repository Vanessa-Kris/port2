import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Dashboard from  './Dashboard.js'

export default function App() {
  return (
    <Dashboard/>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);