import { Arrays, iter } from '@rithe/utils';
import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

interface Tab {
    label: string,
    index: number,
    panel: ReactNode | ReactNode[],
}

interface Context {
    applicationButton: ReactNode | ReactNode[],
    registerApplicationButton: (applicationButton: ReactNode | ReactNode[]) => void,
    unregisterApplicationButton: () => void,
    quickAccess: ReactNode | ReactNode[],
    registerQuickAccess: (quickAccess: ReactNode | ReactNode[]) => void,
    unregisterQuickAccess: () => void,
    tabs: (Tab | undefined)[],
    registerTab: (label: string, index: number, panel: ReactNode | ReactNode[]) => void,
    unregisterTab: (index: number) => void,
    title: ReactNode | ReactNode[],
    registerTitle: (title: ReactNode | ReactNode[]) => void,
    unregisterTitle: () => void,
}

const RibbonContext = createContext<Context>(undefined as any)

export const useRibbonContext = () => useContext(RibbonContext)

export const RibbonContextProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
    const [applicationButton, setApplicationButton] = useState<ReactNode | ReactNode[]>(undefined)
    const registerApplicationButton = useCallback((applicationButton: ReactNode | ReactNode[]) => {
        setApplicationButton(applicationButton)
    }, [])
    const unregisterApplicationButton = useCallback(() => {
        setApplicationButton(undefined)
    }, [])

    const [quickAccess, setQuickAccess] = useState<ReactNode | ReactNode[]>(undefined)
    const registerQuickAccess = useCallback((quickAccess: ReactNode | ReactNode[]) => {
        setQuickAccess(quickAccess)
    }, [])
    const unregisterQuickAccess = useCallback(() => {
        setQuickAccess(undefined)
    }, [])

    const [tabs, setTabs] = useState<(Tab | undefined)[]>([])
    const registerTab = useCallback((label: string, index: number, panel: ReactNode | ReactNode[]) => {
        setTabs(tabs => {
            if (tabs.length <= index) {
                return iter(tabs).concat(Arrays.repeat(undefined, index - tabs.length + 1)).splice(index, 1, { label, index, panel }).value
            } else {
                return iter(tabs).splice(index, 1, { label, index, panel }).value
            }
        })
    }, [])
    const unregisterTab = useCallback((index: number) => {
        setTabs(tabs => {
            if (tabs.length <= index) {
                return tabs
            } else {
                return iter(tabs).splice(index, 1, undefined).value
            }
        })
    }, [])

    const [title, setTitle] = useState<ReactNode | ReactNode[]>(undefined)
    const registerTitle = useCallback((title: ReactNode | ReactNode[]) => {
        setTitle(title)
    }, [])
    const unregisterTitle = useCallback(() => {
        setTitle(undefined)
    }, [])

    const value = useMemo<Context>(() => ({
        applicationButton,
        registerApplicationButton,
        unregisterApplicationButton,
        quickAccess,
        registerQuickAccess,
        unregisterQuickAccess,
        tabs,
        registerTab,
        unregisterTab,
        title,
        registerTitle,
        unregisterTitle,
    }), [applicationButton, quickAccess, registerApplicationButton, registerQuickAccess, registerTab, registerTitle, tabs, title, unregisterApplicationButton, unregisterQuickAccess, unregisterTab, unregisterTitle])

    return <RibbonContext.Provider value={value}>
        {children}
    </RibbonContext.Provider>
}