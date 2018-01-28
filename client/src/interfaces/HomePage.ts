import { ActionCreatorsMapObject } from 'redux';
import { IUser } from './general';

export interface IHomePageProps {
  users: IUser[];
  actions: ActionCreatorsMapObject;
}

export interface IHomePageState {
  user: IUser;
  loading: boolean;
}

export interface IStateProps {
  users: IUser[];
}

export interface IDispatchProps {
  actions: ActionCreatorsMapObject;
}