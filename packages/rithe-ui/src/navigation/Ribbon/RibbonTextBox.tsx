import { InputBase, makeStyles } from "@material-ui/core";
import React, { ChangeEvent, FocusEvent, useCallback } from "react";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { MediaQuery } from "./types/MediaQuerySize";
import { GROUP_FONT_SIZE, ONE_LINE_ITEM_HEIGHT } from "./utils/constants";

export interface RibbonTextBoxProps {
    type?: string,
    placeholder?: string,
    value: string,
    onDraft?: (value: string) => void,
    onChange?: (value: string) => void,
    lengthes: number | MediaQuery<number>[],
    disabled?: boolean,
}

export const RibbonTextBox = (props: RibbonTextBoxProps) => {
    const {
        type,
        placeholder,
        value,
        onDraft,
        onChange,
        lengthes,
        disabled,
    } = props

    const length = useMediaQuery(lengthes, 96)

    const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        onDraft && onDraft(e.target.value)
    }, [onDraft])

    const onInputBlur = useCallback((e: FocusEvent<HTMLInputElement>) => {
        onChange && onChange(e.target.value)
    }, [onChange])

    const styles = useStyles()
    return <div
        className={styles.root}
        style={{ width: length }}
    >
        <InputBase
            type={type}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            onChange={onInputChange}
            onBlur={onInputBlur}
            className={styles.input}
        />
    </div>
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'stretch',
        position: 'relative',
        boxSizing: 'border-box',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.action.active,
        height: ONE_LINE_ITEM_HEIGHT,
    },
    input: {
        flex: '1 1 auto',
        fontSize: GROUP_FONT_SIZE,
        paddingLeft: theme.spacing(0.5),
    },
}))