import React, { createContext, useReducer, useContext } from 'react'
import { bindActionCreators } from '../../../context/utils'
import { actionCreators, coffeePageReducer, initialState } from './reducer'

// Create a separate context for state and dispatch.
// This gives better performance rather than having a single provider with a value
// that is a new object each time i.e. value={{ state, dispatch }}
const CoffeeStateContext = createContext()
const CoffeeDispatchContext = createContext()

// A single provider which actually gives access to both our state and dispatch contexts.
export const CoffeeContextProvider = ({ children, coffeeShops }) => {
  const initFunction = () => ({ ...initialState, coffeeShops })
  const [state, dispatch] = useReducer(
    coffeePageReducer,
    initialState,
    initFunction
  )

  return (
    <CoffeeStateContext.Provider value={state}>
      <CoffeeDispatchContext.Provider value={dispatch}>
        {children}
      </CoffeeDispatchContext.Provider>
    </CoffeeStateContext.Provider>
  )
}

// Consumer to access the state and dispatch contexts.
export const useCoffeeContext = () => {
  const [state, dispatch] = [
    useContext(CoffeeStateContext),
    useContext(CoffeeDispatchContext),
  ]

  // Wrap each action creator with dispatch.
  const actionsWithDispatch = bindActionCreators(actionCreators, dispatch)

  return {
    actions: actionsWithDispatch,
    state,
  }
}
