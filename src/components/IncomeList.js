import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import '../styles/IncomeList.css';
import { getIncomes, updateIncome, deleteIncome } from '../services/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const IncomeList = () => {
  const [incomes, setIncomes] = useState([]);
  const { token } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const response = await getIncomes(token);
        setIncomes(
          response.data.sort((a, b) => new Date(a.date) - new Date(b.date))
        );
      } catch (error) {
        console.error('Error fetching incomes:', error);
      }
    };
    fetchIncomes();
  }, [token]);

  const handleEditIncome = (income) => {
    setEditData(income);
    setOpenModal(true);
  };

  const handleDeleteIncome = async (id) => {
    try {
      await deleteIncome(token, id);
      setIncomes(incomes.filter((income) => income._id !== id));
    } catch (error) {
      console.error('Error deleting income:', error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditData(null);
  };

  const handleSave = async () => {
    try {
      await updateIncome(token, editData._id, editData);
      setIncomes((prevIncomes) =>
        prevIncomes
          .map((income) => (income._id === editData._id ? editData : income))
          .sort((a, b) => new Date(a.date) - new Date(b.date))
      );
      handleCloseModal();
    } catch (error) {
      console.error('Error updating income:', error);
    }
  };

  return (
    <div className='income-list-container'>
      <h2>Income List</h2>
      <div className='income-list'>
        {incomes.map((income) => (
          <div key={income._id} className='income-item'>
            <span>Source: {income.source}</span>
            <span>Amount: ${income.amount}</span>
            <span className='income-date'>
              Date: {new Date(income.date).toLocaleDateString()}
            </span>
            <EditIcon
              className='edit-icon'
              onClick={() => handleEditIncome(income)}
            />
            <DeleteIcon
              className='delete-icon'
              onClick={() => handleDeleteIncome(income._id)}
            />
          </div>
        ))}
      </div>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          className='modal-box'
          sx={{ p: 4, bgcolor: 'background.paper', boxShadow: 24 }}
        >
          <h2>Edit Income</h2>
          <TextField
            label='Source'
            value={editData?.source || ''}
            onChange={(e) =>
              setEditData({ ...editData, source: e.target.value })
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

export default IncomeList;
