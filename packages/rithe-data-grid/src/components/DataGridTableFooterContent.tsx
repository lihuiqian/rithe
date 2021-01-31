import React, { CSSProperties, ReactNode, useMemo } from "react";
import { Align } from "../types/Align";
import { FooterContentProps } from "../types/TemplateBaseProps";

export interface DataGridTableFooterContentProps extends FooterContentProps {
    children?: ReactNode | ReactNode[],
}

export const DataGridTableFooterContent = (props: DataGridTableFooterContentProps) => {
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