import React, { ReactNode } from "react";
import { useDataGridTheme } from "../DataGridTheme";

export interface DataGridContainerProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridContainer = (props: DataGridContainerProps) => {
    const { children } = props
    const { containerComponent: Div } = useDataGridTheme()
    return <Div>{children}</Div>
}