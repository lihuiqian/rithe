import { MenuItem, Select } from "@material-ui/core";
import React from "react";

export interface DataGridPagingPageSizeSelectProps {
    pageSize: number,
    pageSizes: number[],
    setPageSize: (pageSize: number) => void,
}

export const DataGridPagingPageSizeSelect = (props: DataGridPagingPageSizeSelectProps) => {
    const { pageSize, pageSizes, setPageSize } = props
    return <Select
        value={pageSize}
        onChange={e => setPageSize(e.target.value as number)}>
        {pageSizes.map(pageSize => <MenuItem key={pageSize} value={pageSize}>{pageSize}</MenuItem>)}
    </Select>
}