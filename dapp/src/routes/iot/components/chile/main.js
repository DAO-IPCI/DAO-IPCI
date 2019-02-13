import React from 'react'
import { translate } from 'react-i18next'
import { Link } from 'react-router'
import _ from 'lodash'
import Form from '../../containers/formChile'

// {t('countDevices', { count: props.info.countDevice })} |&nbsp;
const Main = (props) => {
  const { t } = props
  return <div>
    <div className="row">
      <div className="col-md-8">
        <p>{t('yourAccount')} <span className="label label-success">{props.account}</span></p>
        {props.errorLoad &&
          <div>
            <div className="alert alert-info">
              {t('errorLoad')}
            </div>
          </div>
        }
        {props.info.check &&
          <div>
            <p>
              <span dangerouslySetInnerHTML={{ __html: t('date', { from: props.info.dateStart, to: props.info.dateEnd }) }} />
            </p>
            <div className="alert alert-info">
              {t('checkOk')}
            </div>
          </div>
        }
        {!props.errorLoad && !props.info.check &&
          <div>
            <p>
              Date {t('from')} <b>{props.info.dateStart}</b> {t('to')} <b>{props.info.dateEnd}</b>
            </p>
            <p>
              <span dangerouslySetInnerHTML={{ __html: t('inMounth', { wt: props.result.wt }) }} /> =&nbsp;
              <b>{props.result.mwt}</b> {t('MWt')}
            </p>
            <p>
              {t('fileData')}:&nbsp;
              <select value={props.dataHash} onChange={props.onChangeData}>
                <option value="">---</option>
                {props.filesData.map((item, index) =>
                  <option key={index} value={item.hash}>{item.name}</option>
                )}
              </select>
            </p>
            <p>
              {t('fileFactor')}:&nbsp;
              <select value={props.factorHash} onChange={props.onChangeFactor}>
                <option value="">---</option>
                {props.filesFactor.map((item, index) =>
                  <option key={index} value={item.hash}>{item.name}</option>
                )}
              </select>
            </p>
            {(props.factor > 0 && props.result.tco2 > 0) &&
              <p>
                {t('emission')} СО2 {props.result.mwt} * {props.factor} =&nbsp;
                <b>{props.emission}</b> {t('tCO2')}
              </p>
            }
          </div>
        }
      </div>
      <div className="col-md-4">
        <div className="panel panel-default">
          <div className="panel-body">
            <p>1 {t('carbonCredit')} = 1 {t('tCO2')}</p>
            {props.factor > 0 &&
              <p>{t('factort')} <b>{props.factor}</b> {t('tCO2')}/{t('MWt')}</p>
            }
          </div>
        </div>
      </div>
    </div>
    {(props.info.check === false && !_.isEmpty(props.token)) &&
      <div>
        <hr />
        <h2>Emission token</h2>
        <p><b>{props.token.name}</b>: <Link to={'/dao/token-acl/' + props.token.address}>{props.token.address}</Link> ({props.token.balance})</p>
        {props.emission <= 0 ?
          <div className="alert alert-danger">
            {t('errMin')} {1 / props.token.decimals}
          </div>
          :
          <Form address={props.token.address} action={'emission'} input={{ value: props.emission }} />
        }
      </div>
    }
  </div>
}

export default translate(['iot'])(Main)
