import React, { CSSProperties, ReactNode, useMemo } from "react";
import { useDataGridTheme } from "../DataGridTheme";
import { Freeze } from "../types/Freeze";
import { TableColumn } from "../types/TableColumn";
import { TableRow } from "../types/TableRow";

export interface TableBodyCellProps {
    width: number,
    colSpan: number,
    rowSpan: number,
    freeze: Freeze,
    left: number,
    right: number,
    tableColumns: TableColumn[],
    tableRows: TableRow[],
    children?: ReactNode | ReactNode[],
}

export const TableBodyCell = (props: TableBodyCellProps) => {
    const {
        width,
        colSpan,
        rowSpan,
        freeze,
        left,
        right,
        children,
    } = props

    const styles = useStyles(width, freeze, left, right)
    const { tableBodyCellComponent: Td } = useDataGridTheme()
    return <Td colSpan={colSpan} rowSpan={rowSpan} style={styles.root}>
        {children}
    </Td>
}

const useStyles = (width: number, freeze: Freeze, left: number, right: number) => {
    return useMemo<Record<string, CSSProperties>>(() => ({
        root: {
            width,
            maxWidth: width,
            minWidth: width,
            position: freeze === 'none' ? undefined : 'sticky',
            left,
            right,
        },
    }), [freeze, left, right, width])
}