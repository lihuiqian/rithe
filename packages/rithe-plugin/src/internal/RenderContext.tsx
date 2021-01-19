import { createContext } from "react";

export type TemplatePlaceholder = { templates: { render: (props: any, ...states: any[]) => void, stateNames: string[] }[], props: any }
export const RenderContext = createContext<TemplatePlaceholder>({ templates: [], props: undefined })