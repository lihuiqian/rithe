import { Button, ListItem, ListItemIcon, makeStyles, MenuItem, MenuList, Popover } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { PlaylistAddCheck } from "@material-ui/icons";
import { usePopover } from "@rithe/utils";
import React, { useState } from "react";
import { IsEmpty } from "../../assets/IsEmpty";
import { FilterExpression } from "../../types/FilterExpression";
import { FilterPredicate } from "../../types/FilterPredicate";
import { StringInFilter } from "./StringInFilter";

type Mode = 'Empty' | 'In'

export interface StringFilterProps {
    values: any[],
    filter?: FilterExpression | FilterPredicate,
    setFilter: (filter?: FilterExpression | FilterPredicate) => void,
}

export const StringFilter = (props: StringFilterProps) => {
    const { values, filter, setFilter } = props
    console.log(values)

    const [mode, setMode] = useState<Mode>(() => {
        if (!filter) {
            return 'In'
        } else if (filter instanceof Array) {
            throw new Error(`Unknown filter mode ${mode}`)
        } else {
            if (filter.predicator === 'IsEmpty' || filter.predicator === 'IsNotEmpty') {
                return 'Empty'
            } else if (filter.predicator === 'In') {
                return 'In'
            } else {
                throw new Error(`Unknown filter mode ${mode}`)
            }
        }
    })

    const { open, anchorEl, onOpen, onClose } = usePopover()

    const styles = useStyles()
    return <ListItem className={styles.listItem}>
        <ListItemIcon>
            <Button onClick={onOpen} className={styles.button}>
                {mode === 'Empty' ? <IsEmpty />
                    : mode === 'In' ? <PlaylistAddCheck />
                        : null}
            </Button>
            <Popover open={open} anchorEl={anchorEl} onClose={onClose}>
                <MenuList>
                    <MenuItem onClick={() => {
                        setMode('In')
                        onClose()
                    }}>
                        <PlaylistAddCheck />
                    </MenuItem>
                    <MenuItem onClick={() => {
                        setMode('Empty')
                        onClose()
                    }}>
                        <IsEmpty />
                    </MenuItem>
                </MenuList>
            </Popover>
        </ListItemIcon>
        <div className={styles.listItemContent}>
            {mode === 'Empty' ? null
                : mode === 'In'
                    ? <StringInFilter values={values} filter={filter} setFilter={setFilter} />
                    : null
            }
        </div>
    </ListItem>
}

const useStyles = makeStyles({
    listItem: {
        alignItems: 'flex-start',
    },
    listItemContent: {
        flex: '1 1 auto',
    },
    button: {
        padding: 0,
        minWidth: 0,
    },
    activeButton: {
        backgroundColor: grey[400],
        '&:hover': {
            backgroundColor: grey[500]
        }
    },
})