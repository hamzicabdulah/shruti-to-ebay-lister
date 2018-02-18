import * as React from 'react';
import { StatelessComponent } from 'react';
import TextField from 'material-ui/TextField';
import { IPostalCodeTextProps } from '../../../../../interfaces';

export const PostalCodeTextField: StatelessComponent<any> = (props: IPostalCodeTextProps) => {
    return (
        <TextField
            name='postalCode'
            value={props.postalCode}
            className='textField'
            floatingLabelText='Postal Code'
            onChange={props.handleInputChange}
        />
    );
}