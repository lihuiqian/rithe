import { Plugin } from "@rithe/plugin"
import { Maps } from "@rithe/utils"
import React, { ComponentType, useCallback } from "react"
import { DataGridEditor, DataGridEditorProps } from "../components/DataGridEditor"
import { DataGridFormatter, DataGridFormatterProps } from "../components/DataGridFormatter"
import { State } from "../State"
import { Template } from "../Template"
import { Align } from "../types/Align"
import { DataType, DataTypeInfer } from "../types/DataType"

export interface DataTypeProviderProps<T extends keyof DataTypeInfer> {
    type: T,
    name: string,
    align?: Align,
    formatterComponent?: ComponentType<DataGridFormatterProps>,
    editorComponent?: ComponentType<DataGridEditorProps>,
}

export const DataTypeProvider = (props: DataTypeProviderProps<any>) => {
    const { type,
        name,
        align,
        formatterComponent: FormatterComponent = DataGridFormatter,
        editorComponent: EditorComponent = DataGridEditor,
    } = props

    const dataTypesComputed = useDataTypesComputed(type, name, align)

    return <Plugin>
        <State name="dataTypes" computed={dataTypesComputed} />
        <Template name="formatter" predicate={({ dataType }) => name === dataType.name}>
            {props => {
                return <FormatterComponent {...props} />
            }}
        </Template>
        <Template name="editor" predicate={({ dataType }) => name === dataType.name}>
            {props => {
                return <EditorComponent {...props} />
            }}
        </Template>
    </Plugin>
}

const useDataTypesComputed = <T extends keyof DataTypeInfer>(type: T, name: string, align?: Align) => {
    return useCallback((dataTypes: DataType[] = []) => {
        if (!align) {
            const dataTypeMap = Maps.from(dataTypes.map(dt => [dt.type, dt]))
            const baseDataType = dataTypeMap.get(type)
            if (!baseDataType) throw new Error(`Fatal Error. No predefined dataType ${type}`)
            return [...dataTypes, {
                type,
                name,
                align: align ?? baseDataType.align,
            }]
        }
        return [...dataTypes, { type, name, align }]
    }, [align, name, type])
}