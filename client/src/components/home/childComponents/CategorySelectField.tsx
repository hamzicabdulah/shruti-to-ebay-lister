import * as React from 'react';
import { StatelessComponent } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import LinearProgress from 'material-ui/LinearProgress';
import { ICategorySelectProps } from '../../../../../interfaces';

export const CategorySelectField: StatelessComponent<any> = (props: ICategorySelectProps) => {
    return !!props.categories ?
        <SelectField
            className='selectField'
            floatingLabelText='Category'
            value={props.categoryID}
            onChange={props.handleSelectChange}
        >
            {props.categories.map(category => {
                return <MenuItem
                    value={category.ID}
                    primaryText={category.name}
                    key={category.ID}
                />;
            })}
        </SelectField> :
        <div>
            <p className='materialParagraph'>Updating categories...</p>
            <LinearProgress mode="indeterminate" />
        </div>
}