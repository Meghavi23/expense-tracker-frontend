import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import '../styles/CombinedList.css'; // Import CSS for styling
import {
  getExpenses,
  getIncomes,
  updateIncome,
  deleteIncome,
  updateExpense,
  deleteExpense,
} from '../services/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const CombinedList = () => {
  const [combinedList, setCombinedList] = useState([]);
  const { token } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editType, setEditType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesResponse = await getExpenses(token);
        const incomesResponse = await getIncomes(token);

        const combinedData = [
          ...expensesResponse.data.map((expense) => ({
            ...expense,
            type: 'expense',
          })),
          ...incomesResponse.data.map((income) => ({
            ...income,
            type: 'income',
          })),
        ];

        combinedData.sort((a, b) => new Date(a.date) - new Date(b.date));
        setCombinedList(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [token]);

  const handleEdit = (item) => {
    setEditData(item);
    setEditType(item.type);
    setOpenModal(true);
  };

  const handleDelete = async (id, type) => {
    try {
      if (type === 'income') {
        await deleteIncome(token, id);
      } else if (type === 'expense') {
        await deleteExpense(token, id);
      }
      setCombinedList(combinedList.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditData(null);
  };

  const handleSave = async () => {
    try {
      if (editType === 'income') {
        await updateIncome(token, editData._id, editData);
      } else if (editType === 'expense') {
        await updateExpense(token, editData._id, editData);
      }
      setCombinedList((prevList) =>
        prevList
          .map((item) => (item._id === editData._id ? editData : item))
          .sort((a, b) => new Date(a.date) - new Date(b.date))
      );
      handleCloseModal();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className='combined-list-container'>
      <h2>Combined Expense and Income List</h2>
      <div className='combined-list'>
        {combinedList.map((item) => (
          <div
            key={item._id}
            className={item.type === 'income' ? 'income-item' : 'expense-item'}
          >
            <span>
              {item.type === 'income' ? 'Income' : 'Expense'}:{' '}
              {item.source || item.category}
            </span>
            <span>Amount: ${item.amount}</span>
            <span>Date: {new Date(item.date).toLocaleDateString()}</span>
            <EditIcon className='edit-icon' onClick={() => handleEdit(item)} />
            <DeleteIcon
              className='delete-icon'
              onClick={() => handleDelete(item._id, item.type)}
            />
          </div>
        ))}
      </div>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          className='modal-box'
          sx={{ p: 4, bgcolor: 'background.paper', boxShadow: 24 }}
        >
          <h2>Edit {editType === 'income' ? 'Income' : 'Expense'}</h2>
          <TextField
            label={editType === 'income' ? 'Source' : 'Category'}
            value={editData?.source || editData?.category || ''}
            onChange={(e) =>
              setEditData({
                ...editData,
                [editType === 'income' ? 'source' : 'category']: e.target.value,
              })
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

export default CombinedList;
