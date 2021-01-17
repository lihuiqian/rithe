import { useShallowPrevious } from "@rithe/utils"
import { useContext, useLayoutEffect, useMemo, useReducer, useRef } from "react"
import { PositionContext } from './internal/PositionContext'
import { Subscription } from "./internal/Subscription"
import { TemplateContext } from './internal/TemplateContext'

export const useTemplate = (name: string, param: any) => {
    param = useShallowPrevious(param, param)
    const position = useContext(PositionContext)
    const core = useContext(TemplateContext)
    const [, forceUpdate] = useReducer(s => s + 1, 0)
    const sub = useMemo(() => new Subscription(name, position), [name, position])

    const latestName = useRef<string>('')
    const latestParam = useRef<any>()
    const latestRender = useRef<(param: any, ...states: any[]) => JSX.Element>()
    const latestStateNames = useRef<string[]>()

    const diff = name !== latestName.current || param !== latestParam.current
    let render: ((param: any, ...states: any[]) => JSX.Element) | undefined, stateNames: string[] | undefined
    if (diff) {
        const template = core.slice(name, position, param)
        template && ({ render, stateNames } = template)
    } else {
        render = latestRender.current
        stateNames = latestStateNames.current
    }

    useLayoutEffect(() => {
        latestName.current = name
        latestParam.current = param
        latestRender.current = render
        latestStateNames.current = stateNames
    }, [name, param, render, stateNames])

    useLayoutEffect(() => {
        const checkForUpdate = () => {
            const newTemplate = core.slice(latestName.current, position, latestParam.current)
            const newRender = newTemplate?.render
            const newStateNames = newTemplate?.stateNames
            if (newRender !== latestRender.current || newStateNames !== latestStateNames.current) {
                latestRender.current = newRender
                latestStateNames.current = newStateNames
                forceUpdate()
            }
        }
        sub.subscribe = checkForUpdate

        core.subscribe(sub)
        checkForUpdate()
        return () => core.unsubscribe(sub)
    }, [core, position, sub])

    return { render, stateNames }
}