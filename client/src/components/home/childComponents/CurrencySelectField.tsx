import * as React from 'react';
import { StatelessComponent } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { ICurrencySelectProps } from '../../../../../interfaces';

export const CurrencySelectField: StatelessComponent<any> = (props: ICurrencySelectProps) => {
    return (
        <SelectField
            className='selectField'
            floatingLabelText='Currency'
            value={props.currency}
            onChange={props.handleSelectChange}
        >
            {props.currencies.map((currency, index) => {
                return <MenuItem
                    value={currency}
                    primaryText={currency}
                    key={index}
                />;
            })}
        </SelectField>
    );
}