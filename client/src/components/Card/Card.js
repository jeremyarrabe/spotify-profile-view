import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Card.scss';

const Card = (props) => {
  const { cover, title, description, type, id } = props;
  return (
    <Link
      to={type === 'track' ? `/tracks/${id}` : '/artists'}
      className="card"
      style={{ textDecoration: 'none' }}
    >
      <div className="card__container">
        <img className="card__image" src={cover} alt="card" />
        <div className="card__details">
          <h3 className="card__title">{title}</h3>
          <p className="card__description">{description}</p>
        </div>
      </div>
    </Link>
  );
};

Card.propTypes = {
  cover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Card;
