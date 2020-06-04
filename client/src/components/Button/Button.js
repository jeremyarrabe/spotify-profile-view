import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = (props) => {
  const { title, link, modifier, onClick } = props;
  return (
    <div>
      <a href={link} className={`button__${modifier}`} onClick={onClick}>
        {title}
      </a>
    </div>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  modifier: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  link: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  onClick: PropTypes.any,
};

export default Button;
