import { Arrays } from "@rithe/utils"
import { insertItem, itemsBetween, itemsNext, itemsPrev, removeItem } from "./helpers"
import { ComputedState, State } from './State'
import { Subscription } from './Subscription'

export class StateCore {

    private _states: State[]
    private _subs: Subscription[]

    constructor() {
        this._states = []
        this._subs = []
    }

    register(state: State) {
        insertItem(this._states, state)
        this._markAndNotify(state)
    }

    unregister(state: State) {
        removeItem(this._states, state)
        this._markAndNotify(state)
    }

    private _markAndNotify(state: State) {
        const states = this._states
        const subs = this._subs
        const pending: State[] = []
        pending.push(state)

        while (pending.length > 0) {
            // mark if current state is not state
            const working = pending.shift()!
            working === state || working.mark()
            // notify subscriptions between current state and next state
            const stateNext = Arrays.first(itemsNext(states, working.position, working.name))
            const subsBetween = itemsBetween(subs, working.position, stateNext?.position, working.name)
            subsBetween.forEach(sub => sub.subscribe())
            // push next state to pending if next state is computed state
            stateNext && stateNext instanceof ComputedState && pending.push(stateNext)
            // push states between current state and next state if they are computed state and depends on current state
            const statesBetween = itemsBetween(states, working.position, stateNext?.position)
            statesBetween.forEach(state => {
                state.depNames.indexOf(working.name) >= 0 && pending.push(state)
            })
        }
    }

    subscribe(sub: Subscription) {
        insertItem(this._subs, sub)
    }

    unsubscribe(sub: Subscription) {
        removeItem(this._subs, sub)
    }

    slice(name: string, position: number[]) {
        const states = this._states
        // find prev state
        const statePrev = Arrays.last(itemsPrev(states, position, name))
        // return if prev state not found or is not dirty
        if (statePrev === undefined || !statePrev.dirty) return statePrev

        // compute dirty state
        this._compute(statePrev)
        return statePrev
    }

    private _compute(state: State) {
        const { name, position } = state
        const prev = this.slice(name, position)?.value
        const deps = state.depNames.map(name => this.slice(name, position)?.value)
        state.compute(prev, ...deps)
    }

}