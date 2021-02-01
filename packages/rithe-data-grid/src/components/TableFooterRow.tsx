import React, { CSSProperties, ReactNode, useMemo } from "react";
import { useDataGridTheme } from "../DataGridTheme";
import { TableRow } from "../types/TableRow";

export interface TableFooterRowProps {
    height: number,
    bottom: number,
    frozen: boolean,
    tableRow: TableRow,
    children?: ReactNode | ReactNode[],
}

export const TableFooterRow = (props: TableFooterRowProps) => {
    const {
        height,
        bottom,
        frozen,
        children,
    } = props
    const styles = useStyles(frozen, height, bottom)
    const { tableFootRowComponent: Tr } = useDataGridTheme()
    return <Tr style={styles.root}>
        {children}
    </Tr>
}

const useStyles = (frozen: boolean, height: number, bottom: number) => {
    return useMemo<Record<string, CSSProperties>>(() => ({
        root: {
            position: frozen ? 'sticky' : undefined,
            height,
            bottom,
        }
    }), [bottom, frozen, height])
}