import React, { ComponentType } from "react";
import { DataGridPagingContainerProps } from "../components/DataGridPagingContainer";
import { DataGridPagingPageSizeSelectionProps } from "../components/DataGridPagingPageSizeSelection";
import { DataGridPagingPaginationProps } from "../components/DataGridPagingPagination";

export interface PagingProps {
    pageSize?: number,
    onPageSizeChange?: (pageSize: number) => void,
    defaultPageSize?: number,
    currentPage?: number,
    onCurrentPageChange?: (currentPage: number) => void,
    defaultCurrentPage?: number,
    totalCount?: number,
    availablePageSizes?: number[],
    disableUserControl?: boolean,
    containerComponent?: ComponentType<DataGridPagingContainerProps>,
    pageSizeSelectionComponent?: ComponentType<DataGridPagingPageSizeSelectionProps>,
    paginationComponent?: ComponentType<DataGridPagingPaginationProps>,
}

export const Paging = (props: PagingProps) => {

    return <></>
}