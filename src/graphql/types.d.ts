import { IDataService } from '../dummy-db/types';

export interface IGraphQLContext {
    db: IDataService;
}

export interface IArgsWithUUID {
    id?: string;
}

export interface IArgsWithFirstAndOffset {
    first?: number;
    offset?: number;
}
