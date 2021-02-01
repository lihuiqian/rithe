import React, { CSSProperties, ReactNode, useMemo } from "react";
import { useDataGridTheme } from "../DataGridTheme";

export interface DataGridGroupingRowProps {
    height: number,
    children?: ReactNode | ReactNode[]
}

export const DataGridGroupingRow = (props: DataGridGroupingRowProps) => {
    const { height, children } = props
    const styles = useStyles(height)
    const { tableBodyRowComponent: Tr } = useDataGridTheme()
    return <Tr style={styles.root}>{children}</Tr>
}

const useStyles = (height: number) => useMemo<Record<string, CSSProperties>>(() => ({
    root: {
        height,
    }
}), [])