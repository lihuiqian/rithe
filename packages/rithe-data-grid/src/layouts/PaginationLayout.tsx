import { Plugin } from "@rithe/plugin";
import React, { ComponentType, useCallback } from "react";
import { DataGridPagination, DataGridPaginationProps } from "../components/basic/DataGridPagination";
import { Render } from "../Render";
import { Template } from "../Template";

export interface PaginationLayoutProps {
    Pagination?: ComponentType<DataGridPaginationProps>,
}

export const PaginationLayout = (props: PaginationLayoutProps) => {
    const {
        Pagination = DataGridPagination,
    } = props

    const paginationTemplate = useCallback(() => {
        return <Pagination>
            <Render name="pageInfo" />
            <Render name="pageSelect" />
            <Render name="pageSizeSelect" />
        </Pagination>
    }, [Pagination])

    return <Plugin>
        <Template name="pagination">
            {paginationTemplate}
        </Template>
    </Plugin>
}