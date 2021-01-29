import { shallowEquals } from "@rithe/utils";
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

export const Template = React.memo(({ name, predicate, stateNames, children }: TemplateProps) => {
    const position = useContext(PositionContext)
    const core = useContext(TemplateContext)

    useEffect(() => {
        const template = predicate ? new ConditionalTemplate(name, position, predicate, children, stateNames ?? []) : new ReservedTemplate(name, position, children, stateNames ?? [])
        core.register(template)
        return () => core.unregister(template)
    }, [children, core, name, position, predicate, stateNames])

    return null
}, (a, b) => {
    return a.name === b.name && a.predicate === b.predicate && shallowEquals(a.stateNames, b.stateNames) && a.children === b.children
})
Template.displayName === 'displayName'