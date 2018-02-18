import * as React from 'react';
import { StatelessComponent } from 'react';
import TextField from 'material-ui/TextField';
import { IShippingServiceCostTextProps } from '../../../../../interfaces';

export const ShippingServiceCostTextField: StatelessComponent<any> = (props: IShippingServiceCostTextProps) => {
    return (
        <TextField
            name='shippingServiceCost'
            value={props.shippingServiceCost}
            type='number'
            className='textField'
            floatingLabelText={`Shipping Service Cost (${props.currency})`}
            onChange={props.handleInputChange}
        />
    );
}