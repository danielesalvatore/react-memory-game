import React from 'react';

export const inputText = ({input, meta, placeholder}) =>
    <div className="form-group">
        <label htmlFor="first_name">{placeholder}</label>
        <input className="form-control" {...input} placeholder={placeholder}/>
        {meta.error && meta.touched && <span className="error-message">{meta.error}</span>}
    </div>;

export const inputPassword = ({input, meta, placeholder}) =>
    <div className="form-group">
        <label htmlFor="first_name">{placeholder}</label>
        <input type="password" className="form-control" {...input} placeholder={placeholder}/>
        {meta.error && meta.touched && <span className="error-message">{meta.error}</span>}
    </div>;
