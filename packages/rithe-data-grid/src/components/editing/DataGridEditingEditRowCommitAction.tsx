import { Button } from "@material-ui/core"
import React from "react"

export interface DataGridEditingEditRowCommitActionProps {
    disabled: boolean,
    action: () => void,
}

export const DataGridEditingEditRowCommitAction = (props: DataGridEditingEditRowCommitActionProps) => {
    const { disabled, action } = props
    return <Button
        color="primary"
        disabled={disabled}
        onClick={e => {
            action()
            e.stopPropagation()
        }}>
        Save
    </Button>
}