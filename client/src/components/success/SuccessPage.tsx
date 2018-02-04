import * as React from 'react';
import { Component, FormEvent, KeyboardEvent } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import axios from 'axios';

interface ISuccessPageState {
    token: string;
    username: string;
}

export interface IAccount {
    username: string;
    token: string;
}

export class SuccessPage extends Component<any, ISuccessPageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            token: undefined,
            username: ''
        };
    }

    render() {
        return (
            <div className='success'>
                {
                    this.state.token ?
                        <div>
                            <p className='materialParagraph successParagraph'>
                                You have successfully added your eBay account with the username {this.state.username}. This account will be used for your future item listings. To choose a different account for your item listings, please use the link below.
                            </p>
                            <RaisedButton label='Manage Accounts' primary={true} href='/accounts' />
                        </div> :
                        <LinearProgress mode='indeterminate' />
                }
            </div>
        );
    }

    componentDidMount() {
        this.getAccountCredentials()
            .then(account => this.saveCredentialsToLocalStorage(account))
            .catch(err => this.alertError(err));
    }

    alertError(err: string | string[]): void {
        const errorToDisplay: string = typeof err === 'string' ? err : err.join('\n');
        alert(errorToDisplay);
    }

    getAccountCredentials(): Promise<IAccount> {
        return new Promise((resolve, reject) => {
            const params: URLSearchParams = this.getQueryParams();
            const username: string = params.get('username');
            const sessionID: string = params.get('sessionID');
            if (!username || !sessionID) return this.props.history.push('/accounts');
            this.setState({ username });
            this.getAuthToken(sessionID)
                .then(token => {
                    const account: IAccount = { username, token };
                    resolve(account);
                })
                .catch(err => reject(err));
        });
    }

    getQueryParams(): URLSearchParams {
        const paramsStr: string = this.props.location.search;
        const params = new URLSearchParams(paramsStr);
        return params;
    }

    getAuthToken(sessionID: string): Promise<string> {
        this.setState({ token: undefined });
        return new Promise((resolve, reject) => {
            axios.post('/api/auth-token', { sessionID })
                .then(response => {
                    const { token } = response.data;
                    this.setState({ token }, () => resolve(token));
                })
                .catch(err => resolve(err));
        });
    }

    saveCredentialsToLocalStorage({ username, token }: IAccount): void {
        const accountsKey: string = 'eBayListerAccounts';
        const existingAccounts: IAccount[] = JSON.parse(localStorage.getItem(accountsKey));
        const newAccount: IAccount = { username, token };
        const updatedAccounts: IAccount[] = existingAccounts ? [...existingAccounts] : [];
        const newAccountAlreadyAdded: IAccount = updatedAccounts.find(account => account.username === newAccount.username);
        if (!newAccountAlreadyAdded) updatedAccounts.push(newAccount);
        const updatedAccountsJSONStr: string = JSON.stringify(updatedAccounts);
        if (!existingAccounts) localStorage.setItem(accountsKey, updatedAccountsJSONStr);
        else localStorage.setItem(accountsKey, updatedAccountsJSONStr);
        const selectedAccKey: string = 'selectedAccount';
        localStorage.setItem(selectedAccKey, username);
    }
}