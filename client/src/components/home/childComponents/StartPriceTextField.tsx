import * as React from 'react';
import { StatelessComponent } from 'react';
import TextField from 'material-ui/TextField';
import { IStartPriceTextProps } from '../../../../../interfaces';

export const StartPriceTextField: StatelessComponent<any> = (props: IStartPriceTextProps) => {
    return (
        <TextField
            name='startPrice'
            value={props.startPrice}
            type='number'
            className='textField'
            floatingLabelText='Price'
            onChange={props.handleInputChange}
        />
    );
}