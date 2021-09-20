export interface ILinks {
    next?: number;
    last?: number;
    prev?: number;
    first?: number;
    current?: number;
}

export interface IError {
    msg: string;
    status: number
}