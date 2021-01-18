import { createContext } from "react";

export type TemplatePlaceholder = { templates: { render: (param: any, ...states: any[]) => void, stateNames: string[] }[], param: any }
export const RenderContext = createContext<TemplatePlaceholder>({ templates: [], param: undefined })