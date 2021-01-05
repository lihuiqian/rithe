import { createContext } from "react"

export type PluginPosition = number[]
const PositionContext = createContext<PluginPosition>([])

export default PositionContext