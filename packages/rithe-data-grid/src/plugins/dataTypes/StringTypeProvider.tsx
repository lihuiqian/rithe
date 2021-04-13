import React, { ComponentType, useCallback } from "react"
import { DataGridEditorProps } from "../../components/basic/DataGridEditor"
import { DataGridFilterProps } from "../../components/basic/DataGridFilter"
import { DataGridFormatterProps } from "../../components/basic/DataGridFormatter"
import { StringEditor, StringEditorProps } from "../../components/dataTypes/StringEditor"
import { StringFilter, StringFilterProps } from "../../components/dataTypes/StringFilter"
import { StringFormatter, StringFormatterProps } from "../../components/dataTypes/StringFormatter"
import { StringInlineEditor, StringInlineEditorProps } from "../../components/dataTypes/StringInlineEditor"
import { Align } from "../../types/Align"
import { DataTypeProvider } from "../DataTypeProvider"

export interface StringTypeProviderProps {
    name: string,
    align?: Align,
    titleAlign?: Align,
    categoryAlign?: Align,
    Formatter?: ComponentType<StringFormatterProps>,
    Editor?: ComponentType<StringEditorProps>,
    InlineEditor?: ComponentType<StringInlineEditorProps>,
    Filter?: ComponentType<StringFilterProps>,
}

export const StringTypeProvider = (props: StringTypeProviderProps) => {
    const {
        name,
        align = 'start',
        titleAlign = 'start',
        categoryAlign = 'center',
        Formatter = StringFormatter,
        Editor = StringEditor,
        InlineEditor = StringInlineEditor,
        Filter = StringFilter,
    } = props

    const ProviderFormatter = useCallback((props: DataGridFormatterProps) => {
        return <Formatter
            value={props.value}
        />
    }, [Formatter])

    const ProviderEditor = useCallback((props: DataGridEditorProps) => {
        return <Editor
            align={align}
            value={props.value ?? null}
            setValue={props.setValue}
        />
    }, [Editor, align])

    const ProviderInlineEditor = useCallback((props: DataGridEditorProps) => {
        return <InlineEditor
            align={align}
            value={props.value ?? null}
            setValue={props.setValue}
        />
    }, [InlineEditor, align])

    const ProviderFilter = useCallback((props: DataGridFilterProps) => {
        return <Filter
            values={props.values}
            filter={props.filter}
            setFilter={props.setFilter}
        />
    }, [Filter])

    return <DataTypeProvider
        name={name}
        align={align}
        titleAlign={titleAlign}
        categoryAlign={categoryAlign}
        Formatter={ProviderFormatter}
        Editor={ProviderEditor}
        InlineEditor={ProviderInlineEditor}
        Filter={ProviderFilter}
    />
}