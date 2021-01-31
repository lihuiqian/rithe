import React, { ReactNode } from "react";
import { useDataGridTheme } from "../DataGridTheme";

export interface DataGridBandingProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridBanding = (props: DataGridBandingProps) => {
    const { children } = props
    const { typographyComponent: Typography } = useDataGridTheme()
    return <Typography>{children}</Typography>
}