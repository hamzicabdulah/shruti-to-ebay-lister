import * as React from 'react';
import { StatelessComponent } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { IShippingCostPaidBySelectProps } from '../../../../../interfaces';

export const ShippingCostPaidBySelectField: StatelessComponent<any> = (props: IShippingCostPaidBySelectProps) => {
    return (
        <SelectField
            className='selectField'
            floatingLabelText='Shipping Cost Paid By'
            value={props.shippingCostPaidBy}
            onChange={props.handleSelectChange}
        >
            <MenuItem value='Buyer' primaryText='Buyer' />
            <MenuItem value='Seller' primaryText='Seller' />
        </SelectField>
    );
}