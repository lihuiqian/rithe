import { makeStyles } from "@material-ui/core";
import React, { ReactNode } from "react";

export interface DataGridPaginationProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridPagination = (props: DataGridPaginationProps) => {
    const { children } = props
    const styles = useStyles()
    return <div className={styles.root}>{children}</div>
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: theme.spacing(2),
        '&>*': {
            marginLeft: theme.spacing(2)
        }
    }
}))