import React, { CSSProperties, ReactNode, useMemo } from "react";
import { Align } from "../types/Align";
import { TableColumn } from "../types/TableColumn";
import { TableRow } from "../types/TableRow";

export interface TableCellContentProps {
    align: Align,
    tableColumns: TableColumn[],
    tableRows: TableRow[],
    children?: ReactNode | ReactNode[],
}

export const TableCellContent = (props: TableCellContentProps) => {
    const { align, children } = props

    const styles = useStyles(align)
    return <div style={styles.root}>
        {children}
    </div>
}

const useStyles = (align: Align) => {
    return useMemo<Record<string, CSSProperties>>(() => ({
        root: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: align === 'center' ? 'center' : `flex-${align}`,
            alignItems: 'center',
        },
    }), [align])
}