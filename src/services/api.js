import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const getAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// User Authentication
export const registerUser = (email, password) => {
  return axios.post(`${API_BASE_URL}/users/register`, { email, password });
};

export const loginUser = (email, password) => {
  return axios.post(`${API_BASE_URL}/users/login`, { email, password });
};

// Expenses
export const addExpense = (token, data) => {
  return axios.post(`${API_BASE_URL}/expenses`, data, getAuthHeaders(token));
};

export const getExpenses = (token) => {
  return axios.get(`${API_BASE_URL}/expenses`, getAuthHeaders(token));
};

export const updateExpense = (token, id, data) => {
  return axios.put(
    `${API_BASE_URL}/expenses/${id}`,
    data,
    getAuthHeaders(token)
  );
};

export const deleteExpense = (token, id) => {
  return axios.delete(`${API_BASE_URL}/expenses/${id}`, getAuthHeaders(token));
};

// Incomes
export const addIncome = (token, data) => {
  return axios.post(`${API_BASE_URL}/income`, data, getAuthHeaders(token));
};

export const getIncomes = (token) => {
  return axios.get(`${API_BASE_URL}/income`, getAuthHeaders(token));
};

export const updateIncome = (token, id, data) => {
  return axios.put(`${API_BASE_URL}/income/${id}`, data, getAuthHeaders(token));
};

export const deleteIncome = (token, id) => {
  return axios.delete(`${API_BASE_URL}/income/${id}`, getAuthHeaders(token));
};
