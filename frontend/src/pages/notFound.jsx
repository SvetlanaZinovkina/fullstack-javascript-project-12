import React from 'react';
import { useTranslation } from 'react-i18next';
import notFoundImage from '../images/404image.jpg';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <h1 className="h4 text-muted">{t('notFound.notPage')}</h1>
      <p className="text-muted">
        {t('notFound.mainLink')}
        {' '}
        <a
          href="/"
        >
          {t('notFound.textMuted')}
        </a>
      </p>
      <img
        alt={t('notFound.notPage')}
        className="img-not-found img-fluid h-25"
        src={notFoundImage}
      />
    </div>
  );
};

export default NotFound;
