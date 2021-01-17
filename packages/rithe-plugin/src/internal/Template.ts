
export interface Template {
    readonly name: string
    readonly position: number[]
    readonly test: (param: any) => boolean
    readonly render: (param: any, ...states: any[]) => JSX.Element
    readonly stateNames: string[]
}

export class ConditionalTemplate implements Template {
    readonly name: string
    readonly position: number[]
    readonly test: (param: any) => boolean
    readonly render: (param: any, ...states: any[]) => JSX.Element
    readonly stateNames: string[]

    constructor(name: string, position: number[], predicate: (params: any) => boolean, render: (params: any, ...states: any[]) => JSX.Element, depNames: string[]) {
        this.name = name
        this.position = position
        this.test = predicate
        this.render = render
        this.stateNames = depNames
    }
}