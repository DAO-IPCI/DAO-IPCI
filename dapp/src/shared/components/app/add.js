import React from 'react'
import { Field } from 'redux-form'

const renderField = ({
  input, type, label, placeholder, disabled, className, meta: { touched, error }
}) => {
  if (type === 'hidden') {
    return <input {...input} type={type} />
  }
  return (
    <div>
      {label}
      <input
        {...input}
        className={className}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
      />
      {touched && error && error}
    </div>
  )
}

const Form = (props) => {
  const { fields, handleSubmit, submitting } = props

  // {address.touched && address.error ? <div className="alert alert-danger">
  // {address.error}</div> : ''}
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <div className="input-group-addon"><span>DAO address</span></div>
        {fields.map((item, index) => (
          <Field key={index} component={renderField} {...item} type="text" className="form-control" />
        ))}
        <div className="input-group-btn">
          <button className="btn btn-default" type="submit" disabled={submitting}>{submitting ? '...' : 'Go!'}</button>
        </div>
      </div>
    </form>
  )
}

export default Form
