import { RefObject, useLayoutEffect, useRef, useState } from "react"
import { THREE_LINE_BUTTON_DROPDOWN_WIDTH, THREE_LINE_BUTTON_TEXT_PADDING, THREE_LINE_ITEM_MAX_WIDTH, THREE_LINE_ITEM_MIN_WIDTH } from "../utils/constants"

const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')!

export const useLargeButtonLines = (text: string, dropdown?: boolean) => {
    const ref = useRef<HTMLElement>(null)
    const [lines, setLines] = useState([text])
    useLayoutEffect(() => {
        const element = ref.current
        if (!element) {
            setLines([text])
            return
        }

        const css = window.getComputedStyle(element)
        const font = `${css.fontSize} ${css.fontFamily}`
        context.font = font
        const width = context.measureText(text).width
        const minWidth = THREE_LINE_ITEM_MIN_WIDTH - THREE_LINE_BUTTON_TEXT_PADDING * 2
        const maxWidth = THREE_LINE_ITEM_MAX_WIDTH - THREE_LINE_BUTTON_TEXT_PADDING * 2
        if (width <= minWidth) {
            setLines([text])
            return
        }

        const dropdownWidth = dropdown ? THREE_LINE_BUTTON_DROPDOWN_WIDTH : 0
        const ellipsisWidth = context.measureText('...').width
        const spaceWidth = context.measureText(' ').width
        const hasSpace = text.indexOf(' ') > 0
        const words = hasSpace ? text.split(' ') : text.split('')
        const widths = words.map(word => context.measureText(word).width)
        const [first, second] = distribute(maxWidth, widths, dropdownWidth, hasSpace ? spaceWidth : 0, ellipsisWidth)

        if (first + second === words.length) {
            setLines([words.slice(0, first).join(hasSpace ? ' ' : ''), words.slice(first).join(hasSpace ? ' ' : '')])
        } else {
            setLines([words.slice(0, first).join(hasSpace ? ' ' : ''), words.slice(first, first + second).join(hasSpace ? ' ' : '') + '...'])
        }
    }, [dropdown, text])

    return [ref, lines] as [RefObject<HTMLElement | null>, string[]]
}

function distribute(maxWidth: number, widths: number[], dropdownWidth: number, spaceWidth: number, ellipsisWidth: number) {
    let first = 1, second = 1
    while (sum(widths.slice(0, first), spaceWidth) <= maxWidth && first <= widths.length) {
        first++
    }
    first--
    while (sum(widths.slice(first, first + second), spaceWidth) + dropdownWidth <= maxWidth && first + second <= widths.length) {
        second++
    }
    second--
    if (first + second === widths.length) {
        while (sum(widths.slice(0, first), spaceWidth) >= sum(widths.slice(first, first + second), spaceWidth) + dropdownWidth) {
            first--
            second++
        }
        return [first + 1, second - 1]
    } else {
        return [first, second]
    }
}

function sum(widths: number[], spaceWidth: number) {
    return widths.reduce((a, b) => a + b, 0) + spaceWidth * (widths.length - 1)
}