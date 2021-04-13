import { makeStyles } from "@material-ui/core";
import React, { ReactNode } from "react";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { MediaQuery } from "./types/MediaQuerySize";
import { Size } from "./types/Size";
import { GROUP_FONT_SIZE, ONE_LINE_BUTTON_ICON_SIZE, ONE_LINE_ITEM_HEIGHT, ONE_LINE_ITEM_TEXT_PADDING } from "./utils/constants";

export interface RibbonLabelProps {
    icon?: ReactNode,
    text: string,
    sizes: Exclude<Size, 'large'> | MediaQuery<Exclude<Size, 'large'>>[],
}

export const RibbonLabel = (props: RibbonLabelProps) => {
    const {
        icon,
        text,
        sizes,
    } = props

    const size = useMediaQuery(sizes, 'middle')

    const styles = useStyles()
    return <div
        className={styles.root}
    >
        {icon && <span className={styles.icon}>{icon}</span>}
        {size === 'middle' && <span className={styles.label}>{text}</span>}
    </div>
}

const useStyles = makeStyles(() => ({
    root: {
        height: ONE_LINE_ITEM_HEIGHT,
        display: 'block',
        position: 'relative',
    },
    icon: {
        display: 'inline-block',
        width: ONE_LINE_BUTTON_ICON_SIZE,
        height: ONE_LINE_BUTTON_ICON_SIZE,
    },
    label: {
        display: 'inline-block',
        fontSize: GROUP_FONT_SIZE,
        lineHeight: `${ONE_LINE_ITEM_HEIGHT}px`,
        verticalAlign: 'top',
        paddingLeft: ONE_LINE_ITEM_TEXT_PADDING,
        paddingRight: ONE_LINE_ITEM_TEXT_PADDING,
    },
}))