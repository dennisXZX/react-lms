import classnames from 'classnames';
import React from 'react';

export default function Button({ children, primary, danger, className, buttonType = 'button', ...rest }) {
  let buttonStyle = 'btn-default';
  if (primary) {
    buttonStyle = 'btn-primary';
  }
  if (danger) {
    buttonStyle = 'btn-danger';
  }

  return (
    <button className={classnames('btn', buttonStyle, className)} type={buttonType} {...rest}>
      {children}
    </button>
  );
}
