import { PluginHost } from '@rithe/plugin';
import React, { useCallback, useState } from 'react';
import { Debugger } from './Debugger';
import { P1 } from './P1';
import { P2 } from './P2';
import { P3 } from './P3';

function App() {

  console.log('App')
  const [open, setOpen] = useState(true)
  const onClick = useCallback(() => setOpen(open => !open), [])

  return <PluginHost>
    <button onClick={onClick}>open</button>
    {open ? [<P1 key={1} />, <P3 key={3} />] : [<P1 key={1} />, <P2 key={2} />, <P3 key={3} />]}
    <Debugger />
  </PluginHost>
}

export default App;
