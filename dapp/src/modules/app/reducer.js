import { SET_DAO_ADDRESS, SET_ROLE, SET_LANGUAGE, SET_MY_BALANCE, SET_BILLING_BALANCE, SET_LOCK_APP } from './actionTypes'

const initialState = {
  title: 'dApp DAO IPCI',
  dao_address: '',
  role: '',
  language: 'en',
  billingBalance: 0,
  lockApp: false,
  myBalance: 0
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case SET_BILLING_BALANCE:
      return { ...state, billingBalance: action.payload }

    case SET_MY_BALANCE:
      return { ...state, myBalance: action.payload }

    case SET_LOCK_APP:
      return { ...state, lockApp: action.payload }

    case SET_DAO_ADDRESS:
      return { ...state, dao_address: action.payload }

    case SET_ROLE:
      return { ...state, role: action.payload }

    case SET_LANGUAGE:
      return { ...state, language: action.payload }

    default:
      return state;
  }
}
