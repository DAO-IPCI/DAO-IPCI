import _ from 'lodash'
import { LOAD_MODULE } from './actionTypes'

const initialState = {
  modules: [
    // {
    //   address: '0x0020281504ad36a39700414d7cb9fcc6b27d48c3',
    //   lots: [
    //     {
    //       sale_name: 'aaa',
    //       sale_address: '0x2222222222222222',
    //       sale_quantity: 1,
    //       buy_name: 'bbb',
    //       buy_address: '0x33333333333333333',
    //       buy_quantity: 2,
    //       approve_sale_quantity: 2,
    //       approve_buy_quantity: 2,
    //       my: false
    //     }
    //   ]
    // }
  ]
}

export default function market(state = initialState, action) {
  switch (action.type) {
    case LOAD_MODULE: {
      const module = _.find(state.modules, ['address', action.payload.address])
      let modules
      if (module) {
        modules = state.modules.map((item) => {
          if (item.address === action.payload.address) {
            return {
              ...item,
              lots: action.payload.lots
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
