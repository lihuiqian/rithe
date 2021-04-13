# Editing

## 注意事项

## 输入参数
| 参数名              | 说明                                    |
| :------------------ | :-------------------------------------- |
| addingRows          | 追加的行，受控非受控三件套              |
| onAddingRowCommit   | 追加行提交，返回是否继续修改addingRows  |
| editingRows         | 编辑的行，受控非受控三件套              |
| onEditingRowCommit  | 编辑行提交，返回是否继续修改editingRows |
| onDeletingRowCommit | 删除行提交                              |
| onEditingCellCommit | 编辑单元格提交，返回是否退出编辑        |
| showAddAction       | 显示展示追加按钮的函数                  |
| showEditAction      | 显示展示编辑按钮的函数                  |
| showDeleteAction    | 显示展示删除按钮的函数                  |
| disableAdd          | 禁用追加按钮的函数                      |
| disableAddCommit    | 禁用追加提交按钮的函数                  |
| disableEdit         | 禁用修改按钮的函数                      |
| disableEditCommit   | 禁用修改提交按钮的函数                  |
| disableDelete       | 禁用删除按钮的函数                      |
| enableInlineEdit    | 允许行内编辑                            |
| options             | 可选项，包含列是否可编辑                |

# 可自定义组件
| 组件名           | 说明         |
| :--------------- | :----------- |
| AddButton        | 追加按钮     |
| EditButton       | 编辑按钮     |
| DeleteButton     | 删除按钮     |
| AddCommitButton  | 追加提交按钮 |
| AddCancelButton  | 追加取消按钮 |
| EditCommitButton | 编辑提交按钮 |
| EditCancelButton | 编辑取消按钮 |

# 输入
| 输入名          | 说明   |
| :-------------- | :----- |
| tableHeaderRows | 表头行 |
| tableBodyRows   | 表体行 |

# 输出
| 输出名          | 说明                                  |
| :-------------- | :------------------------------------ |
| tableHeaderRows | 表头行，修改action                    |
| tableBodyRows   | 表体行，修改action，追加新行/修改旧行 |

## 事件
### TODO
- 设计列的禁用编辑功能 - options属性
- 设计action按条件出现机制 - 使用函数```(tableRow: Row) => boolean```
- 设计action按条件禁用机制 - 使用函数```(tableRow: Row) => boolean```
- 设计confirm操作确认机制(受控/非受控) - 非受控：直接修改；受控：自行控制

### 追加
- 属性addingRows: row空白或由函数指定，rowId默认或由函数指定，actions(SAVE_ADD_ROW, CANCEL_ADD_ROW)
- 计算actions，追加(ADD_ROW, SAVE_ADD_ROW, CANCEL_ADD_ROW)
- 计算headerRows，满足出现条件时在最后一行追加action(ADD_ROW)
- 计算bodyRows，在最上方追加addingRows
- 点击ADD_ROW：触发onAddRow事件，向addingRows中追加行
- 填写：修改行数据
- 点击SAVE_ADD_ROW：触发onAddRowSave事件，删除addingRows中的指定行
- 点击CANCEL_ADD_ROW：触发onAddRowCancel事件，删除addingRows中的指定行

### 删除
- 计算actions，追加(DELETE_ROW)
- 计算bodyRows，给满足条件的行追加action(DELETE_ROW)
- 点击DELETE_ROW：触发onDeleteRow事件

### 编辑
- 属性editingRows：row继承原值，actions(SAVE_EDIT_ROW, CANCEL_EDIT_ROW)
- 计算actions，追加(EDIT_ROW, SAVE_EDIT_ROW, CANCEL_EDIT_ROW)
- 计算bodyRows，给满足条件的行追加action(EDIT_ROW)
- 计算bodyRows，将在editingRows中的行替换为editingRows
- 点击EDIT_ROW：触发onEditRow事件，向editingRows中追加行
- 填写：修改行数据
- 点击SAVE_EDIT_ROW：触发onEditRowSave事件，删除editingRows中的指定行
- 点击CANCEL_EDIT_ROW：触发onEditRowCancel事件，删除editingRows中的指定行

### 编辑(行内)
- 点击单元格：触发onEditCell事件
- 填写：修改临时数据
- 确认修改(点击外部，tab/shift+tab，enter)：触发onEditCellSave事件
- 取消修改(escape)后，触发onEditCellCancel事件
