import React, { ReactNode } from "react";

export interface DataGridColumnVisibilityMenuProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridColumnVisibilityMenu = (props: DataGridColumnVisibilityMenuProps) => {
    const { children } = props
    return <div>{children}</div>
}