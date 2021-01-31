import React, { CSSProperties, ReactNode, useMemo } from "react";
import { useDataGridTheme } from "../DataGridTheme";
import { HeaderRowProps } from "../types/TemplateBaseProps";

export interface DataGridTableHeaderRowProps extends HeaderRowProps {
    children?: ReactNode | ReactNode[],
}

export const DataGridTableHeaderRow = (props: DataGridTableHeaderRowProps) => {
    const { top, height, children } = props
    const { tableHeadRowComponent: Tr } = useDataGridTheme()
    const styles = useStyles(top, height)
    return <Tr style={styles.root}>{children}</Tr>
}

const useStyles = (top: number, height: number) => useMemo<Record<string, CSSProperties>>(() => ({
    root: {
        position: 'sticky',
        top,
        height
    }
}), [height, top])