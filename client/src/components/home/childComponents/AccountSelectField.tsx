import * as React from 'react';
import { StatelessComponent } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { IAccountSelectProps, IAccount } from '../../../../../interfaces';

export const AccountSelectField: StatelessComponent<any> = (props: IAccountSelectProps) => {
    return (
        <SelectField
            className='selectField'
            floatingLabelText='eBay Account to Use'
            value={props.token}
            onChange={props.handleSelectChange}
        >
            {props.accounts.map((account: IAccount, index: number) => {
                return <MenuItem
                    value={account.token}
                    primaryText={account.username}
                    key={index}
                />;
            })}
        </SelectField>
    );
}