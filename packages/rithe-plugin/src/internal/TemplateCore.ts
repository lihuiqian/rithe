import { Arrays } from "@rithe/utils"
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
        this._nofity(template)
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

    slice(name: string, position: number[], param: any) {
        const templates = this._templates
        // find prev template which match the param
        const templatePrev = Arrays.last(itemsPrev(templates, position, name).filter(template => template.test(param)))
        return templatePrev
    }
}