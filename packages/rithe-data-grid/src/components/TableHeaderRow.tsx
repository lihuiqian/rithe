import React, { CSSProperties, ReactNode, useMemo } from "react";
import { useDataGridTheme } from "../DataGridTheme";
import { TableRow } from "../types/TableRow";

export interface TableHeaderRowProps {
    height: number,
    top: number,
    frozen: boolean,
    tableRow: TableRow,
    children?: ReactNode | ReactNode[],
}

export const TableHeaderRow = (props: TableHeaderRowProps) => {
    const {
        height,
        top,
        frozen,
        children,
    } = props
    const styles = useStyles(frozen, height, top)
    const { tableHeadRowComponent: Tr } = useDataGridTheme()
    return <Tr style={styles.root}>
        {children}
    </Tr>
}

const useStyles = (frozen: boolean, height: number, top: number) => {
    return useMemo<Record<string, CSSProperties>>(() => ({
        root: {
            position: frozen ? 'sticky' : undefined,
            height,
            top,
        }
    }), [frozen, height, top])
}