import React, { ComponentType, useCallback } from "react"
import { DataGridEditorProps } from "../../components/basic/DataGridEditor"
import { DataGridFormatterProps } from "../../components/basic/DataGridFormatter"
import { TimeEditor, TimeEditorProps } from "../../components/dataTypes/TimeEditor"
import { TimeFormatter, TimeFormatterProps } from "../../components/dataTypes/TimeFormatter"
import { TimeInlineEditor, TimeInlineEditorProps } from "../../components/dataTypes/TimeInlineEditor"
import { Align } from "../../types/Align"
import { DataTypeProvider } from "../DataTypeProvider"

const DEFAULT_OPTIONS: Intl.DateTimeFormatOptions = { timeStyle: 'medium', hour12: false }

export interface TimeTypeProviderProps {
    name: string,
    align?: Align,
    titleAlign?: Align,
    categoryAlign?: Align,
    options?: Intl.DateTimeFormatOptions,
    Formatter?: ComponentType<TimeFormatterProps>,
    Editor?: ComponentType<TimeEditorProps>,
    InlineEditor?: ComponentType<TimeInlineEditorProps>,
}

export const TimeTypeProvider = (props: TimeTypeProviderProps) => {
    const {
        name,
        align = 'start',
        titleAlign = 'start',
        categoryAlign = 'center',
        options = DEFAULT_OPTIONS,
        Formatter = TimeFormatter,
        Editor = TimeEditor,
        InlineEditor = TimeInlineEditor,
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