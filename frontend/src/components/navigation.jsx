import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const Navigation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const resetUser = () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-warning bg-opacity-25">
      <div className="container">
        <a className="navbar-brand" href="/">{t('navBar.text')}</a>
        {token && <button className="btn btn-primary" type="submit"
                          onClick={resetUser}>{t('navBar.exitBtn')}</button>}
      </div>

    </nav>
  );
};

export default Navigation;
