import React, { ReactNode } from "react";

export interface DataGridGroupingContentProps {
    children?: ReactNode | ReactNode[]
}

export const DataGridGroupingContent = React.memo((props: DataGridGroupingContentProps) => {
    const { children } = props
    return <div>{children}</div>
})
DataGridGroupingContent.displayName = 'DataGridGroupingContent'