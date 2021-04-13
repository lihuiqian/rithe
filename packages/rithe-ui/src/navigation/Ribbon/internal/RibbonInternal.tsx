import { Divider, makeStyles } from "@material-ui/core"
import React, { CSSProperties, useCallback, useEffect, useState } from "react"
import { useRibbonContext } from "../RibbonContext"
import { RibbonTabButton } from "../RibbonTabButton"
import { PANEL_HEIGHT, TAB_HEIGHT } from "../utils/constants"
import { RibbonPanelInternal } from "./RibbonPanelInternal"
import { RibbonTabInternal } from "./RibbonTabInternal"
import { RibbonTabsInternal } from "./RibbonTabsInternal"
import { RibbonTabTitleInternal } from "./RibbonTabTitleInternal"

export interface RibbonInternalProps {
    className?: string,
    style?: CSSProperties,
}

export const RibbonInternal = (props: RibbonInternalProps) => {
    const { className, style } = props
    const { applicationButton, quickAccess, tabs, title } = useRibbonContext()
    const effectTabs = tabs.filter(tab => tab !== undefined).map(tab => tab!)

    const [tabIndex, setTabIndex] = useState<number>(0)
    useEffect(() => {
        if (tabIndex === 0 && effectTabs.length > 0) setTabIndex(effectTabs[0].index)
    }, [effectTabs, tabIndex])
    const onTabIndexChange = useCallback((_: React.ChangeEvent<any>, newValue: number) => {
        setTabIndex(newValue)
    }, [])
    const [collapse, setCollapse] = useState(false)
    const onTabCollapse = useCallback(() => setCollapse(true), [])
    const onTabExpand = useCallback(() => setCollapse(false), [])

    const styles = useStyles()
    return <div className={`${styles.root} ${className}`} style={style}>
        <div className={styles.menu}>
            {applicationButton && <>
                <div className={styles.applicationButton}>
                    {applicationButton}
                </div>
                <Divider orientation="vertical" className={styles.divider} />
            </>}
            {quickAccess && <>
                <div className={styles.quickAccess}>
                    {quickAccess}
                </div>
                <Divider orientation="vertical" className={styles.divider} />
            </>}
            <div className={styles.tabs}>
                <RibbonTabsInternal value={tabIndex} onChange={onTabIndexChange}>
                    {effectTabs.map(tab =>
                        <RibbonTabInternal
                            key={tab.index}
                            value={tab.index}
                            label={tab.label}
                            onClick={onTabExpand}
                        />)}
                </RibbonTabsInternal>
            </div>
            {title && <div className={styles.title}>
                <RibbonTabTitleInternal>{title}</RibbonTabTitleInternal>
            </div>}
            <div className={styles.control} style={{ opacity: collapse ? 1 : 0 }}>
                <RibbonTabButton icon="∨" onClick={onTabExpand} disabled={!collapse} />
            </div>
        </div>
        <div key={tabIndex} className={styles.panel} style={collapse ? { height: 0 } : undefined}>
            <RibbonPanelInternal onCollapseClick={onTabCollapse}>
                {effectTabs.find(tab => tab.index === tabIndex)?.panel}
            </RibbonPanelInternal>
        </div>
    </div>
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.default,
        boxShadow: theme.shadows[5],
    },
    menu: {
        width: '100%',
        height: TAB_HEIGHT,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        boxSizing: 'border-box',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    applicationButton: {
        height: '100%',
        flex: '0 0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    quickAccess: {
        height: '100%',
        flex: '0 0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    tabs: {
        height: '100%',
        flex: '0 0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        height: '100%',
        flex: '1 1 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    control: {
        height: '100%',
        flex: '0 0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        opacity: 0,
        transition: `opacity ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`,
    },
    divider: {
        height: '60%',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    panel: {
        width: '100%',
        height: PANEL_HEIGHT,
        boxSizing: 'border-box',
        transition: `height ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`,
        overflow: 'hidden',
    },
}))