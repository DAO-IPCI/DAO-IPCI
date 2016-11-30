import _ from 'lodash'
import { LOAD_MODULE, CALL_FUNC } from './actionTypes'

const initialState = {
  modules: [
    // {
    //   name: 'asdasd',
    //   address: '0x697b0ac5112a9eace5164e9a76b1e629ded5a990',
    //   totalSupply: '100DF',
    //   balance: '100DF'
    // }
  ]
}

export default function token(state = initialState, action) {
  switch (action.type) {
    case LOAD_MODULE: {
      const module = _.find(state.modules, ['address', action.payload.address])
      let modules
      if (module) {
        modules = state.modules.map((item) => {
          if (item.address === action.payload.address) {
            return {
              ...item,
              name: action.payload.name,
              totalSupply: action.payload.totalSupply,
              balance: action.payload.balance
            }
          }
          return item
        })
      } else {
        modules = [
          ...state.modules,
          action.payload
        ]
      }
      return { ...state, modules }
    }

    case CALL_FUNC: {
      const modules = state.modules.map((item) => {
        if (item.address === action.payload.address) {
          if (_.has(item, 'funcs')) {
            return {
              ...item,
              funcs: {
                ...item.funcs,
                [action.payload.action]: {
                  input: action.payload.input,
                  output: action.payload.output
                }
              }
            }
          }
          return {
            ...item,
            funcs: {
              [action.payload.action]: {
                input: action.payload.input,
                output: action.payload.output
              }
            }
          }
        }
        return item
      })
      return { ...state, modules }
    }

    default:
      return state;
  }
}
