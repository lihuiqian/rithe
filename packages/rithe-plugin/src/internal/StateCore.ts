import { stateComparator } from "./comparators"
import { ComputedState, State, ValueState } from './State'
import { StateArray } from "./StateArray"

export class StateCore {

    private _stateArray: StateArray

    constructor() {
        this._stateArray = new StateArray()
    }

    mount(name: string, position: number[], value: any): void
    mount(name: string, position: number[], computed: (prev: any, ...deps: any[]) => any, dependencyNames: string[], lazy: boolean): void
    mount(name: string, position: number[], ...args: any[]): void {
        const stateArray = this._stateArray
        const state = args.length === 1 ? new ValueState(stateArray, name, position, args[0]) : new ComputedState(stateArray, name, position, args[0], args[1], args[2])
        stateArray.add(state)
        this.mark(state)
    }

    unmount(position: number[]) {
        const state: State | undefined = this._stateArray.remove(position)
        state && this.mark(state)
    }

    mark(state: State) {
        const affectedStates = this._stateArray.affectedStates(state)
        for (const affectedState of affectedStates) {
            affectedState.mark()
        }
    }

    calculate(state: State) {
        for (const p of this._stateArray) {
            if (stateComparator(p, state) > 0) break
            p.dirty && p.calculate()
        }
    }

    latest(name: string, position: number[]): State | undefined {
        return this._stateArray.previousState(name, position)
    }
}