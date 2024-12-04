import React, { useState, useContext } from 'react';
import { addIncome } from '../services/api';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/AddIncome.css';

const AddIncomePage = () => {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddIncome = async (e) => {
    e.preventDefault();
    try {
      await addIncome(token, { source, amount, date });
      navigate('/income');
    } catch (error) {
      console.error('Error adding income:', error);
    }
  };

  return (
    <div className="add-income-page">
      <h2>Add Income</h2>
      <form onSubmit={handleAddIncome}>
        <input
          type="text"
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Add Income</button>
      </form>
    </div>
  );
};

export default AddIncomePage;