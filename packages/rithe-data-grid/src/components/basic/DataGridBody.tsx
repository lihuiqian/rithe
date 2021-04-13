import { TableBody } from "@material-ui/core";
import React, { ReactNode } from "react";

export interface DataGridBodyProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridBody = (props: DataGridBodyProps) => {
    const { children } = props
    return <TableBody>{children}</TableBody>
}