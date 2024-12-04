import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';
import { getExpenses, getIncomes } from '../services/api';

// Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesResponse = await getExpenses(token);
        setExpenses(expensesResponse.data);

        const incomesResponse = await getIncomes(token);
        setIncomes(incomesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [token]);

  // Group expenses by category
  const groupedExpenses = expenses.reduce((acc, expense) => {
    if (acc[expense.category]) {
      acc[expense.category] += expense.amount;
    } else {
      acc[expense.category] = expense.amount;
    }
    return acc;
  }, {});

  // Prepare data for the chart
  const chartData = {
    labels: Object.keys(groupedExpenses),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(groupedExpenses),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
        hoverOffset: 4,
      },
    ],
  };

  const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
  const totalExpenses = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );
  const balance = totalIncome - totalExpenses;

  return (
    <div className='dashboard-container'>
      <h2>Dashboard</h2>
      <p>Total Income: ${totalIncome}</p>
      <p>Total Expenses: ${totalExpenses}</p>
      <p>Balance: ${balance}</p>
      <div className='chart-wrapper'>
        <Pie data={chartData} />
      </div>
      <div className='navigation-buttons'>
        <Link to='/expenses' className='nav-button'>
          View Expense List
        </Link>
        <Link to='/income' className='nav-button'>
          View Income List
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
