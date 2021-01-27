import React, { CSSProperties, ReactNode, useMemo } from "react";
import { Align } from "../types/Align";
import { CellContentProps } from "../types/TemplateBaseProps";

export interface DataGridTableHeaderCellContentProps extends CellContentProps {
    align: Align,
    children?: ReactNode | ReactNode[],
}

export const DataGridTableHeaderCellContent = (props: DataGridTableHeaderCellContentProps) => {
    const { align, children } = props

    const styles = useStyles(align)
    return <div style={styles.root}>
        {children}
    </div>
}

const useStyles = (align: Align) => {
    return useMemo<Record<string, CSSProperties>>(() => ({
        root: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: align === 'center' ? 'center' : `flex-${align}`,
            alignItems: 'center',
        },
    }), [align])
}