import { makeStyles } from "@material-ui/core";
import React, { MouseEvent, ReactNode } from "react";

export interface DataGridSortingHeaderContentProps {
    switchDirection: (e: MouseEvent) => void,
    children?: ReactNode | ReactNode[],
}

export const DataGridSortingHeaderContent = (props: DataGridSortingHeaderContentProps) => {
    const {
        switchDirection,
        children,
    } = props

    const styles = useStyles()
    return <div onClick={switchDirection} className={styles.root}>
        {children}
    </div>
}

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
    },
})