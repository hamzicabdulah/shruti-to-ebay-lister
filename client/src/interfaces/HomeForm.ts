import { FormEvent } from 'react';
import { IUser } from './general';

export interface IHomeFormProps {
    onInputChange: (event: FormEvent<HTMLInputElement>) => void;
    onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
    loading: boolean;
    user: IUser;
}