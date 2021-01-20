import { Plugin } from "@rithe/plugin";
import React, { ComponentType } from "react";
import { DataGridPagination, DataGridPaginationProps } from "../components/DataGridPagination";
import { Template } from "../Template";

export interface PaginationLayoutProps {
    paginationComponent?: ComponentType<DataGridPaginationProps>,
}

export const PaginationLayout = (props: PaginationLayoutProps) => {
    const {
        paginationComponent: PaginationComponent = DataGridPagination,
    } = props

    return <Plugin>
        <Template name="pagination">
            {() => <PaginationComponent>
                Pagination
        </PaginationComponent>}
        </Template>
    </Plugin>
}