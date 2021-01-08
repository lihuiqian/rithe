import { Plugin } from "@rithe/plugin"
import { Arrays, iter } from "@rithe/utils"
import React, { useCallback } from "react"
import StatePipe from "../StatePipe"
import Column from "../types/Column"

const DEFAULT_WIDTH = 120

const ColumnWidthAdjustment = () => {

    const computedDisplayColumns = useComputedDisplayColumns()

    return <Plugin>
        <StatePipe name="displayColumns" computed={computedDisplayColumns} dependencyNames={["tableWidth"]} />
    </Plugin>
}

const useComputedDisplayColumns = () => {
    return useCallback((displayColumns?: Column[], tableWidth?: number) => {
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
    }, [])
}

export default ColumnWidthAdjustment