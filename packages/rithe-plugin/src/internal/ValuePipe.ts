import Pipe from "./Pipe"
import Pipeline from "./Pipeline"

class ValuePipe implements Pipe {
    readonly name: string
    readonly position: number[]
    private _value: any
    private _dirty: boolean

    constructor(_: Pipeline, name: string, position: number[], value: any) {
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

export default ValuePipe