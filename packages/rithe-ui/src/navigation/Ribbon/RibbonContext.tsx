import { Arrays, iter } from '@rithe/utils';
import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

interface Tab {
    label: string,
    index: number,
    panel: ReactNode | ReactNode[],
}

interface Context {
    action: ReactNode | ReactNode[],
    registerAction: (action: ReactNode | ReactNode[]) => void,
    unregisterAction: () => void,
    tabs: (Tab | undefined)[],
    registerTab: (label: string, index: number, panel: ReactNode | ReactNode[]) => void,
    unregisterTab: (index: number) => void,
    title: ReactNode | ReactNode[],
    registerTitle: (title: ReactNode | ReactNode[]) => void,
    unregisterTitle: () => void,
    control: ReactNode | ReactNode[],
    registerControl: (control: ReactNode | ReactNode[]) => void,
    unregisterControl: () => void,
}

const RibbonContext = createContext<Context>(undefined as any)

export const useRibbonContext = () => useContext(RibbonContext)

export const RibbonContextProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
    const [action, setAction] = useState<ReactNode | ReactNode[]>(undefined)
    const registerAction = useCallback((action: ReactNode | ReactNode[]) => {
        setAction(action)
    }, [])
    const unregisterAction = useCallback(() => {
        setAction(undefined)
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

    const [control, setControl] = useState<ReactNode | ReactNode[]>(undefined)
    const registerControl = useCallback((control: ReactNode | ReactNode[]) => {
        setControl(control)
    }, [])
    const unregisterControl = useCallback(() => {
        setControl(undefined)
    }, [])

    const value = useMemo<Context>(() => ({
        action,
        registerAction,
        unregisterAction,
        tabs,
        registerTab,
        unregisterTab,
        title,
        registerTitle,
        unregisterTitle,
        control,
        registerControl,
        unregisterControl,
    }), [action, control, registerAction, registerControl, registerTab, registerTitle, tabs, title, unregisterAction, unregisterControl, unregisterTab, unregisterTitle])

    return <RibbonContext.Provider value={value}>
        {children}
    </RibbonContext.Provider>
}