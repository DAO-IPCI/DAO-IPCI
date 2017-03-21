import { ADD, LOAD } from './actionTypes'

const initialState = {
  isLoad: false,
  items: []
}

export default function txs(state = initialState, action) {
  switch (action.type) {
    case ADD:
      return { ...state, items: [action.payload, ...state.items] }

    case LOAD:
      return { ...state, isLoad: action.payload, items: (action.payload) ? [] : [...state.items] }

    default:
      return state;
  }
}
