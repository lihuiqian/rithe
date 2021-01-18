import { Arrays, useShallowPrevious } from "@rithe/utils"
import { useContext, useLayoutEffect, useMemo, useReducer, useRef } from "react"
import { PositionContext } from './internal/PositionContext'
import { Subscription } from "./internal/Subscription"
import { TemplateContext } from './internal/TemplateContext'

export const useTemplates = (name: string, param: any) => {
    param = useShallowPrevious(param, param)
    const position = useContext(PositionContext)
    const core = useContext(TemplateContext)
    const [, forceUpdate] = useReducer(s => s + 1, 0)
    const sub = useMemo(() => new Subscription(name, position), [name, position])

    const latestName = useRef<string>('')
    const latestParam = useRef<any>()
    const latestTemplates = useRef<{ render: (param: any, ...states: any[]) => JSX.Element, stateNames: string[] }[]>([])

    const diff = name !== latestName.current || param !== latestParam.current
    const templates = diff ? core.available(name, position, param) : latestTemplates.current
    console.log(diff, templates)

    useLayoutEffect(() => {
        latestName.current = name
        latestParam.current = param
        latestTemplates.current = templates
    }, [name, param, templates])

    useLayoutEffect(() => {
        const checkForUpdate = () => {
            const newTemplates = core.available(latestName.current, position, latestParam.current)
            const same = newTemplates.length === latestTemplates.current.length
                && Arrays.zip(newTemplates, latestTemplates.current)
                    .map(([a, b]) => a.render === b.render && Arrays.equals(a.stateNames, b.stateNames))
                    .reduce((a, b) => a && b, true)
            if (!same) {
                latestTemplates.current = newTemplates
                forceUpdate()
            }
        }
        sub.subscribe = checkForUpdate

        core.subscribe(sub)
        checkForUpdate()
        return () => core.unsubscribe(sub)
    }, [core, position, sub])

    return templates
}