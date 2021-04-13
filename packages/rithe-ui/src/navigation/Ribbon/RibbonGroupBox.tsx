import { makeStyles } from "@material-ui/core";
import React, { ReactNode, useLayoutEffect, useRef } from "react";
import { GROUP_CONTENT_HEIGHT, GROUP_FONT_SIZE, GROUP_SIDE_PADDING, GROUP_TITLE_HEIGHT } from "./utils/constants";

export interface RibbonGroupBoxProps {
    title?: string,
    children?: ReactNode | ReactNode[],
}

export const RibbonGroupBox = (props: RibbonGroupBoxProps) => {
    const {
        title,
        children,
    } = props

    const ref = useRef<HTMLDivElement>(null)
    useLayoutEffect(() => {
        const root = ref.current
        if (!root) return
        const enter = () => {
            root.style.transform = 'translateX(0px)'
            root.style.opacity = '1'
        }
        const timeoutId = setTimeout(() => enter(), 100)
        return () => clearTimeout(timeoutId)
    }, [])

    const styles = useStyles()
    return <>
        <div ref={ref} className={styles.root}>
            <div className={styles.content}>
                {children}
            </div>
            <div className={styles.title}>
                {title}
            </div>
        </div>
    </>
}

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        boxSizing: 'content-box',
        paddingLeft: GROUP_SIDE_PADDING,
        paddingRight: GROUP_SIDE_PADDING,
        borderRight: `${1}px solid ${theme.palette.divider}`,
        position: 'relative',
        opacity: 0,
        transform: 'translateX(-20px)',
        transition: `all ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`,
    },
    content: {
        height: GROUP_CONTENT_HEIGHT,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },
    title: {
        height: GROUP_TITLE_HEIGHT,
        fontSize: GROUP_FONT_SIZE,
        color: theme.palette.text.primary,
        lineHeight: '18px',
        verticalAlign: 'middle',
        textAlign: 'center',
    },
}))