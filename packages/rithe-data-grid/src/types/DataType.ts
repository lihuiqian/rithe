import { Comparator } from '@rithe/utils'
import { JSXElementConstructor } from 'react'
import { DataGridEditorProps } from '../components/DataGridEditor'
import { DataGridFilterProps } from '../components/DataGridFilter'
import { DataGridFormatterProps } from '../components/DataGridFormatter'
import { DataGridTitleProps } from '../components/DataGridTitle'
import Align from "./Align"
import FilterPredicate from './FilterPredicate'
import FilterPredicator from './FilterPredicator'

interface TypeMap {
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
}

interface DataType<T extends keyof TypeMap> {
    type: T,
    name: string,
    align: Align,
    formatter: undefined,
    comparator: Comparator<TypeMap[T]>
    predicates: Partial<{ [predicator in FilterPredicator]: FilterPredicate }>,
    titleComponent: JSXElementConstructor<DataGridTitleProps>,
    filterComponents: { name: string, filterComponent: JSXElementConstructor<DataGridFilterProps> }[],
    formatterComponent: JSXElementConstructor<DataGridFormatterProps>,
    editorComponent: JSXElementConstructor<DataGridEditorProps>,
}

export default DataType