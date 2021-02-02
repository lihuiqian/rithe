import { shallowEquals } from "@rithe/utils";
import React, { useContext, useEffect } from "react";
import { PositionContext } from "./internal/PositionContext";
import { ConditionalTemplate, ReservedTemplate } from './internal/Template';
import { TemplateContext } from "./internal/TemplateContext";

export interface ConditionalTemplateProps {
    name: string,
    predicate?: (props: any) => boolean,
    stateNames?: string[],
    children: (props: any, ...states: any[]) => JSX.Element,
}

export interface ReservedTemplateProps {
    name: string,
    reserved: true,
    stateNames?: string[],
    children: (props: any, ...states: any[]) => JSX.Element,
}

export const Template = React.memo((props: ConditionalTemplateProps | ReservedTemplateProps) => {
    const position = useContext(PositionContext)
    const core = useContext(TemplateContext)
    const { name, predicate, reserved, stateNames, children } = props as ConditionalTemplateProps & ReservedTemplateProps

    useEffect(() => {
        const template = reserved
            ? new ReservedTemplate(name, position, children, stateNames ?? [])
            : new ConditionalTemplate(name, position, predicate, children, stateNames ?? [])
        core.register(template)
        return () => core.unregister(template)
    }, [children, core, name, position, predicate, reserved, stateNames])

    return null
}, (a, b) => {
    return a.name === b.name
        && (a as any).predicate === (b as any).predicate
        && (a as any).reserved === (b as any).reserved
        && shallowEquals(a.stateNames, b.stateNames)
        && a.children === b.children
})
Template.displayName === 'displayName'