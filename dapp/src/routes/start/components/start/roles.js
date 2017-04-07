import React from 'react'
import i18next from 'i18next'

const Roles = (props) => {
  const {
    handleSubmit,
    handleChange,
    role
  } = props

  return (
    <div className="col-md-4 col-md-offset-4 box">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <select className="form-control" required="" value={role} onChange={handleChange}>
            <optgroup label="Select type of interface">
              <option value="operator">{i18next.t('operator')}</option>
              <option value="issuer">{i18next.t('issuer')}</option>
              <option value="auditor">{i18next.t('auditor')}</option>
              <option value="complier">{i18next.t('complier')}</option>
              <option value="user">{i18next.t('user')}</option>
            </optgroup>
          </select>
        </div>
        <button className="btn btn-primary btn-block btn-lg" type="submit">Go</button>
      </form>
    </div>
  )
}

export default Roles
