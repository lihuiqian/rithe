export interface Template {
    readonly name: string
    readonly position: number[]
    readonly test: (props: any) => boolean
    readonly render: (props: any, ...states: any[]) => JSX.Element
    readonly stateNames: string[]
}

export class ConditionalTemplate implements Template {
    readonly name: string
    readonly position: number[]
    readonly test: (props: any) => boolean
    readonly render: (props: any, ...states: any[]) => JSX.Element
    readonly stateNames: string[]

    constructor(name: string, position: number[], predicate: ((props: any) => boolean) | undefined, render: (props: any, ...states: any[]) => JSX.Element, depNames: string[]) {
        this.name = name
        this.position = position
        this.test = predicate ?? (() => true)
        this.render = render
        this.stateNames = depNames
    }
}