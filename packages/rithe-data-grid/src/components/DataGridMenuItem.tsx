import React, { CSSProperties, ReactNode, useMemo } from "react";
import { useDataGridTheme } from "../DataGridTheme";

export interface DataGridMenuItemProps {
    icon?: ReactNode | ReactNode[],
    children?: ReactNode | ReactNode[],
}

export const DataGridMenuItem = (props: DataGridMenuItemProps) => {
    const { icon, children } = props

    const styles = useStyles()
    const { menuItemComponent: Li } = useDataGridTheme()
    return <Li style={styles.root}>
        <div style={styles.icon}>{icon}</div>
        <div style={styles.content}>{children}</div>
    </Li>
}

const useStyles = () => {
    return useMemo<Record<string, CSSProperties>>(() => ({
        root: {
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'stretch',
        },
        icon: {
            flex: '0 0 48'
        },
        content: {
            flex: '1 1 auto',
            overflow: 'hidden',
        }
    }), [])
}