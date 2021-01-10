import React, { CSSProperties, ReactNode, useMemo } from "react";
import { Row, RowId } from "..";
import { useDataGridTheme } from "./DataGridTheme";

export interface DataGridTableBodyRowProps {
    height?: number,
    rowId: RowId,
    row: Row,
    children: ReactNode | ReactNode[],
}

export const DataGridTableBodyRow = ({ height, children }: DataGridTableBodyRowProps) => {
    const { tableBodyRowComponent: Tr } = useDataGridTheme()
    const style = useMemo<CSSProperties | undefined>(() => height === undefined ? undefined : ({ height }), [height])
    return <Tr style={style}>{children}</Tr>
}