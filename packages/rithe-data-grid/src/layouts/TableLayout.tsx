import { Plugin } from "@rithe/plugin";
import React, { ComponentType, ReactNode, RefObject, useCallback } from "react";
import { DataGridTableContainer, DataGridTableContainerProps } from "../components/basic/DataGridTableContainer";
import { Render } from "../Render";
import { Template } from "../Template";

export interface TableLayoutProps {
    Container?: ComponentType<DataGridTableContainerProps>,
    children?: ReactNode | ReactNode[],
}

export const TableLayout = (props: TableLayoutProps) => {
    const {
        Container = DataGridTableContainer,
        children
    } = props

    const tableTemplate = useCallback((templateProps: { ref?: RefObject<any> }) => {
        return <Container>
            <div ref={templateProps.ref}>
                <Render name="header" />
                <Render name="body" />
                <Render name="footer" />
            </div>
        </Container>
    }, [Container])

    return <Plugin>
        <Template name="table">
            {tableTemplate}
        </Template>
        {children}
    </Plugin>
}