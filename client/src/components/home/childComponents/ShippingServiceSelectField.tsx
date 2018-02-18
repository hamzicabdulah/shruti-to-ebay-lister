import * as React from 'react';
import { StatelessComponent } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import LinearProgress from 'material-ui/LinearProgress';
import { IShippingServiceSelectProps } from '../../../../../interfaces';

export const ShippingServiceSelectField: StatelessComponent<any> = (props: IShippingServiceSelectProps) => {
    return props.shippingServicesObjects ?
        <SelectField
            className='selectField'
            floatingLabelText={`${props.shippingType} Shipping Service`}
            value={props.shippingService}
            onChange={props.handleSelectChange}
        >
            {props.shippingServicesObjects.filter(service => {
                return props.shippingType === 'International' ? service.isInternational : !service.isInternational
            }).map((service, index) => {
                return <MenuItem
                    value={service.name}
                    primaryText={service.name}
                    key={index}
                />;
            })}
        </SelectField> :
        <div>
            <p className='materialParagraph'>Updating shipping services...</p>
            <LinearProgress mode="indeterminate" />
        </div>
}