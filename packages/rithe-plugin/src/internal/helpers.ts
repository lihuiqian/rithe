import { Arrays, Comparator, Comparators } from "@rithe/utils";

export const positionComparator: Comparator<number[]> = (pos1: number[], pos2: number[]) => {
    for (const [num1, num2] of Arrays.zip(pos1, pos2)) {
        const cmp = Comparators.NATUAL_ORDER(num1, num2)
        if (cmp !== 0) return cmp
    }
    return Comparators.NATUAL_ORDER(pos1.length, pos2.length)
}

export function insertItem<T extends {
    readonly name: string
    readonly position: number[]
}>(items: T[], item: T) {
    for (let i = 0; i < items.length; i++) {
        const cmp = positionComparator(item.position, items[i].position)
        if (cmp > 0) continue
        items.splice(i, 0, item)
        return
    }
    items.push(item)
}

export function removeItem<T extends {
    readonly name: string
    readonly position: number[]
}>(items: T[], item: T) {
    const index = items.indexOf(item)
    return index < 0 ? undefined : items.splice(index, 1)
}

export function itemsPrev<T extends {
    readonly name: string
    readonly position: number[]
}>(items: T[], position: number[], name?: string) {
    return itemsBetween(items, undefined, position, name)
}

export function itemsNext<T extends {
    readonly name: string
    readonly position: number[]
}>(items: T[], position: number[], name?: string) {
    return itemsBetween(items, position, undefined, name)
}

export function itemsBetween<T extends {
    readonly name: string
    readonly position: number[]
}>(items: T[], start?: number[], end?: number[], name?: string) {
    const result: T[] = []
    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (name && item.name !== name) continue

        const cmpStart = start ? positionComparator(item.position, start) : 1
        if (cmpStart <= 0) continue

        const cmpEnd = end ? positionComparator(item.position, end) : -1
        if (cmpEnd >= 0) break

        result.push(item)
    }
    return result
}