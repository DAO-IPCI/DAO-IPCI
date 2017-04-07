import React from 'react'

const Form = (props) => {
  const {
    fields: { address },
    handleSubmit,
    submitting
  } = props

  return (<form onSubmit={handleSubmit}>
    <div className="input-group">
      <div className="input-group-addon"><span>DAO address</span></div>
      <input type="text" className="form-control" {...address} />
      <div className="input-group-btn">
        <button className="btn btn-default" type="submit" disabled={submitting}>{submitting ? '...' : 'Go!'}</button>
      </div>
    </div>
    {address.touched && address.error ? <div className="alert alert-danger">{address.error}</div> : ''}
  </form>)
}

export default Form
