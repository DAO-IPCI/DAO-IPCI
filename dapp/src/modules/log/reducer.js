import { ADD, LOAD, CLEAR } from './actionTypes'

const initialState = {
  items: []
}

export default function dao(state = initialState, action) {
  switch (action.type) {
    case ADD:
      return { ...state, items: [action.payload, ...state.items] }

    case LOAD:
      return { ...state, items: action.payload }

    case CLEAR:
      return { ...state, items: [] }

    default:
      return state;
  }
}
