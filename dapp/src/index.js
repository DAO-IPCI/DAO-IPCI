import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import { I18nextProvider } from 'react-i18next';
import configureStore from './config/store'
import { routes } from './config/routes'
import i18n from './config/i18n';

const store = configureStore()

setTimeout(() => {
  render(
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <Router history={hashHistory} routes={routes(store)} />
      </Provider>
    </I18nextProvider>,
    document.getElementById('root')
  )
}, 1500);
