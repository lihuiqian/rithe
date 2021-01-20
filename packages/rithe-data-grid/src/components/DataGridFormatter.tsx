import React from "react";
import { FormatterProps } from '../types/TemplateBaseProps';

export type DataGridFormatterProps = FormatterProps

export const DataGridFormatter = (props: DataGridFormatterProps) => {
    const { value, tableColumn, tableRow } = props
    return <span>{value}</span>
}