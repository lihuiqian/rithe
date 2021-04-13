import { Tab, withStyles } from "@material-ui/core"
import { TAB_HEIGHT } from "../utils/constants"

export const RibbonTabInternal = withStyles(theme => ({
    root: {
        minHeight: TAB_HEIGHT,
        height: TAB_HEIGHT,
        boxSizing: 'border-box',
        borderTop: `2px solid ${theme.palette.primary.main}`,
        ['@media (min-width: 600px)']: {
            minWidth: 60,
        },
    },
    textColorInherit: {
        opacity: 0.85,
    },
    selected: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.dark,
    },
}))(Tab)