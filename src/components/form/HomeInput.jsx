const HomeInput = ({
    type,
    placeholder,
    label,
    name,
    id,
    onChange,
    required,
    icon,
    style,
    variant = "input",
    textAreaHeight,
  }) => {
    return (
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            id={id}
            onChange={onChange}
            required={required}
            style={style}
          />
        )}
  
export default HomeInput;
  