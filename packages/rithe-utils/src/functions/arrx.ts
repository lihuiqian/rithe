export default function arrx<T>(...items: (T | boolean | undefined)[]): T[] {
    return items.filter(item => item !== null && item !== undefined && item !== true && item !== false) as T[]
}