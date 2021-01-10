import React, { CSSProperties, ReactNode, useMemo } from "react";
import { useDataGridTheme } from "./DataGridTheme";

export interface DataGridTableHeaderRowProps {
    height?: number,
    children: ReactNode | ReactNode[],
}

export const DataGridTableHeaderRow = ({ height, children }: DataGridTableHeaderRowProps) => {
    const { tableHeadRowComponent: Tr } = useDataGridTheme()
    const style = useMemo<CSSProperties | undefined>(() => height === undefined ? undefined : ({ height }), [height])
    return <Tr style={style}>{children}</Tr>
}