import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import Dashboard from './components/Dashboard';
import AddExpense from './components/AddExpense';
import AddIncome from './components/AddIncome';
import IncomeList from './components/IncomeList';
import ExpenseList from './components/ExpenseList';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CombinedList from './components/CombinedList';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/add-expense'
            element={
              <ProtectedRoute>
                <AddExpense />
              </ProtectedRoute>
            }
          />
          <Route
            path='/add-income'
            element={
              <ProtectedRoute>
                <AddIncome />
              </ProtectedRoute>
            }
          />
          <Route
            path='/expenses'
            element={
              <ProtectedRoute>
                <ExpenseList />
              </ProtectedRoute>
            }
          />
          <Route
            path='/incomes'
            element={
              <ProtectedRoute>
                <IncomeList />
              </ProtectedRoute>
            }
          />
          <Route
            path='/combined-list'
            element={
              <ProtectedRoute>
                <CombinedList />
              </ProtectedRoute>
            }
          />

          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/terms' element={<TermsOfService />} />
          <Route path='/contact' element={<ContactUs />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
