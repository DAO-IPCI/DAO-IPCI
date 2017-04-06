import React from 'react'

const Form = (props) => {
  const {
    fields: { address },
    handleSubmit,
    submitting
  } = props

  return (<form onSubmit={handleSubmit}>
    <div className="input-group">
      <input type="text" className="form-control" placeholder="Адрес DAO" {...address} />
      <span className="input-group-btn">
        <input
          type="submit"
          className="btn btn-default"
          disabled={submitting}
          value={submitting ? '...' : 'Открыть'}
        />
      </span>
    </div>
    {address.touched && address.error ? <div className="alert alert-danger">{address.error}</div> : ''}
  </form>)
}

export default Form
