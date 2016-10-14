import _ from 'lodash'
import { LOAD_MODULE } from './actionTypes'

const initialState = {
  modules: [
    // {
    //   // name: 'asdasd',
    //   address: '0444444444444444',
        //  funcs: {
        //    nameFunc: {
        //      input: {
        //        a: '',
        //        b: '',
        //      },
        //      output: ???
        //    }
        //  },
    //   groups: [
    //     {
    //       name: 'asd',
    //       members: ['011111111111', '0222222222222222222']
    //     }
    //   ]
    // }
  ]
}

export default function acl(state = initialState, action) {
  switch (action.type) {
    case LOAD_MODULE: {
      const module = _.find(state.modules, ['address', action.payload.address])
      let modules
      if (module) {
        modules = state.modules.map((item) => {
          if (item.address === action.payload.address) {
            return {
              ...item,
              groups: action.payload.groups
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
