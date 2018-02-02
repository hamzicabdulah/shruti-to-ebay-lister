import * as React from 'react';
import { Component, FormEvent, KeyboardEvent } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';
import axios from 'axios';
import { IAccount } from '../success/SuccessPage';

interface IAccountsPageState {
    accounts: IAccount[];
    selectedAccount: string;
    signInUrl: string;
    snackbarOpen: boolean;
}

export class AccountsPage extends Component<any, IAccountsPageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            accounts: undefined,
            selectedAccount: undefined,
            signInUrl: undefined,
            snackbarOpen: false
        };
        this.handleAccountSelectChange = this.handleAccountSelectChange.bind(this);
        this.saveAccountChange = this.saveAccountChange.bind(this);
        this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    }

    render() {
        return (
            <div className='accounts'>
                {
                    this.state.signInUrl && this.state.accounts ?
                        <div>
                            {
                                this.state.accounts && !!this.state.accounts.length &&
                                <div className='existingAccountsDiv'>
                                    <p className='materialParagraph accountsParagraph'>
                                        Below are all your previously added eBay accounts. You are currently using your account with the username {this.state.selectedAccount} to list any items. In order to use a different one, select it from the select box below and save your changes.
                                    </p>
                                    <SelectField
                                        className='selectField'
                                        floatingLabelText='Account Used'
                                        value={this.state.selectedAccount}
                                        onChange={this.handleAccountSelectChange}
                                    >
                                        {this.state.accounts.map((account, index) => {
                                            return <MenuItem
                                                value={account.username}
                                                primaryText={account.username}
                                                key={index}
                                            />;
                                        })}
                                    </SelectField>
                                    <RaisedButton label='Save' primary={true} onClick={this.saveAccountChange} />
                                </div>
                            }
                            <p className='materialParagraph accountsParagraph'>
                                {!this.state.accounts.length && <p className='materialParagraph accountsParagraph'>You haven't added any accounts yet.</p>} Use the link below to add a new eBay account for item listing. By clicking the link you will get redirected to eBay's login page. After logging in and agreeing to the user consent policy, you'll be able to list items using the eBay account you've signed in with.
                            </p>
                            <RaisedButton label='Add New Account' primary={true} href={this.state.signInUrl} />
                        </div> :
                        <LinearProgress mode='indeterminate' />
                }
                <Snackbar
                    open={this.state.snackbarOpen}
                    message='Your changes have been saved'
                    autoHideDuration={4000}
                    onRequestClose={this.handleSnackbarClose}
                />
            </div>
        );
    }

    componentDidMount() {
        this.getSignInUrl();
        this.getAccountsDataFromLocalStorage();
    }

    getAccountsDataFromLocalStorage(): void {
        const accountsKey: string = 'eBayListerAccounts';
        const accounts: IAccount[] = JSON.parse(localStorage.getItem(accountsKey)) || [];
        const selectedAccKey: string = 'selectedAccount';
        const selectedAccount: string = localStorage.getItem(selectedAccKey);
        this.setState({ accounts, selectedAccount });
    }

    getSignInUrl(): void {
        this.setState({ signInUrl: undefined });
        axios.get('/api/sign-in-url')
            .then(response => {
                const { data } = response;
                this.setState({ signInUrl: data });
            })
            .catch(err => alert(err));
    }

    handleAccountSelectChange(event: FormEvent<{}>, index: number, value: string): void {
        this.setState({ 'selectedAccount': value });
    }

    saveAccountChange(): void {
        const selectedAccKey: string = 'selectedAccount';
        localStorage.setItem(selectedAccKey, this.state.selectedAccount);
        this.setState({ snackbarOpen: true });
    }

    handleSnackbarClose(): void {
        this.setState({ snackbarOpen: false });
    };
}