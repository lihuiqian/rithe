import { Button } from "@material-ui/core"
import React from "react"

export interface DataGridEditingEditRowCancelActionProps {
    disabled: boolean,
    action: () => void,
}

export const DataGridEditingEditRowCancelAction = (props: DataGridEditingEditRowCancelActionProps) => {
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