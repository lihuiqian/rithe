import { useLayoutEffect, useState } from "react"
import { MediaQuery } from "../types/MediaQuerySize"

export function useMediaQuery<T>(values: T | MediaQuery<T>[]): T | undefined
export function useMediaQuery<T>(values: T | MediaQuery<T>[], defaultValue: T): T
export function useMediaQuery<T>(values: T | MediaQuery<T>[], defaultValue?: T): T | undefined {
    const [value, setValue] = useState(() => {
        if (values instanceof Array) {
            if (values.length === 0) {
                return defaultValue
            } else {
                const windowWidth = window.innerWidth
                for (const value of values) {
                    if (value.from <= windowWidth && windowWidth < value.to) {
                        return value.value
                    }
                }
                return values[0].value
            }
        } else {
            return values
        }
    })
    useLayoutEffect(() => {
        if (!(values instanceof Array) || values.length === 0) return
        const onResize = (e: Event) => {
            const windowWidth = (e.currentTarget as Window).innerWidth
            for (const value of values) {
                if (value.from <= windowWidth && windowWidth < value.to) {
                    setValue(value.value)
                    break
                }
            }
        }
        window.addEventListener('resize', onResize)
        onResize({ currentTarget: window } as any)
        return () => window.removeEventListener('resize', onResize)
    }, [values])
    return value
}