import * as React from 'react';
import { StatelessComponent } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import LinearProgress from 'material-ui/LinearProgress';
import { IDispatchTimeMaxSelectProps } from '../../../../../interfaces';

export const DispatchTimeMaxTextField: StatelessComponent<any> = (props: IDispatchTimeMaxSelectProps) => {
    return props.dispatchTimeMaxOptions ?
        <SelectField
            value={props.dispatchTimeMax}
            className='selectField'
            floatingLabelText='Maximum Dispatch Time'
            onChange={props.handleSelectChange}
        >
            {props.dispatchTimeMaxOptions.map((dispatchTimeMaxOption, index) => {
                return <MenuItem
                    value={dispatchTimeMaxOption.value}
                    primaryText={dispatchTimeMaxOption.description}
                    key={index}
                />;
            })}
        </SelectField> :
        <div>
            <p className='materialParagraph'>Updating dispatch time max options...</p>
            <LinearProgress mode="indeterminate" />
        </div>
}