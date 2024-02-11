import React from 'react';
import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const { t } = useTranslation();
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-warning bg-opacity-25">
      <div className="container"><a className="navbar-brand" href="/">{t('navBar.text')}</a></div>
    </nav>
  );
};

export default Navigation;
