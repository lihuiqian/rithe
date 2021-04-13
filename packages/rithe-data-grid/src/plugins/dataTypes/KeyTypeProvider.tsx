import { useShallow } from "@rithe/utils"
import React, { ComponentType, useCallback } from "react"
import { DataGridEditorProps } from "../../components/basic/DataGridEditor"
import { DataGridFormatterProps } from "../../components/basic/DataGridFormatter"
import { KeyEditor, KeyEditorProps } from "../../components/dataTypes/KeyEditor"
import { KeyFormatter, KeyFormatterProps } from "../../components/dataTypes/KeyFormatter"
import { KeyInlineEditor, KeyInlineEditorProps } from "../../components/dataTypes/KeyInlineEditor"
import { Align } from "../../types/Align"
import { DataTypeProvider } from "../DataTypeProvider"

export interface KeyTypeProviderProps {
    name: string,
    align?: Align,
    titleAlign?: Align,
    categoryAlign?: Align,
    formatter: {
        format: (value: any | null) => string,
        group?: (value: any | null) => string,
        disable?: (value: any | null) => boolean,
    },
    options?: any[],
    Formatter?: ComponentType<KeyFormatterProps>,
    Editor?: ComponentType<KeyEditorProps>,
    InlineEditor?: ComponentType<KeyInlineEditorProps>,
}

export const KeyTypeProvider = (props: KeyTypeProviderProps) => {
    const {
        name,
        align = 'start',
        titleAlign = 'start',
        categoryAlign = 'center',
        formatter,
        Formatter = KeyFormatter,
        Editor = KeyEditor,
        InlineEditor = KeyInlineEditor,
    } = props
    const options = useShallow(props.options ?? [])

    const ProviderFormatter = useCallback((props: DataGridFormatterProps) => {
        return <Formatter
            value={props.value}
            formatter={formatter}
        />
    }, [Formatter, formatter])

    const ProviderEditor = useCallback((props: DataGridEditorProps) => {
        return <Editor
            align={align}
            value={props.value ?? null}
            formatter={formatter}
            options={options}
            setValue={props.setValue}
        />
    }, [Editor, align, formatter, options])

    const ProviderInlineEditor = useCallback((props: DataGridEditorProps) => {
        return <InlineEditor
            align={align}
            value={props.value ?? null}
            options={options}
            formatter={formatter}
            setValue={props.setValue}
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