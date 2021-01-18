import { Plugin } from "@rithe/plugin";
import React, { ComponentType } from "react";
import { DataGridPagination, DataGridPaginationProps } from "../components/DataGridPagination";
import { Template } from "../Template";

export interface PaginationLayoutProps {
    rootComponent?: ComponentType<DataGridPaginationProps>,
}

export const PaginationLayout = (props: PaginationLayoutProps) => {
    const {
        rootComponent: RootComponent = DataGridPagination,
    } = props

    return <Plugin>
        <Template name="pagination">
            {() => <RootComponent>
                Pagination
        </RootComponent>}
        </Template>
    </Plugin>
}