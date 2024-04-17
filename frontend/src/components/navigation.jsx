import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/authContext.jsx';

const Navigation = () => {
  const { t } = useTranslation();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const resetUser = () => {
    logout();
    navigate('/login');
  };
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-warning bg-opacity-25">
      <div className="container">
        <a className="navbar-brand" href="/">{t('navBar.text')}</a>
        {token && (
          <button
            className="btn btn-primary"
            type="submit"
            onClick={resetUser}
          >
            {t('navBar.exitBtn')}
          </button>
        )}
      </div>

    </nav>
  );
};

export default Navigation;
