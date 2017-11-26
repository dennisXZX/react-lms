// A simple JavaScript utility for conditionally joining classNames together
import joinClassNames from 'classnames';
import React from 'react';

const Button = ({ children, buttonStyle, buttonType = 'button', ...rest }) => {

  // assign a different button style based on the value of props
  switch (buttonStyle) {
    case 'primary':
      buttonStyle = 'btn-primary';
      break;
    case 'danger':
      buttonStyle = 'btn-danger';
      break;
    default:
      buttonStyle = 'btn-default';
  }

  return (
    <button className={joinClassNames('btn', buttonStyle)} type={buttonType} {...rest}>
      {children}
    </button>
  );
}

export default Button;
