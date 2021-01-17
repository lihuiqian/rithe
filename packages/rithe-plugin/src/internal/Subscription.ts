export class Subscription {
    readonly name: string
    readonly position: number[]
    private _subscribe?: () => void

    constructor(name: string, position: number[]) {
        this.name = name
        this.position = position
    }

    set subscribe(subscribe: () => void) {
        this._subscribe = subscribe
    }

    get subscribe(): () => void {
        return this._subscribe ?? (() => {/**/ })
    }

}