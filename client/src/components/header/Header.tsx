import * as React from 'react';
import { StatelessComponent } from 'react';
import { Link } from 'react-router-dom';

export const Header: StatelessComponent = () => {
    return (
        <ul>
            <li role='presentation'><Link to='/'>Home</Link></li>
            <li role='presentation'><Link to='/about'>About</Link></li>
        </ul>
    );
}