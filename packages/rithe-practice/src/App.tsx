import { ThemeProvider } from '@material-ui/core';
import { createTheme, Ribbon, RibbonAction, RibbonButton, RibbonControl, RibbonDropDownButton, RibbonGroup, RibbonTab, RibbonTabButton, RibbonTitle, RibbonToggleButton } from '@rithe/ui';
import React, { useState } from 'react';
import { Icon } from './Icon';

function App() {
  const [theme] = useState(createTheme('#0097a7', '#a71100', 8))

  return <ThemeProvider theme={theme}>
    <Ribbon>
      <RibbonAction>
        <RibbonTabButton
          tooltip="Auto Save"
          text="Auto Save"
          icon={<Icon />}
          selected
        />
        <RibbonTabButton
          tooltip="Save"
          icon={<Icon />}
        />
        <RibbonTabButton
          tooltip="Undo"
          icon={<Icon />}
        />
        <RibbonTabButton
          tooltip="Redo"
          icon={<Icon />}
          disabled
        />
      </RibbonAction>
      <RibbonTab label="File" index={0}>
        <RibbonGroup title="Clipboard">
          <RibbonButton
            icon={<Icon />}
            text="Paste"
            sizes="large"
          />
          <RibbonButton
            icon={<Icon />}
            text="Cut"
            sizes={[{ from: 0, to: 650, value: 'small' }, { from: 650, to: Number.MAX_SAFE_INTEGER, value: 'middle' }]}
          />
          <RibbonButton
            icon={<Icon />}
            text="Copy"
            sizes={[{ from: 0, to: 650, value: 'small' }, { from: 650, to: Number.MAX_SAFE_INTEGER, value: 'middle' }]}
          />
          <RibbonButton
            icon={<Icon />}
            text="Format Brush"
            sizes={[{ from: 0, to: 650, value: 'small' }, { from: 650, to: Number.MAX_SAFE_INTEGER, value: 'middle' }]}
          />
        </RibbonGroup>
      </RibbonTab>
      <RibbonTab label="Insert" index={1}>
        <RibbonGroup title="Insert">

        </RibbonGroup>
      </RibbonTab>
      <RibbonTab label="Layout" index={2}>
        <RibbonGroup title="Page">
          <RibbonDropDownButton
            icon={<Icon />}
            text="Size"
            sizes="large"
          />
          <RibbonDropDownButton
            icon={<Icon />}
            text="Orientation "
            sizes={[{ from: 0, to: 650, value: 'middle' }, { from: 650, to: Number.MAX_SAFE_INTEGER, value: 'large' }]}
          />
          <RibbonDropDownButton
            icon={<Icon />}
            text="Margins "
            sizes={[{ from: 0, to: 650, value: 'middle' }, { from: 650, to: Number.MAX_SAFE_INTEGER, value: 'large' }]}
          >
          </RibbonDropDownButton>
          <RibbonDropDownButton
            icon={<Icon />}
            text="Direction "
            sizes={[{ from: 0, to: 650, value: 'middle' }, { from: 650, to: Number.MAX_SAFE_INTEGER, value: 'large' }]}
          >
          </RibbonDropDownButton>
        </RibbonGroup>
      </RibbonTab>
      <RibbonTab label="View" index={3}>
        <RibbonGroup title="View">
          <RibbonToggleButton
            icon={<Icon />}
            text="Edit "
            sizes="large"
            selected
          />
          <RibbonToggleButton
            icon={<Icon />}
            text="View "
            sizes="large"
          />
        </RibbonGroup>
        <RibbonGroup title="Scale">
          <RibbonDropDownButton
            icon={<Icon />}
            text="Scale "
            sizes="large"
          />
          <RibbonButton
            icon={<Icon />}
            text="100% "
            sizes="large"
          />
          <RibbonToggleButton
            icon={<Icon />}
            text="Grid Line"
            sizes="middle"
            selected
          />
          <RibbonToggleButton
            icon={<Icon />}
            text="Ruler "
            sizes="middle"
            selected
          />
          <RibbonToggleButton
            icon={<Icon />}
            text="Navigation "
            sizes="middle"
            selected
          />
        </RibbonGroup>
      </RibbonTab>
      <RibbonTitle>
        Title
      </RibbonTitle>
      <RibbonControl>
        <RibbonTabButton
          icon="🪟"
          tooltip="max"
        />
      </RibbonControl>
    </Ribbon>
  </ThemeProvider>
}

export default App;
