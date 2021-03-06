import { Button } from "@material-ui/core"
import React from "react"

export interface DataGridEditingAddRowCancelActionProps {
    disabled: boolean,
    action: () => void,
}

export const DataGridEditingAddRowCancelAction = (props: DataGridEditingAddRowCancelActionProps) => {
    const { disabled, action } = props
    return <Button
        color="primary"
        disabled={disabled}
        onClick={e => {
            action()
            e.stopPropagation()
        }}>
        Cancel
    </Button>
}