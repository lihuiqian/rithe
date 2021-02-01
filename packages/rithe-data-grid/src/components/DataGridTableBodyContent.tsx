import React, { CSSProperties, ReactNode, useMemo } from "react";
import { Align } from "../types/Align";
import { BodyContentProps } from "../types/TemplateBaseProps";

export interface DataGridTableBodyContentProps extends BodyContentProps {
    children?: ReactNode | ReactNode[],
}

export const DataGridTableBodyContent = (props: DataGridTableBodyContentProps) => {
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