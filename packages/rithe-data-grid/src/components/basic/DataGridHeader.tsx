import { TableHead } from "@material-ui/core";
import React, { ReactNode } from "react";

export interface DataGridHeaderProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridHeader = (props: DataGridHeaderProps) => {
    const { children } = props
    return <TableHead>{children}</TableHead>
}