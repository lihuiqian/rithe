import { DataGrid, PaginationLayout, TableBodyLayout, TableFooterLayout, TableHeaderLayout, TableLayout, ToolbarLayout } from '@rithe/data-grid';
import { Plugin, Render, State, Template } from '@rithe/plugin';
import React, { useCallback, useState } from 'react';

function App() {

  return <DataGrid columns={[]} rows={[]}>
    <ToolbarLayout />
    <TableLayout>
      <TableHeaderLayout />
      <TableBodyLayout />
      <TableFooterLayout />
    </TableLayout>
    <PaginationLayout />
  </DataGrid>
}

function Part1() {
  const [arr, setArr] = useState([1, 2])
  const onClick = useCallback(() => {
    setArr(arr => [0, ...arr])
  }, [])

  return <Plugin>
    <button onClick={onClick}>append</button>
    <State name="arr" value={arr} />
    <Template name="disp" stateNames={['arr']}>
      {(param, arr) => <div>{"render1" + JSON.stringify(param)} + {JSON.stringify(arr)}</div>}
    </Template>
    <Render name="disp" param={1} />
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
    <Template name="num" stateNames={['num']}>
      {(_, num) => <div>{JSON.stringify(num)}</div>}
    </Template>
    <Template name="disp" predicate={param => param === 'join'} stateNames={['arr']}>
      {(param, arr) => <div>{"render2" + JSON.stringify(param)} + {JSON.stringify(arr)}</div>}
    </Template>
    <Render name="num" param={2} />
    <Render name="disp" param={'join'} />
  </Plugin>
}

export default App;
