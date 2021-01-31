import { usePopover } from '@rithe/utils';
import React, { ReactNode, useMemo } from "react";
import { useDataGridTheme } from "../DataGridTheme";
import { Direction } from "../types/Direction";
import { FilterExpression } from "../types/FilterExpression";
import { FilterPredicate } from "../types/FilterPredicate";
import { MenuProps } from "../types/TemplateBaseProps";

export interface DataGridMenuProps extends MenuProps {
    filter?: FilterPredicate | FilterExpression,
    sorting?: Direction,
    children?: ReactNode | ReactNode[],
}

export const DataGridMenu = (props: DataGridMenuProps) => {
    const { filter, sorting, children } = props

    const icon = useMemo(() => filter ? ('F ' + sorting ?? '') : (sorting ?? '▲'), [filter, sorting])

    const [open, anchorEl, onOpen, onClose] = usePopover()

    const {
        iconButtonComponent: IconButton,
        popoverComponent: Popover,
        menuComponent: Ul,
    } = useDataGridTheme()
    return <>
        <IconButton onClick={onOpen} onMouseDown={e => e.stopPropagation()}>
            {icon}
        </IconButton>
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
        >
            <Ul>
                {children}
            </Ul>
        </Popover>
    </>
}