import React, { ReactNode } from "react";

export interface DataGridTreeIndentProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridTreeIndent = (props: DataGridTreeIndentProps) => {
    const { children } = props
    return <div>{children}</div>
}