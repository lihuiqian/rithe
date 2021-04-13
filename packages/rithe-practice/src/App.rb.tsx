import { MenuItem, MenuList, ThemeProvider } from '@material-ui/core';
import { createTheme, Ribbon, RibbonButton, RibbonCheckBox, RibbonCombo, RibbonComboBox, RibbonGallery, RibbonGroupBox, RibbonLabel, RibbonLayout, RibbonQuickAccess, RibbonSplitButton, RibbonTab, RibbonTabButton, RibbonTextBox, RibbonTitle } from '@rithe/ui';
import React, { useState } from 'react';
import { Icon } from './Icon';

function App() {
  const [theme] = useState(createTheme('#0097a7', '#a71100', 8))

  const [checked, setChecked] = useState(false)

  return <ThemeProvider theme={theme}>
    <Ribbon>
      <RibbonQuickAccess>
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
      </RibbonQuickAccess>
      <RibbonTab label="File" index={0}>
        <RibbonGroupBox title="Clipboard">
          <RibbonLayout layouts="column">
            <RibbonButton
              icon={<Icon />}
              text="Paste"
              sizes="large"
              selected
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
            <RibbonSplitButton
              icon={<Icon />}
              text="格式刷格式刷格式刷"
              sizes="large"
              selected
            />
          </RibbonLayout>
        </RibbonGroupBox>
        <RibbonGroupBox title="Edit">
          <RibbonLayout layouts="2row">
            <RibbonCombo>
              <RibbonComboBox
                value="等线"
                lengthes={96}
              >
                {onClose => <MenuList style={{ background: 'white' }}>
                  <MenuItem onClick={() => onClose()}>A</MenuItem>
                  <MenuItem onClick={onClose}>B</MenuItem>
                  <MenuItem onClick={() => console.log(onClose)}>C</MenuItem>
                </MenuList>}
              </RibbonComboBox>
              <RibbonLabel
                icon={<Icon />}
                text="Size "
                sizes="middle"
              />
              <RibbonTextBox
                value={'12'}
                lengthes={32}
              />
            </RibbonCombo>
            <RibbonButton
              icon={<Icon />}
              text="Edit "
              sizes="small"
            />
            <RibbonCheckBox
              text="View "
              checked={checked}
              onClick={() => setChecked(v => !v)}
            />
            <RibbonSplitButton
              icon={<Icon />}
              text="View "
              sizes="small"
            />
            <RibbonSplitButton
              icon={<Icon />}
              text="View "
              sizes="small"
              selected
            />
          </RibbonLayout>
        </RibbonGroupBox>
      </RibbonTab>
      <RibbonTab label="Insert" index={1}>
        <RibbonGroupBox title="Insert">
          <RibbonGallery lengthes={100}>
            {onClose => <div>A</div>}
          </RibbonGallery>
        </RibbonGroupBox>
      </RibbonTab>
      <RibbonTitle>
        Title
      </RibbonTitle>
    </Ribbon>
  </ThemeProvider>
}

export default App;
