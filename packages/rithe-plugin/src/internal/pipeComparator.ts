import { Comparator, Comparators } from "@rithe/utils";
import Pipe from "./Pipe";
import positionComparator from "./positionComparator";

const pipeComparator: Comparator<Pipe> = (p1: Pipe, p2: Pipe) => {
    return Comparators.compare<Pipe, number[]>(pipe => pipe.position, positionComparator)(p1, p2)
}

export default pipeComparator