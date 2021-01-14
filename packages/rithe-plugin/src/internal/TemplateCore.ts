import { ReactNode } from "react"
import { Template } from './Template'
import { TemplateArray } from "./TemplateArray"

export class TemplateCore {

    private _templateArray: TemplateArray

    constructor() {
        this._templateArray = new TemplateArray()
    }

    mount(name: string, position: number[], predicate: (params: any) => boolean, render: (params: any, ...states: any[]) => ReactNode, stateNames: string[]): void {
        const templateArray = this._templateArray
        const template = new Template(name, position, predicate, render, stateNames)
        templateArray.add(template)
    }

    unmount(position: number[]) {
        this._templateArray.remove(position)
    }

    latest(name: string, position: number[], params: any): Template | undefined {
        return this._templateArray.previousTemplate(name, position, params)
    }
}