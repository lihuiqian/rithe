import { Tabs, withStyles } from "@material-ui/core"
import { TAB_HEIGHT } from "../utils/constants"

export const RibbonTabsInternal = withStyles(() => ({
    root: {
        minHeight: TAB_HEIGHT,
        height: TAB_HEIGHT,
    },
    indicator: {
        backgroundColor: 'transparent',
    },
}))(Tabs)