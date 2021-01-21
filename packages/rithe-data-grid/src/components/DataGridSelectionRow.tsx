import React, { ReactNode } from "react";

export interface DataGridSelectionRowProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridSelectionRow = (props: DataGridSelectionRowProps) => {
    const { children } = props
    return <div>{children}</div>
}