import { Tab, withStyles } from "@material-ui/core"
import { TAB_HEIGHT } from "../utils/constants"

export const RibbonTabInternal = withStyles(theme => ({
    root: {
        minHeight: TAB_HEIGHT,
        height: TAB_HEIGHT,
        ['@media (min-width: 600px)']: {
            minWidth: 60,
        },
    },
    selected: {
        color: theme.palette.primary.dark,
    },
}))(Tab)