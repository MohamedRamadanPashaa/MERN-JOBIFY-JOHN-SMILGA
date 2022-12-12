const FormRow = ({ value, name, handleChange, labelText, type }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        id={name}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
};

export default FormRow;
