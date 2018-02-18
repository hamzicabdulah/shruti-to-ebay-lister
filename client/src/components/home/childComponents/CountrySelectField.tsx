import * as React from 'react';
import { StatelessComponent } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import LinearProgress from 'material-ui/LinearProgress';
import { ICountrySelectProps } from '../../../../../interfaces';

export const CountrySelectField: StatelessComponent<any> = (props: ICountrySelectProps) => {
    return (
        <SelectField
            className='selectField'
            floatingLabelText='Country'
            value={props.country}
            onChange={props.handleSelectChange}
        >
            {props.countries.map((country, index) => {
                return <MenuItem
                    value={country.code}
                    primaryText={country.name}
                    key={index}
                />;
            })}
        </SelectField>
    );
}