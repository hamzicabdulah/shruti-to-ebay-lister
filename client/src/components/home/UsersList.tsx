import * as React from 'react';
import { StatelessComponent } from 'react';
import { tableBorder } from '../../styles/usersList';
import { IUsersListProps } from '../../interfaces/UsersList';
import { IUser } from '../../interfaces/general';

export const UsersList: StatelessComponent<IUsersListProps> = ({ users }) => {
    return (
        <table style={tableBorder}>
            <thead>
                <tr>
                    <th style={tableBorder}>Name</th>
                    <th style={tableBorder}>Github Username</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user: IUser, index: number) => {
                        return (
                            <tr key={index}>
                                <td style={tableBorder}>{user.name}</td>
                                <td style={tableBorder}>{user.github}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
}