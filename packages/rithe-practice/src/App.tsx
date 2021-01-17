import { Plugin, PluginHost, Render, State, Template } from '@rithe/plugin';
import React, { useCallback, useState } from 'react';

function App() {

  return <PluginHost>
    <Part1></Part1>
    <Part2></Part2>
  </PluginHost>
}

function Part1() {
  const [arr, setArr] = useState([1, 2])
  const onClick = useCallback(() => {
    setArr(arr => [0, ...arr])
  }, [])

  return <Plugin>
    <button onClick={onClick}>append</button>
    <State name="arr" value={arr} />
    <Template name="disp" predicate={() => true} render={(param: any, arr: number[]) => <div>{"render1" + JSON.stringify(param)} + {JSON.stringify(arr)}</div>} stateNames={['arr']} />
    <Render name="disp" param={{}} />
    <Render name="disp" param={'join'} />
  </Plugin>
}

function Part2() {
  const [num, setNum] = useState(1)
  const onClick = useCallback(() => {
    setNum(num => num + 1)
  }, [])
  return <Plugin>
    <button onClick={onClick}>add</button>
    <State name="num" value={num} />
    <State name="arr" computed={(prev?: number[], num?: number) => prev ? [...prev, num] : [num]} depNames={['num']} />
    <Template name="num" predicate={() => true} render={(_, num) => <div>{JSON.stringify(num)}</div>} stateNames={['num']} />
    <Template name="disp" predicate={(param) => param === 'join'} render={(param: any, arr: number[]) => <div>{"render2" + JSON.stringify(param)} + {JSON.stringify(arr)}</div>} stateNames={['arr']} />
    <Render name="num" param={{}} />
    <Render name="disp" param={{}} />
    <Render name="disp" param={'join'} />
  </Plugin>
}

export default App;
