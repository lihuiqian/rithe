# Paging

## 注意事项

## 输入参数
| 参数名             | 说明                    |
| :----------------- | :---------------------- |
| pageSize           | 页的规模                |
| currentPage        | 当前页                  |
| totalCount         | 总数量，覆盖rows.length |
| availablePageSizes | 可调整的页的规模        |
| disableUserControl | 禁止用户控制            |

# 可自定义组件
| 组件名     | 说明   |
| :--------- | :----- |
| Pagination | 分页栏 |

# 输入
| 输入名        | 说明   |
| :------------ | :----- |
| tableBodyRows | 表体行 |

# 输出
| 输出名        | 说明                 |
| :------------ | :------------------- |
| tableBodyRows | 表体行，只保留当前页 |

## 分页逻辑

### 正常分页
取出部分行

### Detail分页
取出部分行与详情行

### Grouping分页
按第一组分页

### Tree过滤
按第一个节点分页