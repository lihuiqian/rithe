type SimplePredicator = 'IsEmpty' | 'IsNotEmpty';
type RangPredicator = 'In' | 'NotIn';
type ComparingPredicator = 'Equals' | 'NotEquals' | 'GreaterThan' | 'GreaterThanOrEquals' | 'LessThan' | 'LessThanOrEquals';
type StringPredicator = 'Contains' | 'NotContains' | 'StartsWith' | 'NotStartsWith' | 'EndsWith' | 'NotEndsWith';
export type FilterPredicator = SimplePredicator | RangPredicator | ComparingPredicator | StringPredicator;