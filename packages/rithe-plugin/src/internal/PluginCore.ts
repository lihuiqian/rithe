import ComputedPipe from "./ComputedPipe"
import Pipe from "./Pipe"
import pipeComparator from './pipeComparator'
import Pipeline from "./Pipeline"
import ValuePipe from "./ValuePipe"

class PluginCore {

    private _pipeline: Pipeline

    constructor() {
        this._pipeline = new Pipeline()
    }

    mount(name: string, position: number[], value: any): void
    mount(name: string, position: number[], computed: (prev: any, ...deps: any[]) => any, dependencyNames: string[], lazy: boolean): void
    mount(name: string, position: number[], ...args: any[]): void {
        const pipeline = this._pipeline
        const pipe = args.length === 1 ? new ValuePipe(pipeline, name, position, args[0]) : new ComputedPipe(pipeline, name, position, args[0], args[1], args[2])
        pipeline.add(pipe)
        this.mark(pipe)
    }

    unmount(position: number[]) {
        const pipe: Pipe | undefined = this._pipeline.remove(position)
        pipe && this.mark(pipe)
    }

    mark(pipe: Pipe) {
        const affectedPipes = this._pipeline.affectedPipes(pipe)
        for (const affectedPipe of affectedPipes) {
            affectedPipe.mark()
        }
    }

    calculate(pipe: Pipe) {
        for (const p of this._pipeline) {
            if (pipeComparator(p, pipe) > 0) break
            p.dirty && p.calculate()
        }
    }

    latest(name: string, position: number[]): Pipe | undefined {
        return this._pipeline.previousPipe(name, position)
    }
}

export default PluginCore