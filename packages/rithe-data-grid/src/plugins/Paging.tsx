import { Plugin } from "@rithe/plugin";
import { useMixed, useShallow } from "@rithe/utils";
import React, { ComponentType, useCallback } from "react";
import { DataGridPagingPageInfo, DataGridPagingPageInfoProps } from "../components/paging/DataGridPagingPageInfo";
import { DataGridPagingPageSelect, DataGridPagingPageSelectProps } from "../components/paging/DataGridPagingPageSelect";
import { DataGridPagingPageSizeSelect, DataGridPagingPageSizeSelectProps } from "../components/paging/DataGridPagingPageSizeSelect";
import { State } from "../State";
import { Template } from "../Template";
import { TableRow } from "../types/TableRow";

export interface PagingProps {
    pageSize?: number,
    onPageSizeChange?: (pageSize: number) => void,
    defaultPageSize?: number,
    currentPage?: number,
    onCurrentPageChange?: (currentPage: number) => void,
    defaultCurrentPage?: number,
    totalCount?: number,
    availablePageSizes?: number[],
    PageInfo?: ComponentType<DataGridPagingPageInfoProps>,
    PageSelect?: ComponentType<DataGridPagingPageSelectProps>,
    PageSizeSelect?: ComponentType<DataGridPagingPageSizeSelectProps>,
}

export const Paging = (props: PagingProps) => {
    const {
        totalCount,
        PageInfo = DataGridPagingPageInfo,
        PageSelect = DataGridPagingPageSelect,
        PageSizeSelect = DataGridPagingPageSizeSelect,
    } = props
    const availablePageSizes = useShallow(props.availablePageSizes ?? [])

    const [pageSize, setPageSize] = useMixed(props.pageSize, props.onPageSizeChange, props.defaultPageSize, 10)
    const [currentPage, setCurrentPage] = useMixed(props.currentPage, props.onCurrentPageChange, props.defaultCurrentPage, 0)

    // State totalCount
    const totalCountGenerated = useCallback((tableBodyRows: TableRow[] = []) => {
        return totalCount ?? tableBodyRows.length
    }, [totalCount])

    // State tableBodyRows
    const tableBodyRowsComputed = useCallback((tableRows: TableRow[] = []) => {
        return tableRows.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
    }, [currentPage, pageSize])

    // Template pageInfo
    const pageInfoTemplate = useCallback((_, totalCount = 0) => {
        const from = currentPage * pageSize + 1
        const to = Math.min(totalCount, (currentPage + 1) * pageSize)
        return <PageInfo
            from={from}
            to={to}
            total={totalCount}
        />
    }, [PageInfo, currentPage, pageSize])

    // Template pageSelect
    const pageSelectTemplate = useCallback((_, totalCount = 0) => {
        const pageCount = Math.ceil(totalCount / pageSize)
        return <PageSelect
            currentPage={currentPage}
            pageCount={pageCount}
            setCurrentPage={setCurrentPage}
        />
    }, [PageSelect, currentPage, pageSize, setCurrentPage])

    // Template pageSizeSelect
    const showPageSizeSelect = useCallback(() => availablePageSizes.length > 0, [availablePageSizes.length])
    const pageSizeSelectTemplate = useCallback(() => {
        return <PageSizeSelect
            pageSize={pageSize}
            pageSizes={availablePageSizes}
            setPageSize={setPageSize}
        />
    }, [PageSizeSelect, availablePageSizes, pageSize, setPageSize])

    return <Plugin>
        <State name="totalCount" generated={totalCountGenerated} depNames={['tableBodyRows']} />
        <State name="tableBodyRows" computed={tableBodyRowsComputed} />
        <Template name="pageInfo" stateNames={['totalCount']}>
            {pageInfoTemplate}
        </Template>
        <Template name="pageSelect" stateNames={['totalCount']}>
            {pageSelectTemplate}
        </Template>
        <Template name="pageSizeSelect" predicate={showPageSizeSelect}>
            {pageSizeSelectTemplate}
        </Template>
    </Plugin>
}