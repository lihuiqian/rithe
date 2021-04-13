import { Typography } from "@material-ui/core";
import React from "react";
import { TableColumn } from "../../types/TableColumn";

export interface DataGridTitleProps {
    title: string,
    tableColumn: TableColumn,
}

export const DataGridTitle = (props: DataGridTitleProps) => {
    const { title } = props
    return <Typography variant="body1">
        {title}
    </Typography>
}