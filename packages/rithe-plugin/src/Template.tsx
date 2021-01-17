import React, { useContext, useEffect } from "react";
import { PositionContext } from "./internal/PositionContext";
import { ConditionalTemplate } from './internal/Template';
import { TemplateContext } from "./internal/TemplateContext";

export interface TemplateProps {
    name: string,
    predicate: (param: any) => boolean,
    render: (param: any, ...deps: any[]) => JSX.Element,
    stateNames: string[],
}

export const Template = ({ name, predicate, render, stateNames }: TemplateProps) => {
    const position = useContext(PositionContext)
    const core = useContext(TemplateContext)

    useEffect(() => {
        const template = new ConditionalTemplate(name, position, predicate, render, stateNames)
        core.register(template)
        return () => core.unregister(template)
    }, [core, name, position, predicate, render, stateNames])

    return <></>
}