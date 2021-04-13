import { makeStyles } from "@material-ui/core";
import React, { ReactNode } from "react";
import { ONE_LINE_ITEM_HEIGHT } from "./utils/constants";

export interface RibbonComboProps {
    children?: ReactNode | ReactNode[],
}

export const RibbonCombo = (props: RibbonComboProps) => {
    const {
        children,
    } = props

    const styles = useStyles()
    return <div
        className={styles.root}
    >
        {children}
    </div>
}

const useStyles = makeStyles(() => ({
    root: {
        height: ONE_LINE_ITEM_HEIGHT,
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
}))