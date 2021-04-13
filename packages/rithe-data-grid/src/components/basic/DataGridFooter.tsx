import { TableFooter } from "@material-ui/core";
import React, { ReactNode } from "react";

export interface DataGridFooterProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridFooter = (props: DataGridFooterProps) => {
    const { children } = props
    return <TableFooter>{children}</TableFooter>
}