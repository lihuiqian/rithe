import React, { CSSProperties, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useDataGridTheme } from "../DataGridTheme";
import { Freeze } from "../types/Freeze";
import { CellProps } from "../types/TemplateBaseProps";

export interface DataGridTableHeaderCellProps extends CellProps {
    width: number,
    freeze?: Freeze,
    freezePosition: number,
    children?: ReactNode | ReactNode[],
}

export const DataGridTableHeaderCell = (props: DataGridTableHeaderCellProps) => {
    const {
        width,
        freeze,
        freezePosition,
        colSpan, rowSpan,
        children } = props

    const ref = useRef<HTMLTableHeaderCellElement>(null)
    const [ltr, setLtr] = useState(true)
    useEffect(() => {
        if (!ref.current) return
        setLtr(window.getComputedStyle(ref.current).direction === 'ltr')
    }, [])
    const freezeLeft = (freeze === 'start' && ltr) || (freeze === 'end' && !ltr)
    const freezeRight = (freeze === 'start' && !ltr) || (freeze === 'end' && ltr)

    const styles = useStyles(width, freezeLeft, freezeRight, freezePosition)
    const { tableHeadCellComponent: Th } = useDataGridTheme()
    return <Th ref={ref} colSpan={colSpan} rowSpan={rowSpan} style={styles.root}>
        {children}
    </Th>
}

const useStyles = (width: number, freezeLeft: boolean, freezeRight: boolean, freezePosition: number) => {
    return useMemo<Record<string, CSSProperties>>(() => ({
        root: {
            width,
            maxWidth: width,
            minWidth: width,
            position: 'sticky',
            left: freezeLeft ? freezePosition : undefined,
            right: freezeRight ? freezePosition : undefined,
        },
    }), [freezeLeft, freezePosition, freezeRight, width])
}