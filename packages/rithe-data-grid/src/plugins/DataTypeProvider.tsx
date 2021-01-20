import { Plugin } from "@rithe/plugin"
import { Comparator, Maps } from "@rithe/utils"
import React, { ComponentType, useCallback } from "react"
import { DataGridEditor, DataGridEditorProps } from "../components/DataGridEditor"
import { DataGridFormatter, DataGridFormatterProps } from "../components/DataGridFormatter"
import { State } from "../State"
import { Template } from "../Template"
import { Align } from "../types/Align"
import { DataType, DataTypeInfer } from "../types/DataType"
import { FilterPredicate } from "../types/FilterPredicate"
import { FilterPredicator } from "../types/FilterPredicator"
import { isCurrentEditor, isCurrentFormatter } from "../utils/helpers"

export interface DataTypeProviderProps<T extends keyof DataTypeInfer> {
    type: T,
    name: string,
    align?: Align,
    comparator?: Comparator<DataTypeInfer[T]>,
    predicates?: Partial<{ [predicator in FilterPredicator]: FilterPredicate }>,
    formatterComponent?: ComponentType<DataGridFormatterProps>,
    editorComponent?: ComponentType<DataGridEditorProps>,
}

export const DataTypeProvider = (props: DataTypeProviderProps<any>) => {
    const { type,
        name,
        align,
        comparator,
        predicates,
        formatterComponent: FormatterComponent = DataGridFormatter,
        editorComponent: EditorComponent = DataGridEditor,
    } = props

    const dataTypesComputed = useDataTypesComputed(type, name, align, comparator, predicates)

    return <Plugin>
        <State name="dataTypes" computed={dataTypesComputed} />
        <Template name="formatter" predicate={({ tableColumn }) => isCurrentFormatter(name, tableColumn)}>
            {props => {
                return <FormatterComponent {...props} />
            }}
        </Template>
        <Template name="editor" predicate={({ tableColumn }) => isCurrentEditor(name, tableColumn)}>
            {props => {
                return <EditorComponent {...props} />
            }}
        </Template>
    </Plugin>
}

const useDataTypesComputed = <T extends keyof DataTypeInfer>(
    type: T,
    name: string,
    align?: Align,
    comparator?: Comparator<DataTypeInfer[T]>,
    predicates?: Partial<{ [predicator in FilterPredicator]: FilterPredicate }>) => {
    return useCallback((dataTypes: DataType<any>[] = []) => {
        if (!align || !comparator || !predicates) {
            const dataTypeMap = Maps.from(dataTypes.map(dt => [dt.type, dt]))
            const baseDataType = dataTypeMap.get(type)
            if (!baseDataType) throw new Error(`Fatal Error. No predefined dataType ${type}`)
            return [...dataTypes, {
                type,
                name,
                align: align ?? baseDataType.align,
                comparator: comparator ?? baseDataType.comparator,
                predicates: predicates ?? baseDataType.predicates,
            }]
        }
        return [...dataTypes, { type, name, align, comparator, predicates }]
    }, [align, comparator, name, predicates, type])
}