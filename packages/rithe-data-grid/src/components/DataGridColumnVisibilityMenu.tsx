import React, { ReactNode } from "react";
import { useDataGridTheme } from "../DataGridTheme";

export interface DataGridColumnVisibilityMenuProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridColumnVisibilityMenu = (props: DataGridColumnVisibilityMenuProps) => {
    const { children } = props
    const { menuComponent: Menu } = useDataGridTheme()
    return <Menu>
        {children}
    </Menu>
}