# Tree

## 注意事项
- 与Grouing冲突
- 与Sorting, Paging, Selection, Searching, Filtering有特殊交互

## 输入参数
| 参数名         | 说明                     |
| :------------- | :----------------------- |
| getParentRowId | 获取父行                 |
| expandedRowIds | 展开的行 受控非受控3件套 |
| showExpandAll  | 显示展开全部             |

# 可自定义组件
| 组件名              | 说明           |
| :------------------ | :------------- |
| HeaderExpandCell    | 表头展开单元格 |
| HeaderExpandContent | 表头展开内容   |
| HeaderExpandButton  | 表头展开按钮   |
| BodyExpandCell      | 表体展开单元格 |
| BodyExpandContent   | 表体展开内容   |
| BodyExpandButton    | 表体展开按钮   |

# 输入
| 输入名       | 说明   |
| :----------- | :----- |
| columns      | 所有列 |
| tableColumns | 表格列 |
| tableRows    | 表格行 |

# 输出
| 输出名       | 说明                             |
| :----------- | :------------------------------- |
| tableColumns | 表格列，追加展开列               |
| tableRows    | 表格行，重新组织行，计算展开的行 |