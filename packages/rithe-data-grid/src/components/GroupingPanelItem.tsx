import React, { ReactNode } from "react";

export interface GroupingPanelItemProps {
    children?: ReactNode | ReactNode[]
}

export const GroupingPanelItem = (props: GroupingPanelItemProps) => {
    const { children } = props
    return <div>{children}</div>
}