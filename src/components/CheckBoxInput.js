import React from 'react';

const CheckboxInput = ({ label, name, checked, onChange }) => {
    return (
        <div className="form-group checkbox-group">
            <input
                type="checkbox"
                id={name}
                name={name}
                checked={checked}
                onChange={onChange}
            />
            <label htmlFor={name}>{label}</label>
        </div>
    );
};

export default CheckboxInput;
