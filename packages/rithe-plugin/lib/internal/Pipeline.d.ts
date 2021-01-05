import Pipe from "./Pipe";
declare class Pipeline implements Iterable<Pipe> {
    pipes: Pipe[];
    constructor();
    [Symbol.iterator](): Iterator<Pipe, any, undefined>;
    add(pipe: Pipe): void;
    remove(position: number[]): Pipe | undefined;
    affectedPipes(pipe: Pipe): Pipe[];
    private _affectedPipes;
    previousPipe(name: string, position: number[]): Pipe | undefined;
}
export default Pipeline;
//# sourceMappingURL=Pipeline.d.ts.map