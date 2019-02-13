import { RUN_LOAD, LOAD, SET_DATA_HASH, SET_DATA, SET_FACTOR_HASH, SET_FACTOR } from './actionTypes'

const initialState = {
  isLoad: false,
  errorLoad: false,
  account: '',
  token: '',
  factor: 0,
  factorHash: '',
  dataHash: '',
  info: {
    countDevice: 0,
    dateStart: '',
    dateEnd: '',
  },
  result: {
    wt: 0,
    mwt: 0,
    tco2: 0,
  }
}

export default function chile(state = initialState, action) {
  switch (action.type) {
    case RUN_LOAD:
      return { ...state, isLoad: true }

    case LOAD:
      return { ...state, isLoad: false, ...action.payload }

    case SET_DATA_HASH:
      return { ...state, dataHash: action.payload }

    case SET_DATA:
      return {
        ...state,
        result: {
          ...state.result,
          wt: action.payload,
          mwt: action.payload / 1000,
          tco2: state.factor * (action.payload / 1000)
        }
      }

    case SET_FACTOR_HASH:
      return { ...state, factorHash: action.payload }

    case SET_FACTOR:
      return {
        ...state,
        factor: action.payload,
        result: { ...state.result, tco2: state.result.mwt * action.payload }
      }

    default:
      return state;
  }
}
