import Pipe from "./Pipe";
import Pipeline from "./Pipeline";
declare class ComputedPipe implements Pipe {
    readonly name: string;
    readonly position: number[];
    readonly computed: (prev: any, ...deps: any[]) => any;
    readonly dependencyNames: string[];
    readonly lazy: boolean;
    private _dirty;
    private _value;
    private _pipeline;
    constructor(pipeline: Pipeline, name: string, position: number[], computed: (prev: any, ...deps: any[]) => any, dependencyNames: string[], lazy: boolean);
    get dirty(): boolean;
    get value(): any;
    mark(): void;
    calculate(): void;
}
export default ComputedPipe;
//# sourceMappingURL=ComputedPipe.d.ts.map