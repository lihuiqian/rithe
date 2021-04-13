import { TableRow as MuiTableRow } from "@material-ui/core";
import { Records } from "@rithe/utils";
import React, { HTMLAttributes, ReactNode } from "react";
import { TableRow } from "../../types/TableRow";

export interface DataGridBodyRowProps extends HTMLAttributes<HTMLTableRowElement> {
    height: number,
    tableRow: TableRow,
    children?: ReactNode | ReactNode[],
}

export const DataGridBodyRow = (props: DataGridBodyRowProps) => {
    const { height, children, style } = props
    const inheritProps: any = Records.delete(props as any, 'height', 'tableRow', 'children', 'style')

    return <MuiTableRow style={{ height, ...style }} {...inheritProps}>
        {children}
    </MuiTableRow>
}