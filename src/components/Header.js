import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/Header.css';

const Header = () => {
  const { token, logout } = useContext(AuthContext);
  const location = useLocation();

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>
          <img
            src='/assets/logo.webp'
            alt="Meg's Expense Tracker Logo"
            className='logo-image'
          />
        </Link>
      </div>
      <nav className='nav-links'>
        <Link
          to='/dashboard'
          className={location.pathname === '/dashboard' ? 'active-link' : ''}
        >
          Dashboard
        </Link>
        <Link
          to='/add-expense'
          className={location.pathname === '/add-expense' ? 'active-link' : ''}
        >
          Add Expense
        </Link>
        <Link
          to='/add-income'
          className={location.pathname === '/add-income' ? 'active-link' : ''}
        >
          Add Income
        </Link>
        <Link
          to='/combined-list'
          className={
            location.pathname === '/combined-list' ? 'active-link' : ''
          }
        >
          My Finance
        </Link>
        <Link
          to='/expenses'
          className={location.pathname === '/expenses' ? 'active-link' : ''}
        >
          Expense List
        </Link>
        <Link
          to='/incomes'
          className={location.pathname === '/incomes' ? 'active-link' : ''}
        >
          Income List
        </Link>
      </nav>
      <div className='auth-buttons'>
        {token ? (
          <button onClick={logout} className='logout-button'>
            Logout
          </button>
        ) : (
          <>
            <Link to='/login' className='login-button'>
              Login
            </Link>
            <Link to='/register' className='signup-button'>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
