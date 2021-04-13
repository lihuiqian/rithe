import React, { ComponentType, useCallback } from "react"
import { DataGridEditorProps } from "../../components/basic/DataGridEditor"
import { DataGridFormatterProps } from "../../components/basic/DataGridFormatter"
import { DateTimeEditor, DateTimeEditorProps } from "../../components/dataTypes/DateTimeEditor"
import { DateTimeFormatter, DateTimeFormatterProps } from "../../components/dataTypes/DateTimeFormatter"
import { DateTimeInlineEditor, DateTimeInlineEditorProps } from "../../components/dataTypes/DateTimeInlineEditor"
import { Align } from "../../types/Align"
import { DataTypeProvider } from "../DataTypeProvider"

const DEFAULT_OPTIONS: Intl.DateTimeFormatOptions = { dateStyle: 'medium', timeStyle: 'medium', hour12: false }

export interface DateTimeTypeProviderProps {
    name: string,
    align?: Align,
    titleAlign?: Align,
    categoryAlign?: Align,
    options?: Intl.DateTimeFormatOptions,
    Formatter?: ComponentType<DateTimeFormatterProps>,
    Editor?: ComponentType<DateTimeEditorProps>,
    InlineEditor?: ComponentType<DateTimeInlineEditorProps>,
}

export const DateTimeTypeProvider = (props: DateTimeTypeProviderProps) => {
    const {
        name,
        align = 'start',
        titleAlign = 'start',
        categoryAlign = 'center',
        options = DEFAULT_OPTIONS,
        Formatter = DateTimeFormatter,
        Editor = DateTimeEditor,
        InlineEditor = DateTimeInlineEditor,
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