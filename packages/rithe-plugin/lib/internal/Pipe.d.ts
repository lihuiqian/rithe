interface Pipe {
    readonly name: string;
    readonly position: number[];
    readonly value: any;
    readonly dirty: boolean;
    mark(): void;
    calculate(): void;
}
export default Pipe;
//# sourceMappingURL=Pipe.d.ts.map