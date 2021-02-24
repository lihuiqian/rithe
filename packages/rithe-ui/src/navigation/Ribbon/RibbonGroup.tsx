import { makeStyles } from "@material-ui/core";
import React, { ReactNode, useLayoutEffect, useRef } from "react";
import { GROUP_CONTENT_HEIGHT, GROUP_FONT_SIZE, GROUP_SIDE_PADDING, GROUP_TITLE_HEIGHT } from "./utils/constants";

export interface RibbonGroupProps {
    title?: string,
    children?: ReactNode | ReactNode[],
}

export const RibbonGroup = (props: RibbonGroupProps) => {
    const {
        title,
        children,
    } = props

    const ref = useRef<HTMLDivElement>(null)
    useLayoutEffect(() => {
        const root = ref.current
        const items = root?.firstElementChild?.children
        if (!root || !items) return
        const count = items.length
        if (count === 0) return
        const onResize = () => {
            let width = 0
            for (let i = Math.max(0, count - 3); i < count; i++) {
                const element = items[i] as HTMLElement
                width = Math.max(width, element.offsetLeft + element.offsetWidth)
            }
            root.style.width = `${width}px`
            root.style.transform = 'translateX(0px)'
            root.style.opacity = '1'
        }
        window.addEventListener('resize', onResize)
        setTimeout(() => onResize(), 100)
        return () => window.removeEventListener('resize', onResize)
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
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
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