import { FLASH_MESSAGE, SET_DAO_ADDRESS, SET_ROLE, SET_LANGUAGE } from './actionTypes'

const initialState = {
  title: 'dApp DAO IPCI',
  flash_message: '',
  dao_address: '',
  role: '',
  language: 'en'
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case FLASH_MESSAGE:
      return { ...state, flash_message: action.payload }

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
