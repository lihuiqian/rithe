import React, { ComponentType, useCallback } from "react"
import { DataGridEditorProps } from "../../components/basic/DataGridEditor"
import { DataGridFormatterProps } from "../../components/basic/DataGridFormatter"
import { NumberEditor, NumberEditorProps } from "../../components/dataTypes/NumberEditor"
import { NumberFormatter, NumberFormatterProps } from "../../components/dataTypes/NumberFormatter"
import { NumberInlineEditor, NumberInlineEditorProps } from "../../components/dataTypes/NumberInlineEditor"
import { Align } from "../../types/Align"
import { DataTypeProvider } from "../DataTypeProvider"

export interface NumberTypeProviderProps {
    name: string,
    align?: Align,
    titleAlign?: Align,
    categoryAlign?: Align,
    options?: Intl.NumberFormatOptions,
    Formatter?: ComponentType<NumberFormatterProps>,
    Editor?: ComponentType<NumberEditorProps>,
    InlineEditor?: ComponentType<NumberInlineEditorProps>,
}

export const NumberTypeProvider = (props: NumberTypeProviderProps) => {
    const {
        name,
        align = 'end',
        titleAlign = 'end',
        categoryAlign = 'center',
        options,
        Formatter = NumberFormatter,
        Editor = NumberEditor,
        InlineEditor = NumberInlineEditor,
    } = props

    const ProviderFormatter = useCallback((props: DataGridFormatterProps) => {
        const formatter = new Intl.NumberFormat(undefined, options)
        return <Formatter
            value={props.value}
            formatter={formatter}
        />
    }, [Formatter, options])

    const ProviderEditor = useCallback((props: DataGridEditorProps) => {
        return <Editor
            align={align}
            value={props.value ?? null}
            setValue={props.setValue}
        />
    }, [Editor, align])

    const ProviderInlineEditor = useCallback((props: DataGridEditorProps) => {
        const formatter = new Intl.NumberFormat(undefined, options)
        return <InlineEditor
            align={align}
            value={props.value ?? null}
            formatter={formatter}
            setValue={props.setValue}
        />
    }, [InlineEditor, align, options])


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