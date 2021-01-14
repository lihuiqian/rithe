import { positionComparator, templateComparator } from "./comparators";
import { Template } from "./Template";

export class TemplateArray implements Iterable<Template> {

    readonly templates: Template[]

    constructor() {
        this.templates = []
    }

    *[Symbol.iterator](): Iterator<Template, any, undefined> {
        for (const template of this.templates) yield template
    }

    add(template: Template): void {
        const templates = this.templates
        for (let i = 0; i < templates.length; i++) {
            const cmp = templateComparator(template, templates[i])
            if (cmp > 0) continue
            if (cmp === 0) {
                templates.splice(i, 1, template)
                return
            }
            if (cmp < 0) {
                templates.splice(i, 0, template)
                return
            }
        }
        templates.push(template)
    }

    remove(position: number[]): Template | undefined {
        const templates = this.templates
        for (let i = 0; i < templates.length; i++) {
            const cmp = positionComparator(position, templates[i].position)
            if (cmp === 0) {
                const [result] = templates.splice(i, 1)
                return result
            }
        }
        return undefined
    }

    previousTemplate(name: string, position: number[], params: any): Template | undefined {
        const templates = this.templates
        let result: Template | undefined = undefined
        for (const template of templates) {
            if (template.name !== name) continue
            if (!template.predicate(params)) continue
            if (positionComparator(template.position, position) >= 0) break
            result = template
        }
        return result
    }
}