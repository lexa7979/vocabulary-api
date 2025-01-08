import * as DBTypes from '../db/types';

export interface IGraphQLContext {
    db: DBTypes.IDataService;
}

export interface IArgsWithUUID {
    id?: string;
}

export interface IArgsWithFirstAndOffset {
    first?: number;
    offset?: number;
}
