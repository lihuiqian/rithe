import ComputedPipe from "./ComputedPipe";
import Pipe from "./Pipe";
import pipeComparator from "./pipeComparator";
import positionComparator from "./positionComparator";

class Pipeline implements Iterable<Pipe>{

    pipes: Pipe[]

    constructor() {
        this.pipes = []
    }

    *[Symbol.iterator](): Iterator<Pipe, any, undefined> {
        for (const pipe of this.pipes) yield pipe
    }

    add(pipe: Pipe): void {
        const pipes = this.pipes
        for (let i = 0; i < pipes.length; i++) {
            const cmp = pipeComparator(pipe, pipes[i])
            if (cmp > 0) continue
            if (cmp === 0) {
                pipes.splice(i, 1, pipe)
                return
            }
            if (cmp < 0) {
                pipes.splice(i, 0, pipe)
                return
            }
        }
        pipes.push(pipe)
    }

    remove(position: number[]): Pipe | undefined {
        const pipes = this.pipes
        for (let i = 0; i < pipes.length; i++) {
            const cmp = positionComparator(position, pipes[i].position)
            if (cmp === 0) {
                const [result] = pipes.splice(i, 1)
                return result
            }
        }
        return undefined
    }

    affectedPipes(pipe: Pipe): Pipe[] {
        const pipes = this.pipes
        const index = pipes.indexOf(pipe)
        return index >= 0 ? this._affectedPipes(index, pipe) : []
    }

    private _affectedPipes(index: number, pipe: Pipe): Pipe[] {
        const pipes = this.pipes
        const result = []
        for (let i = index; i < pipes.length; i++) {
            const followingPipe = pipes[i]
            if (followingPipe.name === pipe.name) {
                result.push(followingPipe)
            } else if (followingPipe instanceof ComputedPipe && followingPipe.dependencyNames.indexOf(pipe.name) >= 0) {
                result.push(...this._affectedPipes(i, followingPipe))
            }
        }
        return result
    }

    previousPipe(name: string, position: number[]): Pipe | undefined {
        const pipes = this.pipes
        let result: Pipe | undefined = undefined
        for (const pipe of pipes) {
            if (pipe.name !== name) continue
            if (positionComparator(pipe.position, position) >= 0) break
            result = pipe
        }
        return result
    }

}

export default Pipeline