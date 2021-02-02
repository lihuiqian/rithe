export interface Template {
    readonly name: string
    readonly position: number[]
    readonly reserved: boolean
    readonly test: (props: any) => boolean
    readonly render: (props: any, ...states: any[]) => JSX.Element
    readonly stateNames: string[]
}

const defaultPredicate = () => true

export class ReservedTemplate implements Template {
    readonly name: string
    readonly position: number[]
    readonly reserved: boolean
    readonly test: (props: any) => boolean
    readonly render: (props: any, ...states: any[]) => JSX.Element
    readonly stateNames: string[]

    constructor(name: string, position: number[], render: (props: any, ...states: any[]) => JSX.Element, depNames: string[]) {
        this.name = name
        this.position = position
        this.reserved = true
        this.test = defaultPredicate
        this.render = render
        this.stateNames = depNames
    }
}

export class ConditionalTemplate implements Template {
    readonly name: string
    readonly position: number[]
    readonly reserved: boolean
    readonly test: (props: any) => boolean
    readonly render: (props: any, ...states: any[]) => JSX.Element
    readonly stateNames: string[]

    constructor(name: string, position: number[], predicate: ((props: any) => boolean) | undefined, render: (props: any, ...states: any[]) => JSX.Element, depNames: string[]) {
        this.name = name
        this.position = position
        this.reserved = false
        this.test = predicate ?? defaultPredicate
        this.render = render
        this.stateNames = depNames
    }
}