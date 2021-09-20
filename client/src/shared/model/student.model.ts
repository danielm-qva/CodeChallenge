export interface IStudent {
    _id?: string;
    first_name: string;
    last_name: string;
    email: string;
    age: number;
    grade: string;
}

export const defaultValue: Readonly<IStudent> = {
    _id: '00000000-0000-0000-0000-000000000000',
    first_name: '',
    last_name: '',
    email: '',
    age: 0,
    grade: '',
};
