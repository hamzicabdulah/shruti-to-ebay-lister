import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { HomePage } from './home/HomePage';
import { SuccessPage } from './success/SuccessPage';
import { AccountsPage } from './accounts/accounts';

export class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' render={() => (
                    (localStorage.getItem('selectedAccount') && localStorage.getItem('eBayListerAccounts')) ?
                        (<HomePage />) :
                        (<Redirect to='/accounts' />)
                )} />
                <Route exact path='/accounts' component={AccountsPage} />
                <Route exact path='/success' component={SuccessPage} />
            </Switch>
        );
    }
}