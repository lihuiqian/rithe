import React, { ReactNode } from "react";

export interface DataGridSearchInputProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridSearchInput = (props: DataGridSearchInputProps) => {
    const { children } = props
    return <div>{children}</div>
}