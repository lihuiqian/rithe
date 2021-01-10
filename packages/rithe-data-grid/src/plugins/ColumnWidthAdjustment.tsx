import { Plugin } from "@rithe/plugin"
import { Arrays, iter } from "@rithe/utils"
import React, { useCallback } from "react"
import { StatePipe } from "../StatePipe"
import Column from "../types/Column"

const DEFAULT_WIDTH = 120

export interface ColumnWidthAdjustmentProps {
    tableWidth?: number
}

export const ColumnWidthAdjustment = ({ tableWidth }: ColumnWidthAdjustmentProps) => {
    const computedDisplayColumns = useComputedDisplayColumns(tableWidth)

    return <Plugin>
        <StatePipe name="displayColumns" computed={computedDisplayColumns} />
    </Plugin>
}

const useComputedDisplayColumns = (tableWidth?: number) => {
    return useCallback((displayColumns?: Column[]) => {
        if (!tableWidth || !displayColumns) return displayColumns

        const dynamicColumns = displayColumns.filter(dc => dc.width === undefined)
        if (dynamicColumns.length === 0) return displayColumns

        const staticColumns = displayColumns.filter(dc => dc.width !== undefined)
        const fixedWidth = staticColumns.map(dc => dc.width!).reduce((a, b) => a + b, 0)
        const restWidth = tableWidth - fixedWidth
        const average = Math.max(DEFAULT_WIDTH, restWidth / dynamicColumns.length) | 0
        const widths = iter(Arrays.repeat(average, dynamicColumns.length))
            .fill(average + 1, 0, Math.max(0, restWidth - average * dynamicColumns.length))
            .value

        return displayColumns.map(dc => dc.width === undefined ? { ...dc, width: widths.shift() } : dc)
    }, [tableWidth])
}

