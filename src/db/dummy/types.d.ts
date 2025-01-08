export type IDataService = typeof import('.');

export type UUID = string;

/** Dictionary */

export interface IWord {
    id: UUID;
    classId: UUID;
    translations?: ITranslation[];
}

export interface ITranslation {
    id: UUID;
    wordId: UUID;
    flectionId: UUID;
    text_de: string;
    text_sv: string;
}

export interface IWordClass {
    id: UUID;
    name_de: string;
    flections?: IFlection[];
}

export interface IFlection {
    id: UUID;
    classId: UUID;
    pos: number;
    name_de: string;
}

/** Training */

export interface IUser {
    id: UUID;
    login: string;
    name: string;
    currStep: number;
    learnPath?: Array<{
        step: number;
        wordId: string;
        flectionId: string;
        result: number;
    }>;
    currentSession?: {
        startedAt: number;
    };
    currentLessons?: ILesson[];
}

export interface ILesson {
    wordId: UUID;
    flectionId: UUID;
    result?: TResult;
    doneAt?: number;
}

export type TResult = 'correct' | 'wrong' | 'partly-correct';

export interface IActiveWord {
    id: UUID;
    userId: UUID;
    wordId: UUID;
    learnProgress?: Array<{
        flectionId: UUID;
        currGroup: number;
        changedAt: string;
    }>;
    events?: IActiveWordEvent[];
    nextLessons?: INextLesson[];
}

export interface IActiveWordEvent {
    type: TActiveWordEventType;
    timestamp: number;
    flectionId?: UUID;
    result?: TResult;
}

export type TActiveWordEventType =
    | 'add' // | 'update' | 'remove' | 'reset'
    | 'flection-result' // | 'flection-result-change'
    | 'flection-result-revoke'; // | 'flection-reset';

export interface INextLesson {
    flectionId: UUID;
    currGroup: number;
    earliestAt: number;
}
