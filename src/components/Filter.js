import React, { useState } from 'react';
import '../styles/Filter.css';

const Filter = ({ applyFilter }) => {
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = (e) => {
    e.preventDefault();
    applyFilter({ category, startDate, endDate });
  };

  return (
    <form onSubmit={handleFilter}>
      <input
        type='text'
        placeholder='Category'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type='date'
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type='date'
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button type='submit'>Filter</button>
    </form>
  );
};

export default Filter;
