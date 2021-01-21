import React, { CSSProperties, ReactNode, useEffect, useMemo, useRef, useState } from "react";
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

    const ref = useRef<HTMLTableHeaderCellElement>(null)
    const [ltr, setLtr] = useState(true)
    useEffect(() => {
        if (!ref.current) return
        setLtr(window.getComputedStyle(ref.current).direction === 'ltr')
    }, [])
    const freezeLeft = (freeze === 'start' && ltr) || (freeze === 'end' && !ltr)
    const freezeRight = (freeze === 'start' && !ltr) || (freeze === 'end' && ltr)

    const style = useMemo<CSSProperties>(() => ({
        position: 'sticky',
        left: freezeLeft ? freezePosition : undefined,
        right: freezeRight ? freezePosition : undefined,
    }), [freezeLeft, freezePosition, freezeRight])
    const { tableBodyCellComponent: Td } = useDataGridTheme()
    return <Td ref={ref} colSpan={colSpan} rowSpan={rowSpan} style={style}>
        {children}
    </Td>
}