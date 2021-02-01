import React, { CSSProperties, ReactNode, useMemo } from "react";
import { useDataGridTheme } from "../DataGridTheme";
import { HeaderCellProps } from "../types/TemplateBaseProps";

export interface DataGridBandingCellProps extends HeaderCellProps {
    children?: ReactNode | ReactNode[],
}

export const DataGridBandingCell = (props: DataGridBandingCellProps) => {
    const {
        width,
        freeze,
        freezePosition,
        colSpan, rowSpan,
        children } = props

    const freezeLeft = freeze === 'start'
    const freezeRight = freeze === 'end'

    const styles = useStyles(width, freezeLeft, freezeRight, freezePosition)
    const { tableHeadCellComponent: Th } = useDataGridTheme()
    return <Th colSpan={colSpan} rowSpan={rowSpan} style={styles.root}>
        {children}
    </Th>
}

const useStyles = (width: number, freezeLeft: boolean, freezeRight: boolean, freezePosition?: number) => {
    return useMemo<Record<string, CSSProperties>>(() => ({
        root: {
            width,
            maxWidth: width,
            minWidth: width,
            position: freezeLeft || freezeRight ? 'sticky' : undefined,
            left: freezeLeft ? freezePosition : undefined,
            right: freezeRight ? freezePosition : undefined,
        },
    }), [freezeLeft, freezePosition, freezeRight, width])
}