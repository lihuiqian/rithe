import Pipe from "./Pipe"
import Pipeline from "./Pipeline"

class ComputedPipe implements Pipe {
    readonly name: string
    readonly position: number[]
    readonly computed: (prev: any, ...deps: any[]) => any
    readonly dependencyNames: string[]
    readonly lazy: boolean
    private _dirty: boolean
    private _value: any
    private _pipeline: Pipeline

    constructor(pipeline: Pipeline, name: string, position: number[], computed: (prev: any, ...deps: any[]) => any, dependencyNames: string[], lazy: boolean) {
        this.name = name
        this.position = position
        this.computed = computed
        this.dependencyNames = dependencyNames
        this.lazy = lazy
        this._dirty = true
        this._value = undefined
        this._pipeline = pipeline
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
        const pipeline = this._pipeline
        const { name, position, dependencyNames, computed } = this
        const previousPipe = pipeline.previousPipe(name, position)
        const dependencyPipes = dependencyNames.map(dependencyName => pipeline.previousPipe(dependencyName, position))
        const prev = previousPipe?.value
        const deps = dependencyPipes.map(dependencyPipe => dependencyPipe?.value)
        this._value = this.lazy ? () => computed(prev, ...deps) : computed(prev, ...deps)
        this._dirty = false
    }

}

export default ComputedPipe