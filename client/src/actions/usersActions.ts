import { Dispatch, ActionCreatorsMapObject, AnyAction } from 'redux';
import axios from 'axios';
import { AxiosResponse } from 'axios';
import { GET_ALL_USERS, ADD_USER } from './actionTypes';
import { IUser } from '../interfaces/general';

export const usersActions: ActionCreatorsMapObject = {
    getAllUsersSuccess(users: IUser[]): AnyAction {
        return { users, type: GET_ALL_USERS };
    },

    getAllUsers() {
        return (dispatch: Dispatch<any>) => {
            return axios.get('/api/getAllUsers')
                .then((response: AxiosResponse) => {
                    const users: IUser[] = response.data;
                    dispatch(usersActions.getAllUsersSuccess(users));
                })
                .catch((error: Error) => {
                   // alert(error);
                });
        };
    },

    addUserSuccess(user: IUser): AnyAction {
        return { user, type: ADD_USER };
    },

    addUser(user: IUser) {
        return (dispatch: Dispatch<any>) => {
            return axios.post('/api/addUser', user)
                .then((response: AxiosResponse) => {
                    const user: IUser = response.data;
                    dispatch(usersActions.addUserSuccess(user));
                })
                .catch((error: Error) => {
                    alert(error);
                });
        };
    }
}