import React, { CSSProperties, ReactNode, useMemo } from "react";
import { useDataGridTheme } from "../DataGridTheme";
import { BodyRowProps } from "../types/TemplateBaseProps";

export interface DataGridTableBodyRowProps extends BodyRowProps {
    children?: ReactNode | ReactNode[],
}

export const DataGridTableBodyRow = (props: DataGridTableBodyRowProps) => {
    const { height, children } = props
    const styles = useStyles(height)
    const { tableBodyRowComponent: Tr } = useDataGridTheme()
    return <Tr style={styles.root}>{children}</Tr>
}

const useStyles = (height: number) => useMemo<Record<string, CSSProperties>>(() => ({
    root: {
        height
    }
}), [height])