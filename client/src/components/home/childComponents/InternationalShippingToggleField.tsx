import * as React from 'react';
import { StatelessComponent } from 'react';
import Toggle from 'material-ui/Toggle';
import { IInternationalShippingToggleProps } from '../../../../../interfaces';

export const InternationalShippingToggleField: StatelessComponent<any> = (props: IInternationalShippingToggleProps) => {
    return (
        <div className='toggleDiv'>
            <Toggle
                className='toggle'
                name='supportsInternationalShipping'
                label='International Shipping Support'
                defaultToggled={props.supportsInternationalShipping}
                onToggle={props.handleInputChange}
            />
        </div>
    );
}