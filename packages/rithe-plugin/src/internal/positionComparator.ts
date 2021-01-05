import { Arrays, Comparator, Comparators } from "@rithe/utils";

const positionComparator: Comparator<number[]> = (pos1: number[], pos2: number[]) => {
    for (const [num1, num2] of Arrays.zip(pos1, pos2)) {
        const cmp = Comparators.NATUAL_ORDER(num1, num2)
        if (cmp !== 0) return cmp
    }
    return Comparators.NATUAL_ORDER(pos1.length, pos2.length)
}

export default positionComparator