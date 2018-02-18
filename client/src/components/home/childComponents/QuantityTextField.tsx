import * as React from 'react';
import { StatelessComponent } from 'react';
import TextField from 'material-ui/TextField';
import { IQuantityTextProps } from '../../../../../interfaces';

export const QuantityTextField: StatelessComponent<any> = (props: IQuantityTextProps) => {
    return (
        <TextField
            name='quantity'
            value={props.quantity}
            type='number'
            className='textField'
            floatingLabelText='Item Quantity'
            onChange={props.handleInputChange}
        />
    );
}