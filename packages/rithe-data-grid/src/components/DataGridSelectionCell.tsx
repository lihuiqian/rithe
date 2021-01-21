import React, { ReactNode } from "react";

export interface DataGridSelectionCellProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridSelectionCell = (props: DataGridSelectionCellProps) => {
    const { children } = props
    return <div>{children}</div>
}