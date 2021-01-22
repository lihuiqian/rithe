import { Data, DataGrid, Grouping, PaginationLayout, TableBodyLayout, TableFooterLayout, TableHeaderLayout, TableLayout, ToolbarLayout } from '@rithe/data-grid';
import { Plugin, Render, State, Template } from '@rithe/plugin';
import React, { useCallback, useState } from 'react';

function App() {

  return <DataGrid >
    <Data columns={[{
      field: 'a', dataTypeName: 'string', title: 'A',
    }, {
      field: 'b', dataTypeName: 'number', title: 'B',
    }]} rows={[{
      a: 1, b: 2
    }, {
      a: 3, b: 4
    }]} />
    <ToolbarLayout />
    <TableLayout>
      <TableHeaderLayout />
      <TableBodyLayout />
      <TableFooterLayout />
    </TableLayout>
    <PaginationLayout />
    <Grouping defaultGroupingFields={['a']} options={[{ field: 'a' }]} />
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
      {(props, arr) => <div>{"render1" + JSON.stringify(props)} + {JSON.stringify(arr)}</div>}
    </Template>
    <Render name="disp" props={1} />
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
    <Template name="disp" predicate={props => props === 'join'} stateNames={['arr']}>
      {(props, arr) => <div>{"render2" + JSON.stringify(props)} + {JSON.stringify(arr)}</div>}
    </Template>
    <Render name="num" props={2} />
    <Render name="disp" props={'join'} />
  </Plugin>
}

export default App;
