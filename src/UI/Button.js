// A simple JavaScript utility for conditionally joining classNames together
import joinClassNames from 'classnames';
import React from 'react';

const Button = ({ children, primary, danger, buttonType = 'button', ...rest }) => {

  // assign a different button style based on the value of props
  let buttonStyle = 'btn-default';

  if (primary) {
    buttonStyle = 'btn-primary';
  }
  if (danger) {
    buttonStyle = 'btn-danger';
  }

  return (
    <button className={joinClassNames('btn', buttonStyle)} type={buttonType} {...rest}>
      {children}
    </button>
  );
}

export default Button;
