import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../shared/containers/app'
import NotFound from '../shared/components/app/notFound'
import { Start } from '../routes/start'
import * as Operator from '../routes/operator'
import * as Issuer from '../routes/issuer'
import * as Auditor from '../routes/auditor'
import * as Complier from '../routes/complier'
import * as User from '../routes/user'
import * as Txs from '../routes/txs'
import * as Dao from '../routes/dao'
import { setRole } from '../modules/app/actions'

export const routes = store =>
  (<div>
    <Route path="/" component={App}>
      <IndexRoute component={Start} />
      <Route path="/operator" component={Operator.Page} onEnter={() => { store.dispatch(setRole('operator')) }}>
        <IndexRoute component={Operator.Main} />
      </Route>
      <Route path="/issuer" component={Issuer.Page} onEnter={() => { store.dispatch(setRole('issuer')) }}>
        <IndexRoute component={Issuer.Main} />
      </Route>
      <Route path="/auditor" component={Auditor.Page} onEnter={() => { store.dispatch(setRole('auditor')) }}>
        <IndexRoute component={Auditor.Main} />
      </Route>
      <Route path="/complier" component={Complier.Page} onEnter={() => { store.dispatch(setRole('complier')) }}>
        <IndexRoute component={Complier.Main} />
      </Route>
      <Route path="/user" component={User.Page} onEnter={() => { store.dispatch(setRole('user')) }}>
        <IndexRoute component={User.Main} />
      </Route>
      <Route path="/txs" component={Txs.Page}>
        <IndexRoute component={Txs.Main} />
      </Route>
      <Route path="/dao">
        <Route path="create/:module" component={Dao.CreateModule} />
        <Route path="link/:module(/:address)" component={Dao.LinkModule} />
        <Route path=":module/:address" component={Dao.Module} />
        <Route path=":module/:action/:address(/:param)" component={Dao.Action} />
      </Route>
    </Route>
    <Route path="*" component={NotFound} />
  </div>)
