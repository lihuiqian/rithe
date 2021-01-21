import React, { ReactNode } from "react";
import { useDataGridTheme } from "../DataGridTheme";

export interface DataGridTitleProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridTitle = (props: DataGridTitleProps) => {
    const { children } = props
    const { typographyComponent: Typography } = useDataGridTheme()
    return <Typography>{children}</Typography>
}