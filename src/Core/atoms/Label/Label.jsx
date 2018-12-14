/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import PropTypes from 'prop-types';

const Label = ({
  text,
  forProp,
  color,
}) => {
  const textColor = color ? ` text-${color}` : '';
  const classList = `${textColor}`;

  return (
    <label className={classList} htmlFor={forProp}>{text}</label>
  );
};

Label.propTypes = {
  text: PropTypes.string.isRequired,
  forProp: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Label;
