import React, { ComponentType, useCallback } from "react"
import { DataGridEditorProps } from "../../components/basic/DataGridEditor"
import { DataGridFormatterProps } from "../../components/basic/DataGridFormatter"
import { KeysEditor, KeysEditorProps } from "../../components/dataTypes/KeysEditor"
import { KeysFormatter, KeysFormatterProps } from "../../components/dataTypes/KeysFormatter"
import { KeysInlineEditor, KeysInlineEditorProps } from "../../components/dataTypes/KeysInlineEditor"
import { Align } from "../../types/Align"
import { DataTypeProvider } from "../DataTypeProvider"

export interface KeysTypeProviderProps {
    name: string,
    align?: Align,
    titleAlign?: Align,
    categoryAlign?: Align,
    formatter: {
        format: (value: any | null) => string,
        group?: (value: any | null) => string,
        disable?: (value: any | null) => boolean,
    },
    options: any[],
    Formatter?: ComponentType<KeysFormatterProps>,
    Editor?: ComponentType<KeysEditorProps>,
    InlineEditor?: ComponentType<KeysInlineEditorProps>,
}

export const KeysTypeProvider = (props: KeysTypeProviderProps) => {
    const {
        name,
        align = 'start',
        titleAlign = 'start',
        categoryAlign = 'center',
        formatter,
        options,
        Formatter = KeysFormatter,
        Editor = KeysEditor,
        InlineEditor = KeysInlineEditor,
    } = props

    const ProviderFormatter = useCallback((props: DataGridFormatterProps) => {
        return <Formatter
            values={props.value ?? []}
            formatter={formatter}
        />
    }, [Formatter, formatter])

    const ProviderEditor = useCallback((props: DataGridEditorProps) => {
        return <Editor
            align={align}
            values={props.value ?? []}
            formatter={formatter}
            options={options}
            setValues={props.setValue}
        />
    }, [Editor, align, formatter, options])

    const ProviderInlineEditor = useCallback((props: DataGridEditorProps) => {
        return <InlineEditor
            align={align}
            values={props.value ?? []}
            options={options}
            formatter={formatter}
            setValues={props.setValue}
        />
    }, [InlineEditor, align, formatter, options])

    return <DataTypeProvider
        name={name}
        align={align}
        titleAlign={titleAlign}
        categoryAlign={categoryAlign}
        Formatter={ProviderFormatter}
        Editor={ProviderEditor}
        InlineEditor={ProviderInlineEditor}
    />
}