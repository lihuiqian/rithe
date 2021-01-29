import React, { CSSProperties, ReactNode, useMemo } from "react";
import { useDataGridTheme } from "../DataGridTheme";
import { Freeze } from "../types/Freeze";
import { CellProps } from "../types/TemplateBaseProps";

export interface DataGridTableBodyCellProps extends CellProps {
    freeze?: Freeze,
    freezePosition: number,
    children?: ReactNode | ReactNode[],
}

export const DataGridTableBodyCell = (props: DataGridTableBodyCellProps) => {
    const {
        freeze,
        freezePosition,
        colSpan, rowSpan,
        children } = props

    const freezeLeft = freeze === 'start'
    const freezeRight = freeze === 'end'

    const styles = useStyles(freezeLeft, freezeRight, freezePosition)
    const { tableBodyCellComponent: Td } = useDataGridTheme()
    return <Td colSpan={colSpan} rowSpan={rowSpan} style={styles.root}>
        {children}
    </Td>
}

const useStyles = (freezeLeft: boolean, freezeRight: boolean, freezePosition: number) => {
    return useMemo<Record<string, CSSProperties>>(() => ({
        root: {
            position: freezeLeft || freezeRight ? 'sticky' : undefined,
            left: freezeLeft ? freezePosition : undefined,
            right: freezeRight ? freezePosition : undefined,
        },
    }), [freezeLeft, freezePosition, freezeRight])
}