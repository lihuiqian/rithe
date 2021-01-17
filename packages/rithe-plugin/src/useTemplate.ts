import { useShallowPrevious } from "@rithe/utils"
import { useContext, useLayoutEffect, useMemo, useReducer, useRef } from "react"
import { PositionContext } from './internal/PositionContext'
import { Subscription } from "./internal/Subscription"
import { Template } from "./internal/Template"
import { TemplateContext } from './internal/TemplateContext'

export const useTemplate = (name: string, param: any) => {
    param = useShallowPrevious(param, param)
    const position = useContext(PositionContext)
    const core = useContext(TemplateContext)
    const [, forceUpdate] = useReducer(s => s + 1, 0)
    const sub = useMemo(() => new Subscription(name, position), [name, position])

    const latestName = useRef<string>('')
    const latestParam = useRef<any>()
    const latestTemplate = useRef<Template>()

    const diff = name !== latestName.current || param !== latestParam.current
    const template = diff ? core.slice(name, position, param) : latestTemplate.current

    useLayoutEffect(() => {
        latestName.current = name
        latestParam.current = param
        latestTemplate.current = template
    }, [name, param, template])

    useLayoutEffect(() => {
        const checkForUpdate = () => {
            const newTemplate = core.slice(latestName.current, position, latestParam.current)
            if (newTemplate !== latestTemplate.current) {
                latestTemplate.current = newTemplate
                forceUpdate()
            }
        }

        sub.subscribe = checkForUpdate
        core.subscribe(sub)

        checkForUpdate()

        return () => core.unsubscribe(sub)
    }, [core, position, sub])

    return template
}