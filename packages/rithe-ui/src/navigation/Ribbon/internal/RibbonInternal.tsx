import { Divider, makeStyles } from "@material-ui/core"
import React, { CSSProperties, useCallback, useEffect, useState } from "react"
import { useRibbonContext } from "../RibbonContext"
import { PANEL_HEIGHT, TAB_HEIGHT } from "../utils/constants"
import { RibbonTabInternal } from "./RibbonTabInternal"
import { RibbonTabsInternal } from "./RibbonTabsInternal"
import { RibbonTabTitleInternal } from "./RibbonTabTitleInternal"

export interface RibbonInternalProps {
    className?: string,
    style?: CSSProperties,
}

export const RibbonInternal = (props: RibbonInternalProps) => {
    const { className, style } = props
    const { action, tabs, title, control } = useRibbonContext()
    const effectTabs = tabs.filter(tab => tab !== undefined).map(tab => tab!)

    const [tabIndex, setTabIndex] = useState<number>(0)
    useEffect(() => {
        if (tabIndex === 0 && effectTabs.length > 0) setTabIndex(effectTabs[0].index)
    }, [effectTabs, tabIndex])
    const onTabIndexChange = useCallback((event: React.ChangeEvent<any>, newValue: number) => {
        setTabIndex(newValue)
    }, [])
    console.log(effectTabs, effectTabs.find(tab => tab.index === tabIndex))

    const styles = useStyles()
    return <div className={`${styles.root} ${className}`} style={style}>
        <div className={styles.tab}>
            {action && <>
                <div className={styles.action}>
                    {action}
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
                        />)}
                </RibbonTabsInternal>
            </div>
            {title && <div className={styles.title}>
                <RibbonTabTitleInternal>{title}</RibbonTabTitleInternal>
            </div>}
            {control && <div className={styles.control}>
                {control}
            </div>}
        </div>
        <div key={tabIndex} className={styles.panel}>
            {effectTabs.find(tab => tab.index === tabIndex)?.panel}
        </div>
    </div>
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.default,
    },
    tab: {
        width: '100%',
        height: TAB_HEIGHT,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    action: {
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
        paddingTop: 6,
        paddingBottom: 4,
        overflow: 'hidden',
        display: 'flex',
    },
}))