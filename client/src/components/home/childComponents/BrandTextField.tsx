import * as React from 'react';
import { StatelessComponent } from 'react';
import TextField from 'material-ui/TextField';
import { IBrandTextProps } from '../../../../../interfaces';

export const BrandTextField: StatelessComponent<any> = (props: IBrandTextProps) => {
    return (
        <TextField
            name='brand'
            value={props.brand}
            className='textField'
            floatingLabelText='Brand'
            onChange={props.handleInputChange}
        />
    );
}