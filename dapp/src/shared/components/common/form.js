import React, { PropTypes } from 'react'
import _ from 'lodash'
import { translate } from 'react-i18next'
import Auto from './auto'
import Spin from './spin'

const Form = (props) => {
  const {
    fields,
    handleSubmit,
    error,
    submitting,
    labels,
    placeholders,
    disableds,
    selects,
    autocomplete,
    output
  } = props

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(fields).map((name, index) => {
        if (name === 'isIpfs') {
          return null;
        }
        const field = fields[name]
        return (
          <div key={index} className="form-group">
            <span className="control-label">{labels[index]}</span>
            {_.has(selects, name) ?
              <select className="form-control" {...field} value={field.value || ''}>
                {selects[name].map((item, i) =>
                  <option key={i} value={item.value}>{item.name}</option>)}
              </select>
              :
              <div>
                {_.has(autocomplete, name) ?
                  <Auto field={field} placeholder={(_.has(placeholders, index)) ? placeholders[index] : ''} />
                  :
                  <input
                    type="text"
                    className="form-control"
                    placeholder={(_.has(placeholders, index)) ? placeholders[index] : ''}
                    disabled={(_.has(disableds, index) && disableds[index] === true) ? 'disabled' : ''}
                    {...field}
                  />
                }
              </div>
            }
            {field.touched && field.error ? field.error : ''}
          </div>
        )
      })}
      {output !== '' &&
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
        {_.has(fields, 'isIpfs') &&
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
                <input
                  type="checkbox"
                  {...fields.isIpfs}
                />
                {props.t('isSaveIpfs')}
              </span>
              {fields.isIpfs.touched && fields.isIpfs.error ? fields.isIpfs.error : ''}
            </div>
          </div>
        }
      </div>
      {error && <div>{error}</div>}
    </form>
  )
}

Form.propTypes = {
  labels: PropTypes.array.isRequired,
  placeholders: PropTypes.array,
  disableds: PropTypes.array,
  autocomplete: PropTypes.object,
  output: PropTypes.string
}
Form.defaultProps = {
  autocomplete: {},
  output: ''
};

export default translate()(Form)
