import { Arrays } from "@rithe/utils"
import React from "react"
import { Render } from "../Render"
import { CellProps } from "../TemplateBaseProps"

export const RenderCell = React.memo((props: CellProps) => {
    return <Render name="cell" props={props} />
}, (a, b) => a.width === b.width
    && a.colSpan === b.colSpan
    && a.rowSpan === b.rowSpan
    && a.freezePosition === b.freezePosition
    && a.freezeOffset === b.freezeOffset
    && Arrays.shallowEquals(a.tableColumns, b.tableColumns)
    && Arrays.shallowEquals(a.tableRows, b.tableRows))
RenderCell.displayName = 'RenderCell'