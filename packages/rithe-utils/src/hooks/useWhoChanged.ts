import shallowEquals from "../functions/shallowEquals";
import usePrevious from "./usePrevious";

function useWhoChanged(name: string, value: any) {
    const previous = usePrevious(value)
    if (previous !== value) {
        if (shallowEquals(previous, value)) {
            console.log(name, 'container changed', value)
        } else {
            console.log(name, 'changed', 'from', previous, 'to', value)
        }
    }
}

export default useWhoChanged