import React, { useContext, useEffect } from "react";
import { PositionContext } from "./internal/PositionContext";
import { ConditionalTemplate } from './internal/Template';
import { TemplateContext } from "./internal/TemplateContext";

export interface TemplateProps {
    name: string,
    predicate?: (param: any) => boolean,
    stateNames?: string[],
    children: (param: any, ...states: any[]) => JSX.Element,
}

export const Template = ({ name, predicate, stateNames, children }: TemplateProps) => {
    const position = useContext(PositionContext)
    const core = useContext(TemplateContext)

    useEffect(() => {
        const template = new ConditionalTemplate(name, position, predicate, children, stateNames ?? [])
        core.register(template)
        return () => core.unregister(template)
    }, [children, core, name, position, predicate, stateNames])

    return <></>
}