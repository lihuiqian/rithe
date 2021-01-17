import { createContext } from 'react'
import { StateCore } from './StateCore'

export const StateContext = createContext<StateCore>(new StateCore())