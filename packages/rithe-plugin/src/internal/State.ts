import { StateArray } from "./StateArray"

export interface State {
    readonly name: string
    readonly position: number[]
    readonly value: any
    readonly dirty: boolean
    mark(): void
    calculate(): void
}

export class ValueState implements State {
    readonly name: string
    readonly position: number[]
    private _value: any
    private _dirty: boolean

    constructor(_: StateArray, name: string, position: number[], value: any) {
        this.name = name
        this.position = position
        this._value = value
        this._dirty = true
    }

    get value(): any {
        return this._value
    }

    get dirty(): boolean {
        return this._dirty
    }

    mark(): void {
        this._dirty = true
    }

    calculate() {
        this._dirty = false
    }
}

export class ComputedState implements State {
    readonly name: string
    readonly position: number[]
    readonly computed: (prev: any, ...deps: any[]) => any
    readonly dependencyNames: string[]
    readonly lazy: boolean
    private _dirty: boolean
    private _value: any
    private _stateArray: StateArray

    constructor(stateArray: StateArray, name: string, position: number[], computed: (prev: any, ...deps: any[]) => any, dependencyNames: string[], lazy: boolean) {
        this.name = name
        this.position = position
        this.computed = computed
        this.dependencyNames = dependencyNames
        this.lazy = lazy
        this._dirty = true
        this._value = undefined
        this._stateArray = stateArray
    }

    get dirty(): boolean {
        return this._dirty
    }

    get value(): any {
        return this.lazy ? this._value() : this._value
    }

    mark(): void {
        this._dirty = true
    }

    calculate(): void {
        const stateArray = this._stateArray
        const { name, position, dependencyNames, computed } = this
        const previousState = stateArray.previousState(name, position)
        const dependencyStates = dependencyNames.map(dependencyName => stateArray.previousState(dependencyName, position))
        const prev = previousState?.value
        const deps = dependencyStates.map(dependencyState => dependencyState?.value)
        this._value = this.lazy ? () => computed(prev, ...deps) : computed(prev, ...deps)
        this._dirty = false
    }
}
