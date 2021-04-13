# Grouping

## 注意事项
- 与Tree冲突
- 与Sorting, Paging, Selection, Searching, Filtering有特殊交互

## 输入参数
| 参数名             | 说明                                                           |
| :----------------- | :------------------------------------------------------------- |
| groupingFields     | 分组field 受控非受控3件套                                      |
| expandedGroups     | 展开的组 受控非受控3件套                                       |
| disableUserControl | 禁用用户控制                                                   |
| options            | 列的分组设定，包括分组值计算，禁用用户操作，分组后从表格中移除 |

# 可自定义组件
| 组件名              | 说明                 |
| :------------------ | :------------------- |
| ToolbarPanel        | 分组面板             |
| PanelItem           | 分组面板上的展示项目 |
| GroupingRow         | 分组行               |
| GroupingCell        | 分组单元格           |
| GroupingContent     | 分组内容             |
| HeaderExpandCell    | 表头展开单元格       |
| HeaderExpandContent | 表头展开内容         |
| HeaderExpandButton  | 表头展开按钮         |
| BodyExpandCell      | 表体展开单元格       |
| BodyExpandContent   | 表体展开内容         |
| BodyExpandButton    | 表体展开按钮         |

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
| tableRows    | 表格行，追加分组行，计算行的展开 |