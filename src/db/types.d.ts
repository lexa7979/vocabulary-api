// Taken from https://stackoverflow.com/questions/49580725
type Impossible<K extends keyof any> = Record<K, never>;
type NoExtraProperties<T, U extends T = T> = U & Impossible<Exclude<keyof U, keyof T>>;

export type IDataService = NoExtraProperties<{
    init: () => Promise<void>;

    getWord: (wordId: UUID) => Promise<IWord>;
    getWordWithTranslations: (wordId: UUID) => Promise<IWord>;
    listAllWords: (first?: number, offset?: number) => Promise<IWord[]>;
    getTranslation: (translationId: UUID) => Promise<ITranslation>;
    listAllTranslationsOfWord: (wordId: UUID, first?: number, offset?: number) => Promise<ITranslation[]>;

    insertWord: (wordItem: IWord) => Promise<void>;
    updateWord: (wordItem: IWord) => Promise<void>;
    insertWordWithTranslations: (wordItem: IWord) => Promise<void>;
    updateWordWithTranslations: (wordItem: IWord) => Promise<void>;
    insertTranslation: (translationItem: ITranslation) => Promise<void>;
    updateTranslation: (translationItem: ITranslation) => Promise<void>;

    getWordClass: (wordClassId: UUID) => Promise<IWordClass>;
    getWordClassWithFlections: (wordClassId: UUID) => Promise<IWordClass>;
    listAllWordClasses: (first?: number, offset?: number) => Promise<IWordClass[]>;
    getFlection: (flectionId: UUID) => Promise<IFlection>;
    listAllFlectionsOfWordClass: (wordClassId: UUID, first?: number, offset?: number) => Promise<IFlection[]>;

    insertWordClass: (wordClassItem: IWordClass) => Promise<void>;
    updateWordClass: (wordClassItem: IWordClass) => Promise<void>;
    insertWordClassWithFlections: (wordClassItem: IWordClass) => Promise<void>;
    updateWordClassWithFlections: (wordClassItem: IWordClass) => Promise<void>;
    insertFlection: (flectionItem: IFlection) => Promise<void>;
    updateFlection: (flectionItem: IFlection) => Promise<void>;

    getUser: (userId: UUID) => Promise<IUser>;
    listAllUsers: (first?: number, offset?: number) => Promise<IUser[]>;
    getActiveWord: (activeWordId: UUID) => Promise<IActiveWord>;
    listAllActiveWordsOfUser: (userId: UUID, first?: number, offset?: number) => Promise<IActiveWord[]>;

    insertUser: (userItem: IUser) => Promise<void>;
    updateUser: (userItem: IUser) => Promise<void>;
    insertActiveWord: (activeWordItem: IActiveWord) => Promise<void>;
    updateActiveWord: (activeWordItem: IActiveWord) => Promise<void>;
}>;

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
