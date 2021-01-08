import React, { ReactNode, useCallback, useContext, useState } from 'react'
import PositionContext from './PositionContext'

const PluginIndexer = ({ children }: { children: ReactNode | ReactNode[] }) => {
    const [cache, setCache] = useState<{ [index: number]: number[] }>({})

    const addCache = useCallback((index: number, position: number[]) => {
        setCache(cache => ({ ...cache, [index]: position }))
        return position
    }, [])
    const calculatePosition = useCallback((position: number[], index: number) => {
        return addCache(index, [...position, index])
    }, [addCache])

    const position = useContext(PositionContext)
    return <>
        {React.Children.map(children, (child: any, index: number) => {
            if (!child || !child.type) return child
            const pos = cache[index] || calculatePosition(position, index)
            return <PositionContext.Provider key={index} value={pos}>
                {child}
            </PositionContext.Provider>
        })}
    </>
}

export default PluginIndexer
