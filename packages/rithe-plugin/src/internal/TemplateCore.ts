import { Comparators, iter } from "@rithe/utils"
import { insertItem, itemsNext, itemsPrev, removeItem } from "./helpers"
import { Subscription } from "./Subscription"
import { Template } from './Template'

export class TemplateCore {

    private _templates: Template[]
    private _subs: Subscription[]

    constructor() {
        this._templates = []
        this._subs = []
    }

    register(template: Template) {
        insertItem(this._templates, template)
        this._nofity(template)
    }

    unregister(template: Template) {
        removeItem(this._templates, template)
        setTimeout(() => {
            this._nofity(template)
        })
    }

    private _nofity(template: Template) {
        const subs = this._subs
        // notify subscriptions next current template
        const subsNext = itemsNext(subs, template.position, template.name)
        subsNext.forEach(sub => sub.subscribe())
    }

    subscribe(sub: Subscription) {
        insertItem(this._subs, sub)
    }

    unsubscribe(sub: Subscription) {
        removeItem(this._subs, sub)
    }

    available(name: string, position: number[], props: any) {
        const templates = this._templates
        // find prev templates which match the props
        return iter(itemsPrev(templates, position, name))
            .sort(Comparators.compare((template: Template) => template.reserved, Comparators.reverseOrder()))
            .filter(template => template.test(props))
            .reverse()
            .value
    }
}