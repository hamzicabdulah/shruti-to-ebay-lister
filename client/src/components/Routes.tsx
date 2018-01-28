import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { HomePageConnected } from './home/HomePage';
import { AboutPage } from './about/AboutPage';

export class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={HomePageConnected} />
                <Route path='/about' component={AboutPage} />
            </Switch>
        );
    }
}