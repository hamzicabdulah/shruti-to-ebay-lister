import * as React from 'react';
import { StatelessComponent } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { IShippingTypeSelectProps } from '../../../../../interfaces';

export const ShippingTypeSelectField: StatelessComponent<any> = (props: IShippingTypeSelectProps) => {
    return (
        <SelectField
            className='selectField'
            floatingLabelText='Shipping Type'
            value={props.shippingType}
            onChange={props.handleSelectChange}
        >
            {props.shippingServicesObjects && props.shippingServicesObjects.find(service => service.name === props.domesticShippingService)
                .types.map(type => {
                    return <MenuItem
                        value={type}
                        primaryText={type}
                        key={type}
                    />;
                })}
        </SelectField>
    );
}