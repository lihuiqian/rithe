import { Button, ClickAwayListener, InputBase, makeStyles, Popper } from "@material-ui/core";
import { usePopover } from "@rithe/utils";
import React, { ChangeEvent, FocusEvent, KeyboardEvent, ReactNode, useCallback, useRef } from "react";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { MediaQuery } from "./types/MediaQuerySize";
import { GROUP_FONT_SIZE, ONE_LINE_BUTTON_DROPDOWN_WIDTH, ONE_LINE_ITEM_HEIGHT } from "./utils/constants";

export interface RibbonComboBoxProps {
    type?: string,
    placeholder?: string,
    value: string,
    onDraft?: (value: string) => void,
    onChange?: (value: string) => void,
    onKeydown?: (e: KeyboardEvent<HTMLInputElement>) => void,
    lengthes: number | MediaQuery<number>[],
    disabled?: boolean,
    children?: (onClose: () => void) => ReactNode | ReactNode[],
}

export const RibbonComboBox = (props: RibbonComboBoxProps) => {
    const {
        type,
        placeholder,
        value,
        onDraft,
        onChange,
        onKeydown,
        lengthes,
        disabled,
        children,
    } = props

    const length = useMediaQuery(lengthes, 96)
    const ref = useRef<HTMLDivElement>(null)
    const { open, anchorEl, onOpen, onClose, onSwitch } = usePopover(ref)

    const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        onDraft && onDraft(e.target.value)
    }, [onDraft])

    const onInputBlur = useCallback((e: FocusEvent<HTMLInputElement>) => {
        onChange && onChange(e.target.value)
    }, [onChange])

    const onInputKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        onKeydown && onKeydown(e)
    }, [onKeydown])

    const styles = useStyles()
    return <ClickAwayListener onClickAway={onClose}>
        <div
            ref={ref}
            className={styles.root}
            style={{ width: length }}
        >
            <InputBase
                type={type}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                onClick={onOpen}
                onChange={onInputChange}
                onBlur={onInputBlur}
                onKeyDown={onInputKeyDown}
                className={styles.input}
            />
            <Button
                onClick={onSwitch}
                disabled={disabled}
                tabIndex={-1}
                className={styles.button}
            >
                ∨
            </Button>
            <Popper
                open={open}
                anchorEl={anchorEl}
                placement="bottom-start"
            >
                {open && children && children(onClose)}
            </Popper>
        </div>
    </ClickAwayListener>
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
    button: {
        flex: `0 0 ${ONE_LINE_BUTTON_DROPDOWN_WIDTH}px`,
        padding: 0,
    }
}))