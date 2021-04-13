import { Badge, Button, makeStyles, MenuList, Popover } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { usePopover } from '@rithe/utils';
import React, { ReactNode } from "react";
import { AscDropDown } from '../../assets/AscDropDown';
import { AscFilter } from '../../assets/AscFilter';
import { DescDropDown } from '../../assets/DescDropDown';
import { DescFilter } from '../../assets/DescFilter';
import { Filter } from '../../assets/Filter';
import { Direction } from "../../types/Direction";
import { FilterExpression } from "../../types/FilterExpression";
import { FilterPredicate } from "../../types/FilterPredicate";
import { TableColumn } from '../../types/TableColumn';

export interface DataGridMenuProps {
    expression?: FilterPredicate | FilterExpression,
    direction?: Direction,
    sortIndex?: number,
    tableColumn: TableColumn,
    children?: (onClose: () => void) => ReactNode | ReactNode[],
}

export const DataGridMenu = (props: DataGridMenuProps) => {
    const { expression, direction, sortIndex, children } = props

    const { open, anchorEl, onOpen, onClose } = usePopover()

    const styles = useStyles()
    return <>
        <Button
            onClick={e => {
                onOpen(e)
                e.stopPropagation()
            }}
            className={styles.button}
        >
            {menuIcon(expression, direction, sortIndex)}
        </Button>
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
        >
            <MenuList>
                {children && children(onClose)}
            </MenuList>
        </Popover>
    </>
}

const useStyles = makeStyles({
    button: {
        padding: 0,
        minWidth: 0,
    }
})

function menuIcon(expression?: FilterPredicate | FilterExpression, direction?: Direction, sortIndex?: number) {
    if (expression) {
        if (direction === 'asc') {
            return sortIndex === undefined ? <AscFilter /> : <Badge badgeContent={sortIndex + 1}><AscFilter /></Badge>
        } else if (direction === 'desc') {
            return sortIndex === undefined ? <DescFilter /> : <Badge badgeContent={sortIndex + 1}><DescFilter /></Badge>
        } else {
            return <Filter />
        }
    } else {
        if (direction === 'asc') {
            return sortIndex === undefined ? <AscDropDown /> : <Badge badgeContent={sortIndex + 1}><AscDropDown /></Badge>
        } else if (direction === 'desc') {
            return sortIndex === undefined ? <DescDropDown /> : <Badge badgeContent={sortIndex + 1}><DescDropDown /></Badge>
        } else {
            return <ArrowDropDown />
        }
    }
}