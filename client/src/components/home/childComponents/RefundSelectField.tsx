import * as React from 'react';
import { StatelessComponent } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import LinearProgress from 'material-ui/LinearProgress';
import { IRefundSelectProps } from '../../../../../interfaces';

export const RefundSelectField: StatelessComponent<any> = (props: IRefundSelectProps) => {
    return !!props.refundOptions ?
        <SelectField
            className='selectField'
            floatingLabelText='Refund Option'
            value={props.refund}
            onChange={props.handleSelectChange}
        >
            {props.refundOptions.map((refundOption, index) => {
                return <MenuItem
                    value={refundOption.name}
                    primaryText={refundOption.description}
                    key={index}
                />;
            })}
        </SelectField> :
        <div>
            <p className='materialParagraph'>Updating refund options...</p>
            <LinearProgress mode="indeterminate" />
        </div>
}