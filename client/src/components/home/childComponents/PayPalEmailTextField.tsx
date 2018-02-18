import * as React from 'react';
import { StatelessComponent } from 'react';
import TextField from 'material-ui/TextField';
import { IPayPalEmailTextProps } from '../../../../../interfaces';

export const PayPalEmailTextField: StatelessComponent<any> = (props: IPayPalEmailTextProps) => {
    return (
        <TextField
            name='paypalEmail'
            value={props.paypalEmail}
            type='email'
            className='textField'
            floatingLabelText='PayPal Email Address'
            onChange={props.handleInputChange}
        />
    );
}