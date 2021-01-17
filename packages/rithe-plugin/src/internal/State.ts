
export interface State {
    readonly name: string
    readonly position: number[]
    readonly value: any
    readonly depNames: string[]
    readonly dirty: boolean
    mark(): void
    compute(prev: any, ...deps: any[]): void
}

export class ValueState implements State {
    readonly name: string
    readonly position: number[]
    readonly value: any
    readonly depNames: string[]
    readonly dirty: boolean

    constructor(name: string, position: number[], value: any) {
        this.name = name
        this.position = position
        this.value = value
        this.depNames = []
        this.dirty = false
    }

    mark() {
        // empty
    }

    compute() {
        // empty
    }

}

export class ComputedState implements State {
    readonly name: string
    readonly position: number[]
    readonly computed: (prev: any, ...deps: any[]) => any
    readonly depNames: string[]
    readonly lazy: boolean
    private _dirty: boolean
    private _value: any

    constructor(name: string, position: number[], computed: (prev: any, ...deps: any[]) => any, depNames: string[], lazy: boolean) {
        this.name = name
        this.position = position
        this.computed = computed
        this.depNames = depNames
        this.lazy = lazy
        this._dirty = true
        this._value = undefined
    }

    get dirty(): boolean {
        return this._dirty
    }

    get value(): any {
        return this.lazy ? this._value() : this._value
    }

    mark() {
        this._dirty = true
    }

    compute(prev: any, ...deps: any[]): void {
        this._value = this.lazy ? () => this.computed(prev, ...deps) : this.computed(prev, ...deps)
        this._dirty = false
    }
}
