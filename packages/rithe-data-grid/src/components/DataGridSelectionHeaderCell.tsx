import React, { ReactNode } from "react";

export interface DataGridSelectionHeaderCellProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridSelectionHeaderCell = (props: DataGridSelectionHeaderCellProps) => {
    const { children } = props
    return <div>{children}</div>
}