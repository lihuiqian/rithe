import React, { CSSProperties, ReactNode, useMemo } from "react";
import { useDataGridTheme } from "../DataGridTheme";
import { TableRow } from "../types/TableRow";

export interface TableBodyRowProps {
    height: number,
    tableRow: TableRow,
    children?: ReactNode | ReactNode[],
}

export const TableBodyRow = (props: TableBodyRowProps) => {
    const {
        height,
        children,
    } = props
    const styles = useStyles(height)
    const { tableBodyRowComponent: Tr } = useDataGridTheme()
    return <Tr style={styles.root}>
        {children}
    </Tr>
}

const useStyles = (height: number) => {
    return useMemo<Record<string, CSSProperties>>(() => ({
        root: {
            height,
        }
    }), [height])
}