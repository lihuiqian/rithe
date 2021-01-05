/// <reference types="react" />
interface ValuePipeProps {
    name: string;
    value: any;
}
interface ComputedPipeProps {
    name: string;
    computed: (prev: any, ...deps: any[]) => any;
    dependencyNames?: string[];
    lazy?: boolean;
}
declare type PipeProps = ValuePipeProps | ComputedPipeProps;
declare const Pipe: (props: PipeProps) => JSX.Element;
export default Pipe;
//# sourceMappingURL=Pipe.d.ts.map