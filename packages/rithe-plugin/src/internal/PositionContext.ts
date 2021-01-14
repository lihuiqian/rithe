import { createContext } from "react"

export type PluginPosition = number[]
export const PositionContext = createContext<PluginPosition>([])