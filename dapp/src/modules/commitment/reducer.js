import _ from 'lodash'
import { LOAD_MODULE } from './actionTypes'

const initialState = {
  modules: [
    // {
    //   address: '0x697b0ac5112a9eace5164e9a76b1e629ded5a990',
    //   token: '0x697b0ac5112a9eace5164e9a76b1e629ded5a990',
    //   holder: '0x697b0ac5112a9eace5164e9a76b1e629ded5a990',
    //   value: 10,
    //   limit: 10,
    //   percentage: 10
    // }
  ]
}

export default function commitment(state = initialState, action) {
  switch (action.type) {
    case LOAD_MODULE: {
      const module = _.find(state.modules, ['address', action.payload.address])
      let modules
      if (module) {
        modules = state.modules.map((item) => {
          if (item.address === action.payload.address) {
            return {
              ...item,
              token: action.payload.token,
              holder: action.payload.holder,
              value: action.payload.value,
              limit: action.payload.limit,
              percentage: action.payload.percentage
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

    default:
      return state;
  }
}
