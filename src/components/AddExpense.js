import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/AddExpense.css'; // Optional CSS for styling
import { addExpense } from '../services/api';

const AddExpensePage = () => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      await addExpense(token, { category, amount, date });
      navigate('/expenses'); // Redirect to expense list page after successful addition
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div className='add-expense-page'>
      <h2>Add Expense</h2>
      <form onSubmit={handleAddExpense}>
        <input
          type='text'
          placeholder='Category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type='number'
          placeholder='Amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type='submit'>Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpensePage;
