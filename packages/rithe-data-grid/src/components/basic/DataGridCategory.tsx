import { Typography } from "@material-ui/core";
import React from "react";
import { TableColumn } from "../../types/TableColumn";

export interface DataGridCategoryProps {
    category: string,
    tableColumns: TableColumn[],
}

export const DataGridCategory = (props: DataGridCategoryProps) => {
    const { category } = props
    return <Typography variant="body1">
        {category}
    </Typography>
}