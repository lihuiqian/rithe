import Pipe from "./Pipe";
declare class PluginCore {
    private _pipeline;
    constructor();
    mount(name: string, position: number[], value: any): void;
    mount(name: string, position: number[], computed: (prev: any, ...deps: any[]) => any, dependencyNames: string[], lazy: boolean): void;
    unmount(position: number[]): void;
    mark(pipe: Pipe): void;
    calculate(pipe: Pipe): void;
    latest(name: string, position: number[]): Pipe | undefined;
}
export default PluginCore;
//# sourceMappingURL=PluginCore.d.ts.map