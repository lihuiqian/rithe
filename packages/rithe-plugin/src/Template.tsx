import React, { useContext, useEffect } from "react";
import { PositionContext } from "./internal/PositionContext";
import { ConditionalTemplate, ReservedTemplate } from './internal/Template';
import { TemplateContext } from "./internal/TemplateContext";

export interface TemplateProps {
    name: string,
    predicate?: (props: any) => boolean,
    stateNames?: string[],
    children: (props: any, ...states: any[]) => JSX.Element,
}

export const Template = ({ name, predicate, stateNames, children }: TemplateProps) => {
    const position = useContext(PositionContext)
    const core = useContext(TemplateContext)

    useEffect(() => {
        const template = predicate ? new ConditionalTemplate(name, position, predicate, children, stateNames ?? []) : new ReservedTemplate(name, position, children, stateNames ?? [])
        core.register(template)
        return () => core.unregister(template)
    }, [children, core, name, position, predicate, stateNames])

    return <></>
}