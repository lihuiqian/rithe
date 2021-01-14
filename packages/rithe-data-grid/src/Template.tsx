import React from "react"

export interface TemplateProps {
    name: string,
    predicate: (params: any) => boolean,
    render: (params: any, slice: any) => JSX.Element,
}

export const Template = (props: TemplateProps) => {

    return <></>
}