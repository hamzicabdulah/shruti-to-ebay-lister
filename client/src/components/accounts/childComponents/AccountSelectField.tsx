import * as React from 'react';
import { StatelessComponent } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { IAccountSelectProps, IAccount } from '../../../../../interfaces';

export const AccountSelectField: StatelessComponent<any> = (props: IAccountSelectProps) => {
    return (
        <SelectField
            className='selectField'
            floatingLabelText='Account Used'
            value={props.selectedAccount}
            onChange={props.handleSelectChange}
        >
            {props.accounts.map((account, index) => {
                return <MenuItem
                    value={account.username}
                    primaryText={account.username}
                    key={index}
                />;
            })}
        </SelectField>
    );
}