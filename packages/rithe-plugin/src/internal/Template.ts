export interface Template {
    readonly name: string
    readonly position: number[]
    readonly test: (props: any) => boolean
    readonly render: (props: any, ...states: any[]) => JSX.Element
    readonly stateNames: string[]
}

export class ReservedTemplate implements Template {
    readonly name: string
    readonly position: number[]
    readonly test: (props: any) => boolean
    readonly render: (props: any, ...states: any[]) => JSX.Element
    readonly stateNames: string[]

    constructor(name: string, position: number[], render: (props: any, ...states: any[]) => JSX.Element, depNames: string[]) {
        this.name = name
        this.position = position
        this.test = () => true
        this.render = render
        this.stateNames = depNames
    }
}

export class ConditionalTemplate implements Template {
    readonly name: string
    readonly position: number[]
    readonly test: (props: any) => boolean
    readonly render: (props: any, ...states: any[]) => JSX.Element
    readonly stateNames: string[]

    constructor(name: string, position: number[], predicate: ((props: any) => boolean), render: (props: any, ...states: any[]) => JSX.Element, depNames: string[]) {
        this.name = name
        this.position = position
        this.test = predicate
        this.render = render
        this.stateNames = depNames
    }
}