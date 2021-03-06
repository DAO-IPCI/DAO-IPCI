import { LOAD, LOAD_START, ADD_MODULE } from './actionTypes'

const initialState = {
  name: '',
  address: '',
  load: false,
  blocks: []
}

export default function dao(state = initialState, action) {
  switch (action.type) {
    case LOAD_START:
      return { ...state, load: true }

    case LOAD:
      return { ...action.payload, load: false }

    case ADD_MODULE: {
      const blocks = state.blocks.map((item) => {
        if (item.type === action.payload.type) {
          return {
            ...item,
            modules: [...item.modules, {
              name: action.payload.name,
              address: action.payload.address
            }]
          }
        }
        return item
      })
      return { ...state, blocks }
    }

    default:
      return state;
  }
}
