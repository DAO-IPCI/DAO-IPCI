import { ADD, LOAD } from './actionTypes'

const initialState = {
  items: []
}

export default function dao(state = initialState, action) {
  switch (action.type) {
    case ADD:
      return { ...state, items: [action.payload, ...state.items] }

    case LOAD:
      return { ...state, items: action.payload }

    default:
      return state;
  }
}
