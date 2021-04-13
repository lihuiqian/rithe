import { createMuiTheme } from "@material-ui/core";

export function createTheme(primary: string, secondary: string, spacing: number,) {
    return createMuiTheme({
        palette: {
            primary: {
                main: primary,
            },
            secondary: {
                main: secondary,
            },
            action: {
                hoverOpacity: 0.12,
                hover: 'rgba(0,0,0,0.12)',
                focusOpacity: 0.24,
                focus: 'rgba(0,0,0,0.24)',
                selectedOpacity: 0.24,
                selected: 'rgba(0,0,0,0.24)',
                activatedOpacity: 0.24,
                active: 'rgba(0,0,0,0.24)',
            }
        },
        shape: {
            borderRadius: 0,
        },
        spacing,
        overrides: {
            MuiButton: {
                root: {
                    textTransform: 'none',
                    minWidth: 0,
                },
            },
            MuiTab: {
                root: {
                    textTransform: 'none',
                    minWidth: 0,
                },
            }
        }
    })
}