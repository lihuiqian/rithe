
export interface DataTypeInfer {
    'unknown': unknown,
    'string': string,
    'number': number,
    'bigint': bigint,
    'boolean': boolean,
    'date': Date,
    'time': Date,
    'datetime': Date,
    'code': string | number,
    // eslint-disable-next-line @typescript-eslint/ban-types
    'object': object,
    'array': any[],
}
