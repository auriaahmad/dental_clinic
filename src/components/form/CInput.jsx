const CInput = ({
  type,
  placeholder,
  label,
  name,
  id,
  onChange,
  required,
  defaultValue,
  icon,
  style,
  value,
  variant = 'input',
  textAreaHeight,
  imageStyle,
  onIconClick,
}) => {
  return (
    <div className='cInput' style={{ ...style }}>
      {label && <label htmlFor={id}>{label}</label>}
      {variant === 'textarea' ? (
        <textarea
          type={type}
          placeholder={placeholder}
          name={name}
          id={id}
          onChange={onChange}
          required={required}
          style={{ ...textAreaHeight }}
          value={value}
          defaultValue={defaultValue}
        ></textarea>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          id={id}
          onChange={onChange}
          required={required}
          style={style}
          value={value}
          defaultValue={defaultValue}
        />
      )}

      {icon && (
        <img src={icon} alt='' style={imageStyle} onClick={onIconClick} />
      )}
    </div>
  );
};

export default CInput;
