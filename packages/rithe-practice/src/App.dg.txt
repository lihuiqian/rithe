import { ColumnFreeze, ColumnOrdering, Data, DataGrid, PaginationLayout, TableBodyLayout, TableFooterLayout, TableHeaderLayout, TableLayout, ToolbarLayout } from '@rithe/data-grid';
import { Debug, Plugin, Render, State, Template } from '@rithe/plugin';
import { Arrays, DragDropProvider, Draggable, Droppable } from '@rithe/utils';
import React, { useCallback, useState } from 'react';

function App() {
  const [value, setValue] = useState<any>(undefined)
  return <>
    <DragDropProvider>
      <Draggable payload={"ABC"}><div>Draggable</div></Draggable>
      <Droppable onOver={(coordinate) => setValue(coordinate)} onDrop={(_, payload) => setValue(payload)}><div style={{ width: 100, height: 100, border: '1px solid red' }}>{JSON.stringify(value)}</div></Droppable>
    </DragDropProvider>
    <DataGrid >
      <Data
        columns={[{
          field: 'index', dataTypeName: 'number', title: 'INDEX',
        }, {
          field: 'a', dataTypeName: 'number', title: 'A', categories: ['grouping'],
        }, {
          field: 'b', dataTypeName: 'number', title: 'B', categories: ['grouping'],
        }, {
          field: 'c', dataTypeName: 'number', title: 'C', categories: [{ value: 'grouping', merge: false }],
        }, {
          field: 'd', dataTypeName: 'number', title: 'D',
        }, {
          field: 'e', dataTypeName: 'number', title: 'E',
        }, {
          field: 'f', dataTypeName: 'number', title: 'F',
        }, {
          field: 'g', dataTypeName: 'number', title: 'G',
        }, {
          field: 'h', dataTypeName: 'number', title: 'H',
        }, {
          field: 'i', dataTypeName: 'number', title: 'I',
        }, {
          field: 'j', dataTypeName: 'number', title: 'J',
        }]}
        rows={Arrays.range(0, 10).map(i => ({ index: i, a: 1 + i % 3, b: 2 + i % 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10 }))} />
      <ToolbarLayout />
      <TableLayout>
        <TableHeaderLayout />
        <TableBodyLayout />
        <TableFooterLayout />
      </TableLayout>
      <PaginationLayout />
      <ColumnFreeze defaultFreezeColumns={[{ field: 'a', freeze: 'start' }]} />
      <ColumnOrdering />
      {/* <Grouping defaultGroupingFields={['a', 'b']} defaultExpandedGroups={[[1], [1, 2], [1, 3]]} /> */}
      <Debug />
    </DataGrid>
  </>
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
