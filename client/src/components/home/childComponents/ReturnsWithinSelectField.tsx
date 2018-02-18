import * as React from 'react';
import { StatelessComponent } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import LinearProgress from 'material-ui/LinearProgress';
import { IReturnsWithinSelectProps } from '../../../../../interfaces';

export const ReturnsWithinSelectField: StatelessComponent<any> = (props: IReturnsWithinSelectProps) => {
    return !!props.returnsWithinOptions ?
        <SelectField
            className='selectField'
            floatingLabelText='Returns Within'
            value={props.returnsWithin}
            onChange={props.handleSelectChange}
        >
            {props.returnsWithinOptions.map((returnsWithinOption, index) => {
                return <MenuItem
                    value={returnsWithinOption.name}
                    primaryText={returnsWithinOption.description}
                    key={index}
                />;
            })}
        </SelectField> :
        <div>
            <p className='materialParagraph'>Updating returns within options...</p>
            <LinearProgress mode="indeterminate" />
        </div>
}