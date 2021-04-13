import { makeStyles } from "@material-ui/core";
import clsx from 'clsx';
import React, { ReactNode, useLayoutEffect, useRef } from "react";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { Layout } from "./types/Layout";
import { MediaQuery } from "./types/MediaQuerySize";
import { GROUP_CONTENT_HEIGHT, GROUP_FONT_SIZE } from "./utils/constants";

export interface RibbonLayoutProps {
    layouts: Layout | MediaQuery<Layout>[],
    children?: ReactNode | ReactNode[],
}

export const RibbonLayout = (props: RibbonLayoutProps) => {
    const {
        layouts,
        children,
    } = props

    const layout = useMediaQuery(layouts, 'column')

    const ref = useRef<HTMLDivElement>(null)
    useLayoutEffect(() => {
        const root = ref.current
        const items = root?.children
        if (!root || !items) return
        const count = items.length
        if (count === 0) return
        const onResize = () => {
            if (layout === 'column') {
                let width = 0
                for (let i = Math.max(0, count - 3); i < count; i++) {
                    const element = items[i] as HTMLElement
                    width = Math.max(width, element.offsetLeft + element.offsetWidth)
                }
                root.style.width = `${width}px`
            } else {
                const widths = []
                for (let i = 0; i < count; i++) {
                    const element = items[i] as HTMLElement
                    widths.push(element.offsetWidth)
                }
                let width = 0
                let pendingRows = layout === '2row' ? 2 : 3
                while (pendingRows > 1) {
                    const stdWidth = widths.reduce((a, b) => a + b, 0) / pendingRows
                    let tryWidth = 0
                    while (tryWidth < stdWidth && widths.length > 0) {
                        tryWidth += widths.shift() ?? 0
                    }
                    width = Math.max(width, tryWidth)
                    pendingRows--
                }
                root.style.width = `${width + 1}px`
            }
        }
        window.addEventListener('resize', onResize)
        setTimeout(() => onResize(), 100)
        return () => window.removeEventListener('resize', onResize)
    }, [layout])

    const styles = useStyles()
    return <div
        ref={ref}
        className={clsx(
            styles.root,
            layout === 'column' && styles.column,
            layout === '2row' && styles.row,
            layout === '3row' && styles.row,
        )}
    >
        {children}
    </div>
}

const useStyles = makeStyles(() => ({
    root: {
        display: 'block',
        position: 'relative',
        padding: 0,
        fontSize: GROUP_FONT_SIZE,
    },
    column: {
        height: GROUP_CONTENT_HEIGHT,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    row: {
        height: GROUP_CONTENT_HEIGHT,
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'space-around',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
}))