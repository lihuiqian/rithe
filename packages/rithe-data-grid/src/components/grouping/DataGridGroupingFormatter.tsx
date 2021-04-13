import React from "react";

export interface DataGridGroupingFormatterProps {
    field: string,
    value: any,
    group: { key: string, value: any }[]
}

export const DataGridGroupingFormatter = (props: DataGridGroupingFormatterProps) => {
    const { field, value } = props
    return <div>{`Group: ${field} - ${value}`}</div>
}