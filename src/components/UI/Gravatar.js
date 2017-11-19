import React from 'react';
import gravatarUrl from 'gravatar-url';

const Gravatar = ({ email, size = 100, style, ...rest }) => {
  return (
    <img
      className="img-circle gravatar"
      src={gravatarUrl(email, { size })}
      alt="gravatar"
      style={{ ...style, width: size, height: size }}
      {...rest}
    />
  );
}

export default Gravatar;
