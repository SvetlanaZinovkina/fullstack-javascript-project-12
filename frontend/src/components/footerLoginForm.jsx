import React from 'react';
import { useTranslation } from 'react-i18next';

const FooterLoginForm = () => {
  const { t } = useTranslation();
  return (
    <div className="card-footer p-4">
      <div className="text-center">
        <span>{t('loginForm.footer.textNoAccount')}</span>
        {' '}
        <a href="/signup">{t('loginForm.footer.signUp')}</a>
      </div>
    </div>
  );
};

export default FooterLoginForm;
