import React, { ComponentType, useCallback } from "react"
import { DataGridEditorProps } from "../../components/basic/DataGridEditor"
import { DataGridFormatterProps } from "../../components/basic/DataGridFormatter"
import { DateEditor, DateEditorProps } from "../../components/dataTypes/DateEditor"
import { DateFormatter, DateFormatterProps } from "../../components/dataTypes/DateFormatter"
import { DateInlineEditor, DateInlineEditorProps } from "../../components/dataTypes/DateInlineEditor"
import { Align } from "../../types/Align"
import { DataTypeProvider } from "../DataTypeProvider"

const DEFAULT_OPTIONS: Intl.DateTimeFormatOptions = { dateStyle: 'medium' }

export interface DateTypeProviderProps {
    name: string,
    align?: Align,
    titleAlign?: Align,
    categoryAlign?: Align,
    options?: Intl.DateTimeFormatOptions,
    Formatter?: ComponentType<DateFormatterProps>,
    Editor?: ComponentType<DateEditorProps>,
    InlineEditor?: ComponentType<DateInlineEditorProps>,
}

export const DateTypeProvider = (props: DateTypeProviderProps) => {
    const {
        name,
        align = 'start',
        titleAlign = 'start',
        categoryAlign = 'center',
        options = DEFAULT_OPTIONS,
        Formatter = DateFormatter,
        Editor = DateEditor,
        InlineEditor = DateInlineEditor,
    } = props

    const ProviderFormatter = useCallback((props: DataGridFormatterProps) => {
        const formatter = new Intl.DateTimeFormat(undefined, options)
        return <Formatter
            value={props.value}
            formatter={formatter}
        />
    }, [Formatter, options])

    const ProviderEditor = useCallback((props: DataGridEditorProps) => {
        const formatter = new Intl.DateTimeFormat(undefined, options)
        return <Editor
            align={align}
            value={props.value ?? null}
            formatter={formatter}
            setValue={props.setValue}
        />
    }, [Editor, align, options])

    const ProviderInlineEditor = useCallback((props: DataGridEditorProps) => {
        const formatter = new Intl.DateTimeFormat(undefined, options)
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