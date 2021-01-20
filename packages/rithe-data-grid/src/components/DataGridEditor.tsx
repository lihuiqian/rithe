import React from "react";
import { EditorProps } from "../types/TemplateBaseProps";

export type DataGridEditorProps = EditorProps

export const DataGridEditor = (props: DataGridEditorProps) => {
    const { value, tableColumn, tableRow } = props
    return <span>{value}</span>
}