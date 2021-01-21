import React, { ReactNode } from "react";

export interface DataGridSortingMenuItemProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridSortingMenuItem = (props: DataGridSortingMenuItemProps) => {
    const { children } = props
    return <div>{children}</div>
}