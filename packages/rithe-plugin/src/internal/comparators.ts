import { Arrays, Comparator, Comparators } from "@rithe/utils";
import { State } from "./State";
import { Template } from "./Template";

export const positionComparator: Comparator<number[]> = (pos1: number[], pos2: number[]) => {
    for (const [num1, num2] of Arrays.zip(pos1, pos2)) {
        const cmp = Comparators.NATUAL_ORDER(num1, num2)
        if (cmp !== 0) return cmp
    }
    return Comparators.NATUAL_ORDER(pos1.length, pos2.length)
}

export const stateComparator: Comparator<State> = (s1: State, s2: State) => {
    return Comparators.compare<State, number[]>(state => state.position, positionComparator)(s1, s2)
}

export const templateComparator: Comparator<Template> = (t1: Template, t2: Template) => {
    return Comparators.compare<Template, number[]>(template => template.position, positionComparator)(t1, t2)
}