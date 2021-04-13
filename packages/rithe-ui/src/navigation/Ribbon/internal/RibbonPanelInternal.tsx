import { Button, makeStyles } from "@material-ui/core";
import React, { ReactNode } from "react";

export interface RibbonPanelInternalProps {
    onCollapseClick: () => void,
    children: ReactNode | ReactNode[],
}

export const RibbonPanelInternal = (props: RibbonPanelInternalProps) => {
    const { onCollapseClick, children } = props
    const styles = useStyles()
    return <div className={styles.root}>
        <div className={styles.groups}>
            {children}
        </div>
        <div className={styles.control}>
            <Button onClick={onCollapseClick}>^</Button>
        </div>
    </div>
}

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        paddingTop: 6,
        paddingBottom: 4,
    },
    groups: {
        flex: '1 1 auto',
        overflow: 'hidden',
        display: 'flex',
    },
    control: {
        flex: '0 0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
}))