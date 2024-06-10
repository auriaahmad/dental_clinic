import React from 'react';
import { twMerge } from 'tailwind-merge';

const FWButton = ({
  title,
  icon,
  variant,
  type,
  onClick,

  style,
  className,
}) => {
  return (
    <button
      className={twMerge(`fWButton_${variant}`, className)}
      type={type}
      onClick={onClick}
      style={style}
    >
      {icon && <img src={icon} alt='' />}
      {title}
    </button>
  );
};

export default FWButton;
