import { Pagination } from '@material-ui/lab';
import React, { useEffect } from "react";

export interface DataGridPagingPageSelectProps {
    currentPage: number,
    pageCount: number,
    setCurrentPage: (currentPage: number) => void,
}

export const DataGridPagingPageSelect = (props: DataGridPagingPageSelectProps) => {
    const { currentPage, pageCount, setCurrentPage } = props

    useEffect(() => {
        setCurrentPage(Math.max(0, Math.min(pageCount - 1, currentPage)))
    }, [currentPage, pageCount, setCurrentPage])

    return <Pagination
        shape="rounded"
        page={currentPage + 1}
        count={pageCount}
        onChange={(_, page) => setCurrentPage(page - 1)}
    />
}