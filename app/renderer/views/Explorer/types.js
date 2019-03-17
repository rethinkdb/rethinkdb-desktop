export const rebirthdbTypes = `
declare type Primitives = null | string | boolean | number;
declare type Format = 'native' | 'raw';
declare type Durability = 'hard' | 'soft';
declare type RValue<T = any> = RDatum<T> | T;
declare type Func<T, Res = any> = ((doc: RDatum<T>) => RValue<Res>);
declare type MultiFieldSelector = object | any[] | string;
declare type FieldSelector<T, U = any> = string | Func<T, U>;
interface ServerInfo {
    id: string;
    name: string;
    proxy: boolean;
}
interface TableCreateOptions {
    primaryKey?: string;
    shards?: number;
    replicas?: number | {
        [serverTag: string]: number;
    };
    primaryReplicaTag?: string;
    nonvotingReplicaTags?: string[];
    durability?: Durability;
}
interface Repair {
    emergencyRepair: 'unsafe_rollback' | 'unsafe_rollback_or_erase';
}
interface TableReconfigureOptions {
    shards?: number;
    replicas?: number | {
        [serverTag: string]: number;
    };
    primaryReplicaTag?: string;
    dryRun?: boolean;
}
interface TableOptions {
    readMode?: 'single' | 'majority' | 'outdated' | 'primary';
    identifierFormat?: 'name' | 'uuid';
}
interface DeleteOptions {
    returnChanges?: boolean | string | 'always';
    durability?: Durability;
}
interface InsertOptions extends DeleteOptions {
    conflict?: 'error' | 'replace' | 'update' | ((id: RDatum, oldDoc: RDatum, newDoc: RDatum) => RDatum | object);
}
interface UpdateOptions extends DeleteOptions {
    nonAtomic?: boolean;
}
interface IndexOptions {
    multi?: boolean;
    geo?: boolean;
}
interface HttpRequestOptions {
    timeout?: number;
    reattempts?: number;
    redirects?: number;
    verify?: boolean;
    resultFormat: 'text' | 'json' | 'jsonp' | 'binary' | 'auto';
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';
    params?: object;
    header?: {
        [key: string]: string | object;
    };
    data?: object;
}
interface HTTPStreamRequestOptions extends HttpRequestOptions {
    page: 'link-next' | ((param: RDatum<{
        params: any;
        header: any;
        body: any;
    }>) => RValue<string>);
    pageLimit: number;
}
interface WaitOptions {
    waitFor?: 'ready_for_outdated_reads' | 'ready_for_reads' | 'ready_for_writes' | 'all_replicas_ready';
    timeout?: number;
}
interface ChangesOptions {
    squash?: boolean | number;
    changefeedQueueSize?: number;
    includeInitial?: boolean;
    includeStates?: boolean;
    includeTypes?: boolean;
    includeOffsets?: boolean;
}
interface ValueChange<T = any> {
    old_val?: T;
    new_val?: T;
}
interface DBConfig {
    id: string;
    name: string;
}
interface DBChangeResult {
    config_changes: Array<ValueChange<DBConfig>>;
    tables_dropped: number;
    dbs_created: number;
    dbs_dropped: number;
}
interface IndexChangeResult {
    created?: number;
    renamed?: number;
    dropped?: number;
}
interface RebalanceResult {
    reconfigured: number;
    config_changes: Array<ValueChange<TableConfig>>;
    status_changes: Array<ValueChange<TableStatus>>;
}
interface ReconfigureResult {
    rebalanced: number;
    status_changes: Array<ValueChange<TableConfig>>;
}
interface TableChangeResult {
    tables_created?: number;
    tables_dropped?: number;
    config_changes: Array<ValueChange<TableConfig>>;
}
interface TableShard {
    primary_replica: string;
    replicas: string[];
    nonvoting_replicas: string[];
}
interface TableConfig {
    id: string;
    name: string;
    db: string;
    primary_key: string;
    shards: TableShard[];
    indexes: string[];
    write_acks: string;
    durability: Durability;
}
interface TableStatus {
    id: string;
    name: string;
    db: string;
    status: {
        all_replicas_ready: boolean;
        ready_for_outdated_reads: boolean;
        ready_for_reads: boolean;
        ready_for_writes: boolean;
    };
    shards: TableShard[];
}
interface IndexStatus {
    function: Buffer;
    geo: boolean;
    index: string;
    multi: boolean;
    outdated: boolean;
    ready: boolean;
}
interface WriteResult<T = any> {
    deleted: number;
    skipped: number;
    errors: number;
    first_error?: string;
    inserted: number;
    replaced: number;
    unchanged: number;
    generated_keys?: string[];
    warnings?: string[];
    changes?: Array<ValueChange<T>>;
}
interface Changes<T = any> extends ValueChange<T> {
    state?: 'initializing' | 'ready';
    type?: 'change' | 'add' | 'remove' | 'initial' | 'uninitial' | 'state';
    old_offset?: number;
    new_offset?: number;
}
interface JoinResult<T1 = any, T2 = any> {
    left: T1;
    right: T2;
}
interface GroupResults<TGroupBy = any, TReduction = any> {
    group: TGroupBy;
    reduction: TReduction;
}
interface MatchResults {
    start: number;
    end: number;
    str: string;
    groups: Array<{
        start: number;
        end: number;
        str: string;
    }>;
}
declare type RCursorType = 'Atom' | 'Cursor' | 'Feed' | 'AtomFeed' | 'OrderByLimitFeed' | 'UnionedFeed';
interface RCursor<T = any> extends NodeJS.ReadableStream {
    readonly profile: any;
    getType(): RCursorType;
    next(): Promise<T>;
    toArray(): Promise<T[]>;
    close(): Promise<void>;
    each(callback: (err: RebirthDBError | undefined, row: any) => any, onFinishedCallback?: () => any): Promise<any>;
    eachAsync(rowHandler: (row: any, rowFinished?: (error?: any) => any) => any, final?: (error: any) => any): Promise<void>;
}
interface RebirthDBError extends Error {
    readonly type: RebirthDBErrorType;
}
declare enum RebirthDBErrorType {
    UNKNOWN = 0,
    API_FAIL = 1,
    CONNECTION = 2,
    POOL_FAIL = 3,
    CURSOR_END = 4,
    TIMEOUT = 5,
    CANCEL = 6,
    PARSE = 7,
    ARITY = 8,
    CURSOR = 9,
    AUTH = 10,
    UNSUPPORTED_PROTOCOL = 11,
    INTERNAL = 12,
    RESOURCE_LIMIT = 13,
    QUERY_LOGIC = 14,
    NON_EXISTENCE = 15,
    OP_FAILED = 16,
    OP_INDETERMINATE = 17,
    USER = 18,
    PERMISSION_ERROR = 19,
}
interface RQuery<T = any> {
    typeOf(): RDatum<string>;
    info(): RDatum<{
        value?: string;
        db?: {
            id: string;
            name: string;
            type: string;
        };
        doc_count_estimates?: number[];
        id?: string;
        indexes?: string[];
        name?: string;
        primary_key?: string;
        type: string;
    }>;
    serialize(): string;
}
interface RDatum<T = any> extends RQuery<T> {
    do<U>(...args: Array<RDatum | ((arg: RDatum<T>, ...args: RDatum[]) => U)>): U extends RStream ? RStream : RDatum;
    <U extends T extends Array<infer T1> ? keyof T1 : keyof T>(attribute: RValue<U>): T extends Array<infer T1> ? RDatum<Array<T[U]>> : RDatum<T[U]>;
    (attribute: RValue<number>): T extends Array<infer T1> ? RDatum<T1> : never;
    getField<U extends keyof T>(attribute: RValue<U>): RDatum<T[U]>;
    nth(attribute: RValue<number>): T extends Array<infer T1> ? RDatum<T1> : never;
    default(value: T): RDatum<T>;
    hasFields(...fields: string[]): T extends Array<infer T1> ? RDatum<T> : RDatum<boolean>;
    append<U>(value: RValue<U>): T extends U[] ? RDatum<T> : never;
    prepend<U>(value: RValue<U>): T extends U[] ? RDatum<T> : never;
    difference<U>(value: RValue<U[]>): T extends U[] ? RDatum<T> : never;
    setInsert<U>(value: RValue<U>): T extends U[] ? RDatum<T> : never;
    setUnion<U>(value: RValue<U[]>): T extends U[] ? RDatum<T> : never;
    setIntersection<U>(value: RValue<U[]>): T extends U[] ? RDatum<T> : never;
    setDifference<U>(value: RValue<U[]>): T extends U[] ? RDatum<T> : never;
    insertAt<U>(index: RValue<number>, value: RValue<U>): T extends U[] ? RDatum<T> : never;
    changeAt<U>(index: RValue<number>, value: RValue<U>): T extends U[] ? RDatum<T> : never;
    spliceAt<U>(index: RValue<number>, value: RValue<U>): T extends U[] ? RDatum<T> : never;
    deleteAt<U>(index: RValue<number>, value: RValue<U>): T extends U[] ? RDatum<T> : never;
    union<U = T extends Array<infer T1> ? T1 : never>(...other: Array<RStream<U> | RValue<U[]> | {
        interleave: boolean | string;
    }>): T extends any[] ? RDatum<U[]> : never;
    map<Res = any, U = T extends Array<infer T1> ? T1 : never>(...args: Array<RStream | ((arg: RDatum<U>, ...args: RDatum[]) => any)>): T extends any[] ? RDatum<Res[]> : never;
    concatMap<Res = any, U = T extends Array<infer T1> ? T1 : never>(...args: Array<RStream | ((arg: RDatum<U>, ...args: RDatum[]) => any)>): T extends any[] ? RDatum<Res[]> : never;
    forEach<U = any, ONE = T extends Array<infer T1> ? T1 : never, RES extends RDatum<WriteResult<U>> | RDatum<DBChangeResult> | RDatum<IndexChangeResult> = RDatum<WriteResult<U>>>(func: (res: RDatum<ONE>) => RES): T extends any[] ? RES : never;
    withFields(...fields: MultiFieldSelector[]): T extends Array<infer T1> ? RDatum<Array<Partial<T1>>> : never;
    filter<U = T extends Array<infer T1> ? T1 : never>(predicate: (doc: RDatum<U>) => RValue<boolean>, options?: {
        default: boolean;
    }): this;
    includes(geometry: RDatum): T extends Array<infer T1> ? RDatum<T> : never;
    intersects(geometry: RDatum): T extends Array<infer T1> ? RDatum<T> : never;
    contains<U = T extends Array<infer T1> ? T1 : never>(val1: any[] | null | string | number | object | Func<U>, ...value: Array<any[] | null | string | number | object | Func<U>>): T extends Array<infer T1> ? RDatum<boolean> : never;
    orderBy<U = T extends Array<infer T1> ? T1 : never>(...fields: Array<FieldSelector<T>>): T extends Array<infer T1> ? RDatum<T> : never;
    group<F extends T extends Array<infer T1> ? keyof T1 : never, D extends T extends Array<infer T2> ? T2 : never>(...fieldOrFunc: Array<FieldSelector<T>>): T extends Array<infer T1> ? RDatum : never;
    ungroup(): RDatum<Array<GroupResults<any, any>>>;
    count<U = T extends Array<infer T1> ? T1 : never>(value?: RValue<U> | Func<U, boolean>): T extends Array<infer T1> ? RDatum<number> : never;
    sum<U = T extends Array<infer T1> ? T1 : never>(value?: FieldSelector<U, number | null>): T extends Array<infer T1> ? RDatum<number> : never;
    avg<U = T extends Array<infer T1> ? T1 : never>(value?: FieldSelector<U, number | null>): T extends Array<infer T1> ? RDatum<number> : never;
    min<U = T extends Array<infer T1> ? T1 : never>(value?: FieldSelector<U, number | null>): T extends Array<infer T1> ? RDatum<number> : never;
    max<U = T extends Array<infer T1> ? T1 : never>(value?: FieldSelector<U, number | null>): T extends Array<infer T1> ? RDatum<number> : never;
    reduce<U = any, ONE = T extends Array<infer T1> ? T1 : never>(reduceFunction: (left: RDatum<ONE>, right: RDatum<ONE>) => any): T extends Array<infer T1> ? RDatum<U> : never;
    fold<ACC = any, RES = any, ONE = T extends Array<infer T1> ? T1 : never>(base: any, foldFunction: (acc: RDatum<ACC>, next: RDatum<ONE>) => any, options?: {
        emit?: (acc: RDatum<ACC>, next: RDatum<ONE>, new_acc: RDatum<ACC>) => any[];
        finalEmit?: (acc: RStream) => any[];
    }): T extends Array<infer T1> ? RDatum<RES[]> : never;
    distinct(): RDatum<T>;
    pluck(...fields: MultiFieldSelector[]): T extends Array<infer T1> ? RDatum<Array<Partial<T1>>> : never;
    without(...fields: MultiFieldSelector[]): T extends Array<infer T1> ? RDatum<Array<Partial<T1>>> : never;
    merge<U = any>(...objects: object[]): T extends Array<infer T1> ? RDatum<U[]> : RDatum<U>;
    skip(n: RValue<number>): T extends Array<infer T1> ? RDatum<T> : never;
    limit(n: RValue<number>): T extends Array<infer T1> ? RDatum<T> : never;
    slice(start: RValue<number>, end?: RValue<number>, options?: {
        leftBound: 'open' | 'closed';
        rightBound: 'open' | 'closed';
    }): T extends Array<infer T1> ? RDatum<T> : never;
    sample(n: RValue<number>): T extends Array<infer T1> ? RDatum<T> : never;
    offsetsOf<U = T extends Array<infer T1> ? T1 : never>(single: RValue<U> | Func<U, boolean>): T extends Array<infer T1> ? RDatum<number[]> : never;
    isEmpty(): T extends Array<infer T1> ? RDatum<boolean> : never;
    coerceTo<U = any>(type: 'object'): T extends Array<infer T1> ? RDatum<U> : never;
    coerceTo(type: 'string'): RDatum<string>;
    coerceTo(type: 'array'): RDatum<any[]>;
    coerceTo(type: 'number'): T extends string ? RDatum<number> : never;
    coerceTo(type: 'binary'): T extends string ? RDatum<Buffer> : never;
    match(regexp: RValue<string>): T extends string ? RDatum<MatchResults | null> : never;
    split(seperator?: RValue<string>, maxSplits?: RValue<number>): T extends string ? RDatum<string[]> : never;
    upcase(): T extends string ? RDatum<string> : never;
    downcase(): T extends string ? RDatum<string> : never;
    add(...str: Array<RValue<string> | RValue<number>>): T extends string | number | Date ? RDatum<T> : never;
    gt(...value: Array<RValue<string> | RValue<number> | RValue<Date>>): T extends string | number | Date ? RDatum<boolean> : never;
    ge(...value: Array<RValue<string> | RValue<number> | RValue<Date>>): T extends string | number | Date ? RDatum<boolean> : never;
    lt(...value: Array<RValue<string> | RValue<number> | RValue<Date>>): T extends string | number | Date ? RDatum<boolean> : never;
    le(...value: Array<RValue<string> | RValue<number> | RValue<Date>>): T extends string | number | Date ? RDatum<boolean> : never;
    sub(...num: Array<RValue<number>>): T extends number ? RDatum<number> : T extends Date ? RDatum<Date> : never;
    sub(date: RValue<Date>): T extends Date ? RDatum<number> : never;
    mul(...num: Array<RValue<number>>): T extends number ? RDatum<number> : never;
    div(...num: Array<RValue<number>>): T extends number ? RDatum<number> : never;
    mod(...num: Array<RValue<number>>): T extends number ? RDatum<number> : never;
    bitAnd(...num: Array<RValue<number>>): T extends number ? RDatum<number> : never;
    bitOr(...num: Array<RValue<number>>): T extends number ? RDatum<number> : never;
    bitXor(...num: Array<RValue<number>>): T extends number ? RDatum<number> : never;
    bitNot(...num: Array<RValue<number>>): T extends number ? RDatum<number> : never;
    bitSal(...num: Array<RValue<number>>): T extends number ? RDatum<number> : never;
    bitShl(...num: Array<RValue<number>>): T extends number ? RDatum<number> : never;
    bitSar(...num: Array<RValue<number>>): T extends number ? RDatum<number> : never;
    bitSht(...num: Array<RValue<number>>): T extends number ? RDatum<number> : never;
    round(): T extends number ? RDatum<number> : never;
    ceil(): T extends number ? RDatum<number> : never;
    floor(): T extends number ? RDatum<number> : never;
    branch(trueBranch: T, falseBranchOrTest: any, ...branches: any[]): T extends boolean ? RDatum<any> : never;
    and(...bool: Array<RDatum<boolean>>): T extends boolean ? RDatum<boolean> : never;
    or(...bool: Array<RDatum<boolean>>): T extends boolean ? RDatum<boolean> : never;
    not(): T extends boolean ? RDatum<boolean> : never;
    inTimezone(timezone: string): T extends Date ? RDatum<Date> : never;
    timezone(): T extends Date ? RDatum<string> : never;
    during(start: RValue<Date>, end: RValue<Date>, options?: {
        leftBound: 'open' | 'closed';
        rightBound: 'open' | 'closed';
    }): T extends Date ? RDatum<boolean> : never;
    date(): T extends Date ? RDatum<Date> : never;
    timeOfDay(): T extends Date ? RDatum<number> : never;
    year(): T extends Date ? RDatum<number> : never;
    month(): T extends Date ? RDatum<number> : never;
    day(): T extends Date ? RDatum<number> : never;
    dayOfWeek(): T extends Date ? RDatum<number> : never;
    dayOfYear(): T extends Date ? RDatum<number> : never;
    hours(): T extends Date ? RDatum<number> : never;
    minutes(): T extends Date ? RDatum<number> : never;
    seconds(): T extends Date ? RDatum<number> : never;
    toISO8601(): T extends Date ? RDatum<string> : never;
    toEpochTime(): T extends Date ? RDatum<number> : never;
    distance(geo: RValue, options?: {
        geoSystem: string;
        unit: string;
    }): RDatum<number>;
    toGeojson(): RDatum;
    fill(): RDatum;
    polygonSub(polygon2: RValue): RDatum;
    toJsonString(): RDatum<string>;
    toJSON(): RDatum<string>;
    eq(...value: RValue[]): RDatum<boolean>;
    ne(...value: RValue[]): RDatum<boolean>;
    keys(): RDatum<string[]>;
    values(): RDatum<Array<T[keyof T]>>;
}
interface RStream<T = any> extends RQuery<T[]> {
    forEach<U = any, RES extends RDatum<WriteResult<U>> | RDatum<DBChangeResult> | RDatum<IndexChangeResult> = RDatum<WriteResult<U>>>(func: (res: RDatum<T>) => RES): RES;
    changes(options?: ChangesOptions): RFeed<Changes<T>>;
    <U extends keyof T>(attribute: RValue<U>): RStream<T[U]>;
    (n: RValue<number>): RDatum<T>;
    getField<U extends keyof T>(fieldName: RValue<U>): RStream<T[U]>;
    innerJoin<U>(other: RStream<U>, predicate: (doc1: RDatum<T>, doc2: RDatum<U>) => RValue<boolean>): RStream<JoinResult<T, U>>;
    outerJoin<U>(other: RStream<U>, predicate: (doc1: RDatum<T>, doc2: RDatum<U>) => RValue<boolean>): RStream<JoinResult<T, U>>;
    eqJoin<U>(fieldOrPredicate: RValue<keyof T> | Func<T, boolean>, rightTable: RValue<string>, options?: {
        index: string;
    }): RStream<JoinResult<T, U>>;
    zip(): T extends JoinResult<infer U1, infer U2> ? U1 & U2 : never;
    union<U = T>(...other: Array<RStream<U> | RValue<U[]> | {
        interleave: boolean | string;
    }>): RStream<U>;
    union<U = T>(...other: Array<RStream<U> | RValue<U[]> | RFeed<U> | {
        interleave: boolean | string;
    }>): RFeed<U>;
    map<U = any>(...args: Array<RStream | ((arg: RDatum<T>, ...args: RDatum[]) => any)>): RStream<U>;
    concatMap<U = any>(...args: Array<RStream | ((arg: RDatum<T>, ...args: RDatum[]) => any)>): RStream<U>;
    withFields(...fields: MultiFieldSelector[]): RStream<Partial<T>>;
    hasFields(...fields: MultiFieldSelector[]): RStream<T>;
    filter(predicate: (doc: RDatum<T>) => RValue<boolean>, options?: {
        default: boolean;
    }): this;
    includes(geometry: RDatum): RStream<T>;
    intersects(geometry: RDatum): RStream<T>;
    contains(val1: any[] | null | string | number | object | Func<T>, ...value: Array<any[] | null | string | number | object | Func<T>>): RDatum<boolean>;
    orderBy(...fieldOrIndex: Array<FieldSelector<T> | {
        index: string;
    }>): RStream<T>;
    group<U extends keyof T>(...fieldOrFunc: Array<U | ((row: RDatum<T>) => any) | {
        index?: string;
        multi?: boolean;
    }>): T extends Array<infer T1> ? RDatum : never;
    count(value?: RValue<T> | Func<T, boolean>): RDatum<number>;
    sum(value?: RValue<T> | Func<T, number | null>): RDatum<number>;
    avg(value?: RValue<T> | Func<T, number | null>): RDatum<number>;
    min(value?: RValue<T> | Func<T, number | null> | {
        index: string;
    }): RDatum<number>;
    max(value?: RValue<T> | Func<T, number | null> | {
        index: string;
    }): RDatum<number>;
    reduce<U = any>(reduceFunction: (left: RDatum<T>, right: RDatum<T>) => any): RDatum<U>;
    fold<ACC = any, RES = any>(base: any, foldFunction: (acc: RDatum<ACC>, next: RDatum<T>) => any, options?: {
        emit?: (acc: RDatum<ACC>, next: RDatum<T>, new_acc: RDatum<ACC>) => any[];
        finalEmit?: (acc: RStream) => any[];
    }): RStream<RES>;
    distinct(): RStream<T>;
    distinct<TIndex = any>(index: {
        index: string;
    }): RStream<TIndex>;
    pluck(...fields: MultiFieldSelector[]): RStream<Partial<T>>;
    without(...fields: MultiFieldSelector[]): RStream<Partial<T>>;
    merge<U = any>(...objects: any[]): RStream<U>;
    skip(n: RValue<number>): RStream<T>;
    limit(n: RValue<number>): RStream<T>;
    slice(start: RValue<number>, end?: RValue<number>, options?: {
        leftBound: 'open' | 'closed';
        rightBound: 'open' | 'closed';
    }): RStream;
    nth(n: RValue<number>): RDatum<T>;
    sample(n: RValue<number>): RDatum<T[]>;
    offsetsOf(single: RValue<T> | Func<T, boolean>): RDatum<number[]>;
    isEmpty(): RDatum<boolean>;
    coerceTo(type: 'array'): RDatum<T[]>;
    coerceTo<U = any>(type: 'object'): RDatum<U>;
}
interface RFeed<T = any> extends RQuery<RCursor<T>> {
    <U extends keyof T>(attribute: RValue<U>): RFeed<T[U]>;
    getField<U extends keyof T>(fieldName: RValue<U>): RFeed<T[U]>;
    union<U = T>(...other: Array<RStream<U> | RValue<U[]> | RFeed<U> | {
        interleave: boolean | string;
    }>): RFeed<U>;
    map<U = any>(...args: Array<RStream | ((arg: RDatum<T>, ...args: RDatum[]) => any)>): RFeed<U>;
    concatMap<U = any>(...args: Array<RStream | ((arg: RDatum<T>, ...args: RDatum[]) => any)>): RFeed<U>;
    withFields(...fields: MultiFieldSelector[]): RFeed<Partial<T>>;
    hasFields(...fields: MultiFieldSelector[]): RFeed<T>;
    filter(predicate: (doc: RDatum<T>) => RValue<boolean>, options?: {
        default: boolean;
    }): this;
    includes(geometry: RDatum): RFeed<T>;
    intersects(geometry: RDatum): RFeed<T>;
    fold<ACC = any, RES = any>(base: any, foldFunction: (acc: RDatum<ACC>, next: RDatum<T>) => any, options: {
        emit: (acc: RDatum<ACC>, next: RDatum<T>, newAcc: RDatum<ACC>) => any[];
    }): RFeed<RES>;
    pluck(...fields: MultiFieldSelector[]): RFeed<Partial<T>>;
    without(...fields: MultiFieldSelector[]): RFeed<Partial<T>>;
}
interface RSingleSelection<T = any> extends RDatum<T> {
    update(obj: RValue<Partial<T>>, options?: UpdateOptions): RDatum<WriteResult<T>>;
    replace(obj: RValue<T>, options?: UpdateOptions): RDatum<WriteResult<T>>;
    delete(options?: DeleteOptions): RDatum<WriteResult<T>>;
    changes(options?: ChangesOptions): RFeed<Changes<T>>;
}
interface RSelection<T = any> extends RStream<T> {
    update(obj: RValue<Partial<T>>, options?: UpdateOptions): RDatum<WriteResult<T>>;
    replace(obj: RValue<T>, options?: UpdateOptions): RDatum<WriteResult<T>>;
    delete(options?: DeleteOptions): RDatum<WriteResult<T>>;
}
interface RTable<T = any> extends RSelection<T> {
    grant(userName: string, options?: {
        read?: boolean;
        write?: boolean;
        connect?: boolean;
        config?: boolean;
    }): RDatum<{
        granted: number;
        permissions_changes: Array<ValueChange<{
            read: boolean;
            write: boolean;
            connect: boolean;
            config: boolean;
        }>>;
    }>;
    indexCreate(indexName: RValue<string>, indexFunction?: RDatum | RDatum[] | ((row: RDatum) => any), options?: IndexOptions): RDatum<IndexChangeResult>;
    indexCreate(indexName: RValue<string>, options?: {
        multi: boolean;
        geo: boolean;
    }): RDatum<IndexChangeResult>;
    indexDrop(indexName: RValue<string>): RDatum<IndexChangeResult>;
    indexList(): RDatum<string[]>;
    indexRename(oldName: RValue<string>, newName: RValue<string>, options?: {
        overwrite: boolean;
    }): RDatum<IndexChangeResult>;
    indexStatus(...indexName: string[]): RDatum<IndexStatus>;
    indexWait(...indexName: string[]): RDatum<IndexStatus>;
    insert(obj: any, options?: InsertOptions): RDatum<WriteResult<T>>;
    sync(): RDatum<{
        synced: number;
    }>;
    get(key: any): RSingleSelection<T>;
    getAll(key: any, options?: {
        index: string;
    }): RSelection<T>;
    getAll(key1: any, key2: any, options?: {
        index: string;
    }): RSelection<T>;
    getAll(key1: any, key2: any, key3: any, options?: {
        index: string;
    }): RSelection<T>;
    getAll(key1: any, key2: any, key3: any, key4: any, options?: {
        index: string;
    }): RSelection<T>;
    between(lowKey: any, highKey: any, options?: {
        index?: string;
        leftBound: 'open' | 'closed';
        rightBound: 'open' | 'closed';
    }): RSelection<T>;
    getIntersecting(geometry: RDatum, index: {
        index: string;
    }): RStream<T>;
    getNearest(geometry: RDatum, options?: {
        index: string;
        maxResults?: number;
        maxDist?: number;
        unit?: string;
        geoSystem?: string;
    }): RStream<T>;
    config(): RSingleSelection<DBConfig>;
    status(): RDatum<TableStatus>;
    rebalance(): RDatum<RebalanceResult>;
    reconfigure(options: TableReconfigureOptions): RDatum<ReconfigureResult>;
    wait(options?: WaitOptions): RDatum<{
        ready: 1;
    }>;
    getWriteHook(): RDatum<{
        function: Buffer;
        query: string;
    }>;
    setWriteHook(func: null | Buffer | (((context: RDatum<{
        primary_key: string;
        timestamp: Date;
    }>, oldVal: RDatum<T>, newVal: RDatum<T>) => any))): RDatum<{
        function: Buffer;
        query: string;
    }>;
}
interface RDatabase {
    grant(userName: string, options?: {
        read?: boolean;
        write?: boolean;
        connect?: boolean;
        config?: boolean;
    }): RDatum<{
        granted: number;
        permissions_changes: Array<ValueChange<{
            read: boolean;
            write: boolean;
            connect: boolean;
            config: boolean;
        }>>;
    }>;
    tableCreate(tableName: RValue<string>, options?: TableCreateOptions): RDatum<TableChangeResult>;
    tableDrop(tableName: RValue<string>): RDatum<TableChangeResult>;
    tableList(): RDatum<string[]>;
    table<T = any>(tableName: RValue<string>, options?: TableOptions): RTable<T>;
    config(): RSingleSelection<TableConfig>;
    rebalance(): RDatum<RebalanceResult>;
    reconfigure(options?: TableReconfigureOptions): RDatum<ReconfigureResult>;
    wait(options?: WaitOptions): RDatum<{
        ready: number;
    }>;
}
declare namespace r {
    const minval: RValue;
    const maxval: RValue;
    const monday: RValue;
    const tuesday: RValue;
    const wednesday: RValue;
    const thursday: RValue;
    const friday: RValue;
    const saturday: RValue;
    const sunday: RValue;
    const january: RValue;
    const february: RValue;
    const march: RValue;
    const april: RValue;
    const may: RValue;
    const june: RValue;
    const july: RValue;
    const august: RValue;
    const september: RValue;
    const october: RValue;
    const november: RValue;
    const december: RValue;
    function setNestingLevel(level: number): void;
    function setArrayLimit(limit: number): void;
    function deserialize<T extends RQuery = RQuery>(query: string): T;
    function expr<T>(val: T): RDatum<T>;
    // function <T>(val: T): RDatum<T>;
    function desc(indexName: RValue<string>): any;
    function asc(indexName: RValue<string>): any;
    function epochTime(epochTime: RValue<number>): RDatum<Date>;
    function now(): RDatum<Date>;
    function time(year: RValue<number>, month: RValue<number>, day: RValue<number>, hour: RValue<number>, minute: RValue<number>, second: RValue<number>, timezone: RValue<string>): RDatum<Date>;
    function time(year: RValue<number>, month: RValue<number>, day: RValue<number>, timezone: RValue<string>): RDatum<Date>;
    function ISO8601(time: RValue<string>, options?: {
        defaultTimezone: string;
    }): RDatum<Date>;
    function binary(data: any): RDatum<Buffer>;
    function json(json: RValue<string>): RDatum;
    function object<T = any>(key1: RValue<string>, value1: RValue, keyOrValue: RValue[]): RDatum<T>;
    function point(longitude: RValue<string>, latitude: RValue<string>): RDatum;
    function line(point1: [string, string], point2: [string, string], ...points: Array<[string, string]>): RDatum;
    function line(point1: RDatum, point2: RDatum, ...points: RDatum[]): RDatum;
    function polygon(point1: RDatum, point2: RDatum, point3: RDatum, ...points: RDatum[]): RDatum;
    function polygon(ll1: [string, string], ll2: [string, string], ll3: [string, string], ...longitudeLatitudes: Array<[string, string]>): RDatum;
    function circle(longitudeLatitude: [string, string] | RDatum, radius: RValue<number>, options?: {
        numVertices?: number;
        geoSystem?: 'WGS84' | 'unit_sphere';
        unit?: 'm' | 'km' | 'mi' | 'nm' | 'ft';
        fill?: boolean;
    }): RDatum;
    function geojson(geoJSON: any): RDatum;
    function args(arg: Array<RValue<Primitives | object | any[]>>): any;
    function error(message?: RValue<string>): any;
    function js(js: RValue<string>, options?: {
        timeout: number;
    }): RDatum;
    function literal<T>(obj: T): RDatum<T>;
    function random(lowBound?: RValue<number>, highBound?: RValue<number> | {
        float: boolean;
    }, options?: {
        float: boolean;
    }): RDatum<number>;
    function range(startValue: RValue<number>, endValue?: RValue<number>): RStream<number>;
    function uuid(val?: RValue<string>): RDatum<string>;
    function http(url: RValue<string>, options?: HttpRequestOptions): RDatum;
    function http(url: RValue<string>, options?: HTTPStreamRequestOptions): RStream;
    function grant(userName: string, options: {
        read?: boolean;
        write?: boolean;
        connect?: boolean;
        config?: boolean;
    }): RDatum<{
        granted: number;
        permissions_changes: Array<ValueChange<{
            read: boolean;
            write: boolean;
            connect: boolean;
            config: boolean;
        }>>;
    }>;
    function db(dbName: string): RDatabase;
    function dbCreate(dbName: RValue<string>): RDatum<DBChangeResult>;
    function dbDrop(dbName: RValue<string>): RDatum<DBChangeResult>;
    function dbList(): RDatum<string[]>;
    function table<T = any>(tableName: RValue<string>, options?: TableOptions): RTable<T>;
    function tableCreate(tableName: RValue<string>, options?: TableCreateOptions): RDatum<TableChangeResult>;
    function tableDrop(tableName: RValue<string>): RDatum<TableChangeResult>;
    function tableList(): RDatum<string[]>;
    function config(database: RDatabase): RSingleSelection<DBConfig>;
    function config<T>(table: RTable<T>): RSingleSelection<TableConfig>;
    function rebalance(database: RDatabase): RDatum<RebalanceResult>;
    function rebalance<T>(table: RTable<T>): RDatum<RebalanceResult>;
    function reconfigure(database: RDatabase, options?: TableReconfigureOptions): RDatum<ReconfigureResult>;
    function reconfigure<T>(table: RTable<T>, options: TableReconfigureOptions): RDatum<ReconfigureResult>;
    function wait(database: RDatabase, options?: WaitOptions): RDatum<{
        ready: number;
    }>;
    function wait<T>(table: RTable<T>, options?: WaitOptions): RDatum<{
        ready: 1;
    }>;
    function indexCreate<T>(table: RTable<T>, indexName: RValue<string>, indexFunction?: RDatum | RDatum[] | ((row: RDatum) => any), options?: IndexOptions): RDatum<IndexChangeResult>;
    function indexCreate<T>(table: RTable<T>, indexName: RValue<string>, options?: {
        multi: boolean;
        geo: boolean;
    }): RDatum<IndexChangeResult>;
    function indexDrop<T>(table: RTable<T>, indexName: RValue<string>): RDatum<IndexChangeResult>;
    function indexList<T>(table: RTable<T>): RDatum<string[]>;
    function indexRename<T>(table: RTable<T>, oldName: RValue<string>, newName: RValue<string>, options?: {
        overwrite: boolean;
    }): RDatum<IndexChangeResult>;
    function indexStatus<T>(table: RTable<T>, ...indexName: string[]): RDatum<IndexStatus>;
    function indexWait<T>(table: RTable<T>, ...indexName: string[]): RDatum<IndexStatus>;
    function insert<T>(table: RTable<T>, obj: any, options?: InsertOptions): RDatum<WriteResult<T>>;
    function sync<T>(table: RTable<T>): RDatum<{
        synced: number;
    }>;
    function get<T>(table: RTable<T>, key: any): RSingleSelection<T>;
    function getAll<T>(table: RTable<T>, key: any, options?: {
        index: string;
    }): RSelection<T>;
    function getAll<T>(table: RTable<T>, key1: any, key2: any, options?: {
        index: string;
    }): RSelection<T>;
    function getAll<T>(table: RTable<T>, key1: any, key2: any, key3: any, options?: {
        index: string;
    }): RSelection<T>;
    function getAll<T>(table: RTable<T>, key1: any, key2: any, key3: any, key4: any, options?: {
        index: string;
    }): RSelection<T>;
    function between<T>(table: RTable<T>, lowKey: any, highKey: any, options?: {
        index?: string;
        leftBound: 'open' | 'closed';
        rightBound: 'open' | 'closed';
    }): RSelection<T>;
    function getIntersecting<T>(table: RTable<T>, geometry: RDatum, index: {
        index: string;
    }): RStream<T>;
    function getNearest<T>(table: RTable<T>, geometry: RDatum, options?: {
        index: string;
        maxResults?: number;
        maxDist?: number;
        unit?: string;
        geoSystem?: string;
    }): RStream<T>;
    function status<T>(table: RTable<T>): RDatum<TableStatus>;
    function getWriteHook<T>(table: RTable<T>): RDatum<{
        function: Buffer;
        query: string;
    }>;
    function setWriteHook<T>(table: RTable<T>, func: null | Buffer | (((context: RDatum<{
        primary_key: string;
        timestamp: Date;
    }>, oldVal: RDatum<T>, newVal: RDatum<T>) => any))): RDatum<{
        function: Buffer;
        query: string;
    }>;
    function update<T>(selection: RSelection<T> | RSingleSelection<T>, obj: RValue<Partial<T>>, options?: UpdateOptions): RDatum<WriteResult<T>>;
    function replace<T>(selection: RSelection<T> | RSingleSelection<T>, obj: RValue<T>, options?: UpdateOptions): RDatum<WriteResult<T>>;
    // function delete<T>(selection: RSelection<T> | RSingleSelection<T>, options?: DeleteOptions): RDatum<WriteResult<T>>;
    function changes<T>(selection: RSingleSelection<T> | RStream<T>, options?: ChangesOptions): RFeed<Changes<T>>;
    function forEach<T, U = any, RES extends RDatum<WriteResult<U>> | RDatum<DBChangeResult> | RDatum<IndexChangeResult> = RDatum<WriteResult<U>>>(stream: RStream<T>, func: (res: RDatum<T>) => RES): RES;
    function forEach<T, U = any, ONE = T extends Array<infer T1> ? T1 : never, RES extends RDatum<WriteResult<U>> | RDatum<DBChangeResult> | RDatum<IndexChangeResult> = RDatum<WriteResult<U>>>(datum: RDatum<T>, func: (res: RDatum<ONE>) => RES): T extends any[] ? RES : never;
    function getField<T, U extends keyof T>(stream: RStream<T>, fieldName: RValue<U>): RStream<T[U]>;
    function getField<T, U extends keyof T>(feed: RFeed<T>, fieldName: RValue<U>): RFeed<T[U]>;
    function getField<T, U extends keyof T>(datum: RDatum<T>, attribute: RValue<U>): RDatum<T[U]>;
    function innerJoin<T, U>(stream: RStream<T>, other: RStream<U>, predicate: (doc1: RDatum<T>, doc2: RDatum<U>) => RValue<boolean>): RStream<JoinResult<T, U>>;
    function outerJoin<T, U>(stream: RStream<T>, other: RStream<U>, predicate: (doc1: RDatum<T>, doc2: RDatum<U>) => RValue<boolean>): RStream<JoinResult<T, U>>;
    function eqJoin<T, U>(stream: RStream<T>, fieldOrPredicate: RValue<keyof T> | Func<T, boolean>, rightTable: RValue<string>, options?: {
        index: string;
    }): RStream<JoinResult<T, U>>;
    function zip<T>(stream: RStream<T>): T extends JoinResult<infer U1, infer U2> ? U1 & U2 : never;
    function union<T, U = T>(stream: T extends Array<infer TArr> ? RStream<T> | RValue<TArr> : RStream<T>, ...other: Array<RStream<U> | RValue<U[]> | {
        interleave: boolean | string;
    }>): RStream<U>;
    function union<T, U = T>(stream: T extends Array<infer TArr> ? RStream<T> | RFeed<T> | RValue<TArr> : RStream<T> | RFeed<T>, ...other: Array<RStream<U> | RValue<U[]> | RFeed<U> | {
        interleave: boolean | string;
    }>): RFeed<U>;
    function map<T, U = any>(stream: RStream<T>, ...args: Array<RStream | ((arg: RDatum<T>, ...args: RDatum[]) => any)>): RStream<U>;
    function map<T, U = any>(feed: RFeed<T>, ...args: Array<RStream | ((arg: RDatum<T>, ...args: RDatum[]) => any)>): RFeed<U>;
    function map<T, Res = any, U = T extends Array<infer T1> ? T1 : never>(datum: RDatum<T>, ...args: Array<RStream | ((arg: RDatum<U>, ...args: RDatum[]) => any)>): T extends any[] ? RDatum<Res[]> : never;
    function concatMap<T, U = any>(feed: RFeed<T>, ...args: Array<RStream | ((arg: RDatum<T>, ...args: RDatum[]) => any)>): RFeed<U>;
    function concatMap<T, U = any>(stream: RStream<T>, ...args: Array<RStream | ((arg: RDatum<T>, ...args: RDatum[]) => any)>): RStream<U>;
    function concatMap<T, Res = any, U = T extends Array<infer T1> ? T1 : never>(datum: RDatum<T>, ...args: Array<RStream | ((arg: RDatum<U>, ...args: RDatum[]) => any)>): T extends any[] ? RDatum<Res[]> : never;
    function withFields<T>(feed: RFeed<T>, ...fields: MultiFieldSelector[]): RFeed<Partial<T>>;
    function withFields<T>(stream: RStream<T>, ...fields: MultiFieldSelector[]): RStream<Partial<T>>;
    function withFields<T>(datum: RDatum<T>, ...fields: MultiFieldSelector[]): T extends Array<infer T1> ? RDatum<Array<Partial<T1>>> : never;
    function hasFields<T>(feed: RFeed<T>, ...fields: MultiFieldSelector[]): RFeed<T>;
    function hasFields<T>(stream: RStream<T>, ...fields: MultiFieldSelector[]): RStream<T>;
    function hasFields<T>(datum: RDatum<T>, ...fields: string[]): T extends Array<infer T1> ? RDatum<T> : RDatum<boolean>;
    function filter<T>(feed: RFeed<T>, predicate: (doc: RDatum<T>) => RValue<boolean>, options?: {
        default: boolean;
    }): RFeed<T>;
    function filter<T>(stream: RStream<T>, predicate: (doc: RDatum<T>) => RValue<boolean>, options?: {
        default: boolean;
    }): RStream<T>;
    function filter<T, U = T extends Array<infer T1> ? T1 : never>(datum: RDatum<T>, predicate: (doc: RDatum<U>) => RValue<boolean>, options?: {
        default: boolean;
    }): RDatum<T>;
    function includes<T>(datum: RDatum<T>, geometry: RDatum): T extends Array<infer T1> ? RDatum<T> : never;
    function includes<T>(feed: RFeed<T>, geometry: RDatum): RFeed<T>;
    function includes<T>(stream: RStream<T>, geometry: RDatum): RStream<T>;
    function intersects<T>(datum: RDatum<T>, geometry: RDatum): T extends Array<infer T1> ? RDatum<T> : never;
    function intersects<T>(feed: RFeed<T>, geometry: RDatum): RFeed<T>;
    function intersects<T>(stream: RStream<T>, geometry: RDatum): RStream<T>;
    function contains<T, U = T extends Array<infer T1> ? T1 : never>(datum: RDatum<T>, val1: any[] | null | string | number | object | Func<U>, ...value: Array<any[] | null | string | number | object | Func<U>>): T extends Array<infer T1> ? RDatum<boolean> : never;
    function contains<T>(stream: RStream<T>, val1: any[] | null | string | number | object | Func<T>, ...value: Array<any[] | null | string | number | object | Func<T>>): RDatum<boolean>;
    function orderBy<T, U = T extends Array<infer T1> ? T1 : never>(datum: RDatum<T>, ...fields: Array<FieldSelector<T>>): T extends Array<infer T1> ? RDatum<T> : never;
    function orderBy<T>(stream: RStream<T>, ...fieldOrIndex: Array<FieldSelector<T> | {
        index: string;
    }>): RStream<T>;
    function group<T, F extends T extends Array<infer T1> ? keyof T1 : never, D extends T extends Array<infer T2> ? T2 : never>(datum: RDatum<T>, ...fieldOrFunc: Array<FieldSelector<T>>): T extends Array<infer T1> ? RDatum : never;
    function group<T, U extends keyof T>(stream: RStream<T>, ...fieldOrFunc: Array<U | ((row: RDatum<T>) => any) | {
        index?: string;
        multi?: boolean;
    }>): T extends Array<infer T1> ? RDatum : never;
    function count<T, U = T extends Array<infer T1> ? T1 : never>(datum: RDatum<T>, value?: RValue<U> | Func<U, boolean>): T extends Array<infer T1> ? RDatum<number> : never;
    function count<T>(stream: RStream<T>, value?: RValue<T> | Func<T, boolean>): RDatum<number>;
    function sum<T, U = T extends Array<infer T1> ? T1 : never>(datum: RDatum<T>, value?: FieldSelector<U, number | null>): T extends Array<infer T1> ? RDatum<number> : never;
    function sum<T>(stream: RStream<T>, value?: RValue<T> | Func<T, number | null>): RDatum<number>;
    function avg<T, U = T extends Array<infer T1> ? T1 : never>(datum: RDatum<T>, value?: FieldSelector<U, number | null>): T extends Array<infer T1> ? RDatum<number> : never;
    function avg<T>(stream: RStream<T>, value?: RValue<T> | Func<T, number | null>): RDatum<number>;
    function min<T, U = T extends Array<infer T1> ? T1 : never>(datum: RDatum<T>, value?: FieldSelector<U, number | null>): T extends Array<infer T1> ? RDatum<number> : never;
    function min<T>(stream: RStream<T>, value?: RValue<T> | Func<T, number | null> | {
        index: string;
    }): RDatum<number>;
    function max<T, U = T extends Array<infer T1> ? T1 : never>(datum: RDatum<T>, value?: FieldSelector<U, number | null>): T extends Array<infer T1> ? RDatum<number> : never;
    function max<T>(stream: RStream<T>, value?: RValue<T> | Func<T, number | null> | {
        index: string;
    }): RDatum<number>;
    function reduce<T, U = any, ONE = T extends Array<infer T1> ? T1 : never>(datum: RDatum<T>, reduceFunction: (left: RDatum<ONE>, right: RDatum<ONE>) => any): T extends Array<infer T1> ? RDatum<U> : never;
    function reduce<T, U = any>(stream: RStream<T>, reduceFunction: (left: RDatum<T>, right: RDatum<T>) => any): RDatum<U>;
    function fold<T, ACC = any, RES = any, ONE = T extends Array<infer T1> ? T1 : never>(datum: RDatum<T>, base: any, foldFunction: (acc: RDatum<ACC>, next: RDatum<ONE>) => any, options?: {
        emit?: (acc: RDatum<ACC>, next: RDatum<ONE>, new_acc: RDatum<ACC>) => any[];
        finalEmit?: (acc: RStream) => any[];
    }): T extends Array<infer T1> ? RDatum<RES[]> : never;
    function fold<T, ACC = any, RES = any>(feed: RFeed<T>, base: any, foldFunction: (acc: RDatum<ACC>, next: RDatum<T>) => any, options: {
        emit: (acc: RDatum<ACC>, next: RDatum<T>, new_acc: RDatum<ACC>) => any[];
    }): RFeed<RES>;
    function fold<T, ACC = any, RES = any>(stream: RStream<T>, base: any, foldFunction: (acc: RDatum<ACC>, next: RDatum<T>) => any, options?: {
        emit?: (acc: RDatum<ACC>, next: RDatum<T>, new_acc: RDatum<ACC>) => any[];
        finalEmit?: (acc: RStream) => any[];
    }): RStream<RES>;
    function distinct<T>(datum: RDatum<T>): RDatum<T>;
    function distinct<T>(stream: RStream<T>): RStream<T>;
    function distinct<T, TIndex = any>(stream: RStream<T>, index: {
        index: string;
    }): RStream<TIndex>;
    function pluck<T>(datum: RDatum<T>, ...fields: MultiFieldSelector[]): T extends Array<infer T1> ? RDatum<Array<Partial<T1>>> : never;
    function pluck<T>(feed: RFeed<T>, ...fields: MultiFieldSelector[]): RFeed<Partial<T>>;
    function pluck<T>(stream: RStream<T>, ...fields: MultiFieldSelector[]): RStream<Partial<T>>;
    function without<T>(datum: RDatum<T>, ...fields: MultiFieldSelector[]): T extends Array<infer T1> ? RDatum<Array<Partial<T1>>> : never;
    function without<T>(feed: RFeed<T>, ...fields: MultiFieldSelector[]): RFeed<Partial<T>>;
    function without<T>(stream: RStream<T>, ...fields: MultiFieldSelector[]): RStream<Partial<T>>;
    function merge<T, U = any>(datum: RDatum<T>, ...objects: any[]): T extends Array<infer T1> ? RDatum<U[]> : RDatum<U>;
    function merge<U = any>(stream: RStream, ...objects: any[]): RStream<U>;
    function skip<T>(datum: RDatum<T>, n: RValue<number>): T extends Array<infer T1> ? RDatum<T> : never;
    function skip<T>(stream: RStream<T>, n: RValue<number>): RStream<T>;
    function limit<T>(datum: RDatum<T>, n: RValue<number>): T extends Array<infer T1> ? RDatum<T> : never;
    function limit<T>(stream: RStream<T>, n: RValue<number>): RStream<T>;
    function slice<T>(datum: RDatum<T>, start: RValue<number>, end?: RValue<number>, options?: {
        leftBound: 'open' | 'closed';
        rightBound: 'open' | 'closed';
    }): T extends Array<infer T1> ? RDatum<T> : never;
    function slice<T>(stream: RStream<T>, start: RValue<number>, end?: RValue<number>, options?: {
        leftBound: 'open' | 'closed';
        rightBound: 'open' | 'closed';
    }): RStream;
    function nth<T>(datum: RDatum<T>, attribute: RValue<number>): T extends Array<infer T1> ? RDatum<T1> : never;
    function nth<T>(stream: RStream<T>, n: RValue<number>): RDatum<T>;
    function nth<T>(datum: RDatum<T>, attribute: RValue<number>): T extends Array<infer T1> ? RDatum<T1> : never;
    function sample<T>(datum: RDatum<T>, n: RValue<number>): T extends Array<infer T1> ? RDatum<T> : never;
    function sample<T>(stream: RStream<T>, n: RValue<number>): RDatum<T[]>;
    function offsetsOf<T, U = T extends Array<infer T1> ? T1 : never>(datum: RDatum<T>, single: RValue<U> | Func<U, boolean>): T extends Array<infer T1> ? RDatum<number[]> : never;
    function offsetsOf<T>(stream: RStream<T>, single: RValue<T> | Func<T, boolean>): RDatum<number[]>;
    function isEmpty<T>(datum: RDatum<T>): T extends Array<infer T1> ? RDatum<boolean> : never;
    function isEmpty<T>(stream: RStream<T>): RDatum<boolean>;
    function coerceTo<T>(stream: RStream<T>, type: 'array'): RDatum<T[]>;
    function coerceTo<T, U = any>(stream: RStream<T>, type: 'object'): RDatum<U>;
    function coerceTo<T, U = any>(datum: RDatum<T>, type: 'object'): T extends Array<infer T1> ? RDatum<U> : never;
    function coerceTo<T>(datum: RDatum<T>, type: 'string'): RDatum<string>;
    function coerceTo<T>(datum: RDatum<T>, type: 'array'): RDatum<any[]>;
    function coerceTo<T>(datum: RDatum<T>, type: 'number'): T extends string ? RDatum<number> : never;
    function coerceTo<T>(datum: RDatum<T>, type: 'binary'): T extends string ? RDatum<Buffer> : never;
    // function do<T, U>(datum: RDatum<T>, ...args: Array<RDatum | ((arg: RDatum<T>, ...args: RDatum[]) => U)>): U extends RStream ? RStream : RDatum;
    // function default<T>(datum: RDatum<T>, value: T): RDatum<T>;
    function append<T, U>(datum: RDatum<T>, value: RValue<U>): T extends U[] ? RDatum<T> : never;
    function prepend<T, U>(datum: RDatum<T>, value: RValue<U>): T extends U[] ? RDatum<T> : never;
    function difference<T, U>(datum: RDatum<T>, value: RValue<U[]>): T extends U[] ? RDatum<T> : never;
    function setInsert<T, U>(datum: RDatum<T>, value: RValue<U>): T extends U[] ? RDatum<T> : never;
    function setUnion<T, U>(datum: RDatum<T>, value: RValue<U[]>): T extends U[] ? RDatum<T> : never;
    function setIntersection<T, U>(datum: RDatum<T>, value: RValue<U[]>): T extends U[] ? RDatum<T> : never;
    function setDifference<T, U>(datum: RDatum<T>, value: RValue<U[]>): T extends U[] ? RDatum<T> : never;
    function insertAt<T, U>(datum: RDatum<T>, index: RValue<number>, value: RValue<U>): T extends U[] ? RDatum<T> : never;
    function changeAt<T, U>(datum: RDatum<T>, index: RValue<number>, value: RValue<U>): T extends U[] ? RDatum<T> : never;
    function spliceAt<T, U>(datum: RDatum<T>, index: RValue<number>, value: RValue<U>): T extends U[] ? RDatum<T> : never;
    function deleteAt<T, U>(datum: RDatum<T>, index: RValue<number>, value: RValue<U>): T extends U[] ? RDatum<T> : never;
    function ungroup(datum: RDatum): RDatum<Array<GroupResults<any, any>>>;
    function match<T>(datum: RDatum<T>, regexp: RValue<string>): T extends string ? RDatum<MatchResults | null> : never;
    function split<T>(datum: RDatum<T>, seperator?: RValue<string>, maxSplits?: RValue<number>): T extends string ? RDatum<string[]> : never;
    function upcase<T>(datum: RDatum<T>): T extends string ? RDatum<string> : never;
    function downcase<T>(datum: RDatum<T>): T extends string ? RDatum<string> : never;
    function add<T>(datum: RDatum<T>, ...str: Array<RValue<string> | RValue<number>>): T extends string | number | Date ? RDatum<T> : never;
    function gt<T>(datum: RDatum<T>, ...value: Array<RValue<string> | RValue<number> | RValue<Date>>): T extends string | number | Date ? RDatum<boolean> : never;
    function ge<T>(datum: RDatum<T>, ...value: Array<RValue<string> | RValue<number> | RValue<Date>>): T extends string | number | Date ? RDatum<boolean> : never;
    function lt<T>(datum: RDatum<T>, ...value: Array<RValue<string> | RValue<number> | RValue<Date>>): T extends string | number | Date ? RDatum<boolean> : never;
    function le<T>(datum: RDatum<T>, ...value: Array<RValue<string> | RValue<number> | RValue<Date>>): T extends string | number | Date ? RDatum<boolean> : never;
    function sub<T>(datum: RDatum<T>, ...num: Array<RValue<number>>): T extends number ? RDatum<number> : T extends Date ? RDatum<Date> : never;
    function sub<T>(datum: RDatum<T>, date: RValue<Date>): T extends Date ? RDatum<number> : never;
    function mul<T>(datum: RDatum<T>, ...num: Array<RValue<number>>): T extends number ? RDatum<number> : never;
    function div<T>(datum: RDatum<T>, ...num: Array<RValue<number>>): T extends number ? RDatum<number> : never;
    function mod<T>(datum: RDatum<T>, ...num: Array<RValue<number>>): T extends number ? RDatum<number> : never;
    function bitAnd<T>(datum: RDatum<T>, ...num: Array<RValue<number>>): T extends number ? RDatum<number> : never;
    function bitOr<T>(datum: RDatum<T>, ...num: Array<RValue<number>>): T extends number ? RDatum<number> : never;
    function bitXor<T>(datum: RDatum<T>, ...num: Array<RValue<number>>): T extends number ? RDatum<number> : never;
    function bitNot<T>(datum: RDatum<T>, ...num: Array<RValue<number>>): T extends number ? RDatum<number> : never;
    function bitSal<T>(datum: RDatum<T>, ...num: Array<RValue<number>>): T extends number ? RDatum<number> : never;
    function bitShl<T>(datum: RDatum<T>, ...num: Array<RValue<number>>): T extends number ? RDatum<number> : never;
    function bitSar<T>(datum: RDatum<T>, ...num: Array<RValue<number>>): T extends number ? RDatum<number> : never;
    function bitSht<T>(datum: RDatum<T>, ...num: Array<RValue<number>>): T extends number ? RDatum<number> : never;
    function round<T>(datum: RDatum<T>): T extends number ? RDatum<number> : never;
    function ceil<T>(datum: RDatum<T>): T extends number ? RDatum<number> : never;
    function floor<T>(datum: RDatum<T>): T extends number ? RDatum<number> : never;
    function branch<T>(datum: RDatum<T>, trueBranch: T, falseBranchOrTest: any, ...branches: any[]): T extends boolean ? RDatum<any> : never;
    function and<T>(datum: RDatum<T>, ...bool: Array<RDatum<boolean>>): T extends boolean ? RDatum<boolean> : never;
    function or<T>(datum: RDatum<T>, ...bool: Array<RDatum<boolean>>): T extends boolean ? RDatum<boolean> : never;
    function not<T>(datum: RDatum<T>): T extends boolean ? RDatum<boolean> : never;
    function inTimezone<T>(datum: RDatum<T>, timezone: string): T extends Date ? RDatum<Date> : never;
    function timezone<T>(datum: RDatum<T>): T extends Date ? RDatum<string> : never;
    function during<T>(datum: RDatum<T>, start: RValue<Date>, end: RValue<Date>, options?: {
        leftBound: 'open' | 'closed';
        rightBound: 'open' | 'closed';
    }): T extends Date ? RDatum<boolean> : never;
    function date<T>(datum: RDatum<T>): T extends Date ? RDatum<Date> : never;
    function timeOfDay<T>(datum: RDatum<T>): T extends Date ? RDatum<number> : never;
    function year<T>(datum: RDatum<T>): T extends Date ? RDatum<number> : never;
    function month<T>(datum: RDatum<T>): T extends Date ? RDatum<number> : never;
    function day<T>(datum: RDatum<T>): T extends Date ? RDatum<number> : never;
    function dayOfWeek<T>(datum: RDatum<T>): T extends Date ? RDatum<number> : never;
    function dayOfYear<T>(datum: RDatum<T>): T extends Date ? RDatum<number> : never;
    function hours<T>(datum: RDatum<T>): T extends Date ? RDatum<number> : never;
    function minutes<T>(datum: RDatum<T>): T extends Date ? RDatum<number> : never;
    function seconds<T>(datum: RDatum<T>): T extends Date ? RDatum<number> : never;
    function toISO8601<T>(datum: RDatum<T>): T extends Date ? RDatum<string> : never;
    function toEpochTime<T>(datum: RDatum<T>): T extends Date ? RDatum<number> : never;
    function distance<T>(datum: RDatum<T>, geo: RValue, options?: {
        geoSystem: string;
        unit: string;
    }): RDatum<number>;
    function toGeojson<T>(datum: RDatum<T>): RDatum;
    function fill<T>(datum: RDatum<T>): RDatum;
    function polygonSub<T>(datum: RDatum<T>, polygon2: RValue): RDatum;
    function toJsonString<T>(datum: RDatum<T>): RDatum<string>;
    function toJSON<T>(datum: RDatum<T>): RDatum<string>;
    function eq<T>(datum: RDatum<T>, ...value: RValue[]): RDatum<boolean>;
    function ne<T>(datum: RDatum<T>, ...value: RValue[]): RDatum<boolean>;
    function keys<T>(datum: RDatum<T>): RDatum<string[]>;
    function values<T>(datum: RDatum<T>): RDatum<Array<T[keyof T]>>;
    function typeOf(query: RQuery): RDatum<string>;
    function info(query: RQuery): RDatum<{
        value?: string;
        db?: {
            id: string;
            name: string;
            type: string;
        };
        doc_count_estimates?: number[];
        id?: string;
        indexes?: string[];
        name?: string;
        primary_key?: string;
        type: string;
    }>;
}

`