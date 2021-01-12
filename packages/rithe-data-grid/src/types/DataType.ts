import { Comparator } from '@rithe/utils'
import { ComponentType } from 'react'
import { DataGridEditorProps } from '../components/DataGridEditor'
import { DataGridFilterProps } from '../components/DataGridFilter'
import { DataGridFormatterProps } from '../components/DataGridFormatter'
import { DataGridTitleProps } from '../components/DataGridTitle'
import Align from "./Align"
import FilterPredicate from './FilterPredicate'
import FilterPredicator from './FilterPredicator'
import Formatter from './Formatter'

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
    formatter: Formatter<T>,
    comparator: Comparator<DataTypeInfer[T]>
    predicates: Partial<{ [predicator in FilterPredicator]: FilterPredicate }>,
    titleComponent: ComponentType<DataGridTitleProps>,
    filterComponents: { name: string, filterComponent: ComponentType<DataGridFilterProps> }[],
    formatterComponent: ComponentType<DataGridFormatterProps>,
    editorComponent: ComponentType<DataGridEditorProps>,
}

export { DataTypeInfer }
export default DataType