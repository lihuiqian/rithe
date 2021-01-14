import { positionComparator, stateComparator } from "./comparators"
import { ComputedState, State } from "./State"

export class StateArray implements Iterable<State>{

    readonly states: State[]

    constructor() {
        this.states = []
    }

    *[Symbol.iterator](): Iterator<State, any, undefined> {
        for (const state of this.states) yield state
    }

    add(state: State): void {
        const states = this.states
        for (let i = 0; i < states.length; i++) {
            const cmp = stateComparator(state, states[i])
            if (cmp > 0) continue
            if (cmp === 0) {
                states.splice(i, 1, state)
                return
            }
            if (cmp < 0) {
                states.splice(i, 0, state)
                return
            }
        }
        states.push(state)
    }

    remove(position: number[]): State | undefined {
        const states = this.states
        for (let i = 0; i < states.length; i++) {
            const cmp = positionComparator(position, states[i].position)
            if (cmp === 0) {
                const [result] = states.splice(i, 1)
                return result
            }
        }
        return undefined
    }

    affectedStates(state: State): State[] {
        const states = this.states
        const index = states.indexOf(state)
        return index >= 0 ? this._affectedStates(index, state) : []
    }

    private _affectedStates(index: number, state: State): State[] {
        const states = this.states
        const result = []
        for (let i = index; i < states.length; i++) {
            const followingState = states[i]
            if (followingState.name === state.name) {
                result.push(followingState)
            } else if (followingState instanceof ComputedState && followingState.dependencyNames.indexOf(state.name) >= 0) {
                result.push(...this._affectedStates(i, followingState))
            }
        }
        return result
    }

    previousState(name: string, position: number[]): State | undefined {
        const states = this.states
        let result: State | undefined = undefined
        for (const state of states) {
            if (state.name !== name) continue
            if (positionComparator(state.position, position) >= 0) break
            result = state
        }
        return result
    }

}