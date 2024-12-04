import React, { useEffect, useState, useContext } from 'react';
import { getExpenses, updateExpense, deleteExpense } from '../services/api';
import AuthContext from '../context/AuthContext';
import '../styles/ExpenseList.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const { token } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await getExpenses(token);
        setExpenses(
          response.data.sort((a, b) => new Date(a.date) - new Date(b.date))
        );
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };
    fetchExpenses();
  }, [token]);

  const handleEditExpense = (expense) => {
    setEditData(expense);
    setOpenModal(true);
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(token, id);
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditData(null);
  };

  const handleSave = async () => {
    try {
      await updateExpense(token, editData._id, editData);
      setExpenses((prevExpenses) =>
        prevExpenses
          .map((expense) => (expense._id === editData._id ? editData : expense))
          .sort((a, b) => new Date(a.date) - new Date(b.date))
      );
      handleCloseModal();
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  return (
    <div className='expense-list-container'>
      <h2>Expense List</h2>
      <div className='expense-list'>
        {expenses.map((expense) => (
          <div key={expense._id} className='expense-item'>
            <span>Category: {expense.category}</span>
            <span>Amount: ${expense.amount}</span>
            <span className='expense-date'>
              Date: {new Date(expense.date).toLocaleDateString()}
            </span>
            <EditIcon
              className='edit-icon'
              onClick={() => handleEditExpense(expense)}
            />
            <DeleteIcon
              className='delete-icon'
              onClick={() => handleDeleteExpense(expense._id)}
            />
          </div>
        ))}
      </div>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          className='modal-box'
          sx={{ p: 4, bgcolor: 'background.paper', boxShadow: 24 }}
        >
          <h2>Edit Expense</h2>
          <TextField
            label='Category'
            value={editData?.category || ''}
            onChange={(e) =>
              setEditData({ ...editData, category: e.target.value })
            }
            fullWidth
            margin='normal'
          />
          <TextField
            label='Amount'
            type='number'
            value={editData?.amount || ''}
            onChange={(e) =>
              setEditData({ ...editData, amount: e.target.value })
            }
            fullWidth
            margin='normal'
          />
          <TextField
            label='Date'
            type='date'
            value={
              editData?.date
                ? new Date(editData.date).toISOString().split('T')[0]
                : ''
            }
            onChange={(e) => setEditData({ ...editData, date: e.target.value })}
            fullWidth
            margin='normal'
          />
          <Button
            variant='contained'
            color='primary'
            onClick={handleSave}
            sx={{ mt: 2 }}
          >
            Save
          </Button>
          <Button
            variant='outlined'
            onClick={handleCloseModal}
            sx={{ mt: 2, ml: 2 }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ExpenseList;
