import React from 'react';

const SMTextInput = (props) => {
    const {
        name,
        id,
        value,
        type,
        onChange,
        onBlur,
        className,
        errors,
        touched,
        label,
        placeholder = ''
    } = props;

    return (
        <>
            <label htmlFor={id} className="form-label">{label}</label>
            <input
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className={touched[name] && errors[name] ? `is-invalid ${className} form-control` : `${className} form-control`}
                onBlur={onBlur}
                type={type}
                placeholder={placeholder}
            />
            {touched[name] && errors[name] ? (
                <div className="invalid-feedback" id={`${id}-invalid`}>
                    {errors[name]}
                </div>
            ) : null}
        </>
    );
};

export default SMTextInput;