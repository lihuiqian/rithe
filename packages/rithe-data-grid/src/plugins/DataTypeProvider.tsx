import { Comparator } from "packages/rithe-utils/dist"
import React, { ComponentType } from "react"
import { DataGridEditorProps } from "../components/DataGridEditor"
import { DataGridFormatterProps } from "../components/DataGridFormatter"
import Align from "../types/Align"
import { DataTypeInfer } from "../types/DataType"
import FilterPredicate from "../types/FilterPredicate"
import FilterPredicator from "../types/FilterPredicator"

export interface DataTypeProviderProps<T extends keyof DataTypeInfer> {
    type: T,
    name: string,
    align: Align,
    comparator: Comparator<DataTypeInfer[T]>
    predicates: Partial<{ [predicator in FilterPredicator]: FilterPredicate }>,
    formatterComponent: ComponentType<DataGridFormatterProps>,
    editorComponent: ComponentType<DataGridEditorProps>,
}

export interface OverrideDataTypeProviderProps<T extends keyof DataTypeInfer> {
    overrideName: string,
    name: string,
    align?: Align,
    comparator?: Comparator<DataTypeInfer[T]>
    predicates?: Partial<{ [predicator in FilterPredicator]: FilterPredicate }>,
    formatterComponent?: ComponentType<DataGridFormatterProps>,
    editorComponent?: ComponentType<DataGridEditorProps>,
}

export const DataTypeProvider = (props: DataTypeProviderProps<any> | OverrideDataTypeProviderProps<any>) => {

    return <></>
}