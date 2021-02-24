import { useLayoutEffect, useState } from "react"
import { MediaQuery } from "../types/MediaQuerySize"
import { Size } from "../types/Size"

export const useButtonSize = (sizes: Size | MediaQuery<Size>[]) => {
    const [size, setSize] = useState(() => {
        if (typeof sizes === 'string') {
            return sizes
        } else if (sizes.length === 0) {
            return 'middle'
        } else {
            const windowWidth = window.innerWidth
            for (const size of sizes) {
                if (size.from <= windowWidth && windowWidth < size.to) {
                    return size.value
                }
            }
            return sizes[0].value
        }
    })
    useLayoutEffect(() => {
        if (typeof sizes === 'string' || sizes.length === 0) {
            return
        }
        const onResize = (e: Event) => {
            const windowWidth = (e.currentTarget as Window).innerWidth
            for (const size of sizes) {
                if (size.from <= windowWidth && windowWidth < size.to) {
                    setSize(size.value)
                    break
                }
            }
        }
        window.addEventListener('resize', onResize)
        onResize({ currentTarget: window } as any)
        return () => window.removeEventListener('resize', onResize)
    }, [sizes])
    return size
}