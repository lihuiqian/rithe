import { Arrays } from "@rithe/utils"

const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')!

export function splitText(text: string, font: string, lineCount: number, breakPoint: number, icon: number): string[] {
    context.font = font
    const width = context.measureText(text).width
    if (width <= breakPoint) return [text]

    const charsPerLine = Math.ceil((width + icon) / lineCount / width * text.length)
    return Arrays.range(0, lineCount).map(index => text.slice(index * charsPerLine, (index + 1) * charsPerLine)).filter(s => s !== undefined)
}