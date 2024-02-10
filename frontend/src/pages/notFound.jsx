import React from 'react';
import notFoundImage from '../images/404image.jpg';

const NotFound = () => (
  <div className="text-center">
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">
      Но вы можете перейти
      {' '}
      <a
        href="/"
      >
        на главную страницу
      </a>
    </p>
    <img
      alt="Страница не найдена"
      className="img-not-found img-fluid h-25"
      src={notFoundImage}
    />
  </div>
);

export default NotFound;
