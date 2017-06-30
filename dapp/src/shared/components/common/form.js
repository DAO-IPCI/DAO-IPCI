import React from 'react'
import { Field } from 'redux-form'
import _ from 'lodash'
import { translate } from 'react-i18next'
import Auto from './auto'
import Spin from './spin'

const renderField = ({
  input, type, label, placeholder, disabled, options, meta: { touched, error }
}) => {
  if (type === 'hidden') {
    return <input {...input} type={type} />
  }
  if (type === 'checkbox') {
    return <input {...input} type={type} />
  }
  let element;
  if (type === 'autocomplete') {
    element = <Auto field={input} placeholder={placeholder} />
  } else if (type === 'select') {
    element = (
      <select className="form-control" {...input}>
        {options.map((item, i) => <option key={i} value={item.value}>{item.name}</option>)}
      </select>
    )
  } else {
    element = <input
      {...input}
      type={(!_.isEmpty(type)) ? type : 'text'}
      placeholder={placeholder}
      disabled={disabled}
      className="form-control"
    />
  }
  return (
    <div className="form-group">
      <span className="control-label">{label}</span>
      {element}
      {touched && error && error}
    </div>
  )
}

const Form = (props) => {
  const { fields, output, handleSubmit, submitting, error } = props

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((item, index) => {
        if (item.name === 'isIpfs') {
          return null;
        }
        return <Field key={index} component={renderField} {...item} />
      })}
      {output !== '' && !_.isUndefined(output) &&
        <div><b>{props.t('result')}</b>:<div dangerouslySetInnerHTML={{ __html: output }} /></div>
      }
      <div className="row">
        <div className="col-md-2 col-md-offset-5">
          <div className="form-group">
            <div className="text-center">
              <div className="form-group">
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-default"
                    disabled={submitting}
                  >{submitting ? <Spin btn /> : props.t('submit')}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {_.find(fields, { name: 'isIpfs' }) &&
          <div className="col-md-2">
            <div className="checkbox" style={{ textAlign: 'center' }}>
              <span
                style={{
                  minHeight: 20,
                  paddingLeft: 20,
                  marginBottom: '0',
                  fontWeight: '400',
                  display: 'inline-block',
                  maxWidth: '100%'
                }}
              >
                <Field component={renderField} type="checkbox" {..._.find(fields, { name: 'isIpfs' })} />
                {props.t('isSaveIpfs')}
              </span>
            </div>
          </div>
        }
      </div>
      {error && <div>{error}</div>}
    </form>
  )
}

export default translate()(Form)
