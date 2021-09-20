import { AxiosPromise } from 'axios';

/**
 * Appends REQUEST async action type
 */

export const REQUEST = (actionType: string) => `${actionType}_PENDING`;

/**
 * Appends SUCCESS async action type
 */

export const SUCCESS = (actionType: string) => `${actionType}_FULFILLED`;

/**
 * Appends FAILURE async action type
 */

export const FAILURE = (actionType: string) => `${actionType}_REJECTED`;

export interface IPayload<T> {
    type: string;
    payload: AxiosPromise<T>;
    meta?: any;
}
export declare type IPayloadResult<T> = ((dispatch: any, getState?: any) => IPayload<T> | Promise<IPayload<T>>);
export declare type ICrudGetAction<T> = (id: string | number) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export declare type ICrudGetAllAction<T> = (page?: number) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export declare type ICrudPutAction<T> = (data?: T) => IPayload<T> | IPayloadResult<T>;
export declare type ICrudDeleteAction<T> = (id?: string | number) => IPayload<T> | IPayloadResult<T>;