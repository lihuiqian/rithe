import React, { ReactNode } from "react";

export interface DataGridSelectionCheckboxProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridSelectionCheckbox = (props: DataGridSelectionCheckboxProps) => {
    const { children } = props
    return <div>{children}</div>
}