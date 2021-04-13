import { Table } from "@material-ui/core";
import { CSSProperties } from "@material-ui/styles";
import React, { ReactNode, useMemo } from "react";

export interface DataGridTableProps {
    stickTop?: boolean,
    stickBottom?: boolean,
    height: number,
    width: number,
    children?: ReactNode | ReactNode[]
}

export const DataGridTable = (props: DataGridTableProps) => {
    // eslint-disable-next-line react/prop-types
    const {
        stickTop = false,
        stickBottom = false,
        width,
        height,
        children } = props
    const style = useMemo<CSSProperties>(() => ({
        backgroundColor: 'white',
        width,
        height,
        position: stickTop || stickBottom ? 'sticky' : undefined,
        top: stickTop ? 0 : undefined,
        bottom: stickBottom ? 0 : undefined,
        zIndex: stickTop || stickBottom ? 2 : undefined,
    }), [height, stickBottom, stickTop, width])
    return <Table style={style}>{children}</Table>
}