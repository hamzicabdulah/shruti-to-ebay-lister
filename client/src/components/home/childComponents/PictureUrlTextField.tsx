import * as React from 'react';
import { StatelessComponent } from 'react';
import TextField from 'material-ui/TextField';
import { IPictureUrlTextProps } from '../../../../../interfaces';

export const PictureUrlTextField: StatelessComponent<any> = (props: IPictureUrlTextProps) => {
    return (
        <TextField
            name='currentPictureURL'
            value={props.currentPictureURL}
            className='textField'
            floatingLabelText='Picture URLs'
            hintText='Press Enter to add picture URL'
            onChange={props.handleInputChange}
            onKeyPress={props.addPictureURL}
        />
    );
}