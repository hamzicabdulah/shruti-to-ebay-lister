import * as React from 'react';
import { StatelessComponent } from 'react';
import TextField from 'material-ui/TextField';
import { IDescriptionTextProps } from '../../../../../interfaces';

export const DescriptionTextField: StatelessComponent<any> = (props: IDescriptionTextProps) => {
    return (
        <TextField
            name='description'
            value={props.description}
            className='textField'
            floatingLabelText='Description (HTML code supported)'
            multiLine={true}
            rowsMax={20}
            onChange={props.handleInputChange}
            disabled={typeof props.description == 'undefined'}
        />
    );
}