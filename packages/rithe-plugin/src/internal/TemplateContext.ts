import { createContext } from 'react'
import { TemplateCore } from './TemplateCore'

export const TemplateContext = createContext<TemplateCore>(new TemplateCore())