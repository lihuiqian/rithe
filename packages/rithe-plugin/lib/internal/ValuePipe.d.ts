import Pipe from "./Pipe";
import Pipeline from "./Pipeline";
declare class ValuePipe implements Pipe {
    readonly name: string;
    readonly position: number[];
    private _value;
    private _dirty;
    constructor(_: Pipeline, name: string, position: number[], value: any);
    get value(): any;
    get dirty(): boolean;
    mark(): void;
    calculate(): void;
}
export default ValuePipe;
//# sourceMappingURL=ValuePipe.d.ts.map