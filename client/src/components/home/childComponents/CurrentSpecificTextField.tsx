import * as React from 'react';
import { StatelessComponent } from 'react';
import TextField from 'material-ui/TextField';
import { ICurrentSpecificTextProps } from '../../../../../interfaces';

export const CurrentSpecificTextField: StatelessComponent<any> = (props: ICurrentSpecificTextProps) => {
    return (
        <TextField
            name='currentSpecific'
            value={props.currentSpecific}
            className='textField'
            floatingLabelText='Item specifics (Use this field if asked to include specific fields for an item)'
            hintText='Press Enter to add. Separate name and value with colon and whitespace. Eg: Colour: red'
            onChange={props.handleInputChange}
            onKeyPress={props.addSpecific}
        />
    );
}