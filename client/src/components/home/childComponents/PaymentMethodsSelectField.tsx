import * as React from 'react';
import { StatelessComponent } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import LinearProgress from 'material-ui/LinearProgress';
import { IPaymentMethodsSelectProps } from '../../../../../interfaces';

export const PaymentMethodsSelectField: StatelessComponent<any> = (props: IPaymentMethodsSelectProps) => {
    return !!props.paymentMethods ?
            <SelectField
                className='selectField'
                floatingLabelText='Payment Method'
                multiple={true}
                value={props.selectedPaymentMethods}
                onChange={props.handleSelectChange}
            >
                {props.paymentMethods.map(paymentMethod => {
                    return <MenuItem
                        value={paymentMethod}
                        primaryText={paymentMethod}
                        key={paymentMethod}
                    />;
                })}
            </SelectField> :
            <div>
                <p className='materialParagraph'>Updating payment methods...</p>
                <LinearProgress mode="indeterminate" />
            </div>
}