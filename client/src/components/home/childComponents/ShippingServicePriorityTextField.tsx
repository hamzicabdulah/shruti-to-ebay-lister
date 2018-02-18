import * as React from 'react';
import { StatelessComponent } from 'react';
import TextField from 'material-ui/TextField';
import { IShippingServicePriorityTextProps } from '../../../../../interfaces';

export const ShippingServicePriorityTextField: StatelessComponent<any> = (props: IShippingServicePriorityTextProps) => {
    return (
        <TextField
            name='shippingServicePriority'
            value={props.shippingServicePriority}
            type='number'
            className='textField'
            floatingLabelText='Shipping Service Priority'
            onChange={props.handleInputChange}
        />
    );
}