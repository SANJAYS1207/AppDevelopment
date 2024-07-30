import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Chart.css';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';



const chartData = [
  { name: 'Properties Sold', value: 40 },
  { name: 'Properties Bought', value: 35 },
  { name: 'Properties Rented', value: 25 },
];

const COLORS = ['#FF7F50', '#6495ED', '#90EE90'];

const Charts = () => {
  const navigate = useNavigate();

  const totalValue = chartData.reduce((sum, entry) => sum + entry.value, 0);

  const handleSignOut = () => {
    // Clear any authentication data if needed
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="charts-container">
      <div className="header-buttons">
        <button onClick={() => navigate('/manage')} className="manage-property-button">Manage Property</button>
        <button onClick={()=>handleSignOut()} className="signout-button">
          <span className="icon">🚪</span> Sign Out
        </button>
      </div>
      <h1 className="charts-header">Real Estate Transactions</h1>
      <div className="charts-content">
        <div className="pie-chart-wrapper">
          <PieChart width={500} height={400}>
            <Pie 
              data={chartData} 
              dataKey="value" 
              nameKey="name" 
              outerRadius={150} 
              fill="#8884d8" 
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        <div className="stats">
          <h2 className="stats-title">Overall Statistics</h2>
          <ul className="stats-list">
            {chartData.map((entry, index) => (
              <li key={index} className="stats-item">
                <span className="stats-label">{entry.name}:</span>
                <span className="stats-value">{entry.value} ({((entry.value / totalValue) * 100).toFixed(2)}%)</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Charts;
