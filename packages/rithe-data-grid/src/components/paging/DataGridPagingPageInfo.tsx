import React from "react";

export interface DataGridPagingPageInfoProps {
    from: number,
    to: number,
    total: number
}

export const DataGridPagingPageInfo = (props: DataGridPagingPageInfoProps) => {
    const { from, to, total } = props
    return <div>{from === to ? `${from}/${total}` : `${from}~${to}/${total}`}</div>
}