import { ReactNode } from "react"

export class Template {
    readonly name: string
    readonly position: number[]
    readonly predicate: (params: any) => boolean
    readonly render: (params: any, ...states: any[]) => ReactNode
    readonly stateNames: string[]

    constructor(name: string, position: number[], predicate: (params: any) => boolean, render: (params: any, ...states: any[]) => ReactNode, stateNames: string[]) {
        this.name = name
        this.position = position
        this.predicate = predicate
        this.render = render
        this.stateNames = stateNames
    }
}