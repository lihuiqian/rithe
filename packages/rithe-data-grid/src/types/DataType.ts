import { Comparator } from '@rithe/utils'
import Align from "./Align"
import FilterPredicate from './FilterPredicate'
import FilterPredicator from './FilterPredicator'

interface DataTypeInfer {
    'unknown': unknown,
    'string': string,
    'number': number,
    'bigint': bigint,
    'boolean': boolean,
    'date': Date,
    'time': Date,
    'datetime': Date,
    'code': string | number,
    // eslint-disable-next-line @typescript-eslint/ban-types
    'object': object,
    'array': any[],
    'action': any,
}

interface DataType<T extends keyof DataTypeInfer> {
    type: T,
    name: string,
    align: Align,
    comparator: Comparator<DataTypeInfer[T]>
    predicates: Partial<{ [predicator in FilterPredicator]: FilterPredicate }>,
}

export { DataTypeInfer }
export default DataType