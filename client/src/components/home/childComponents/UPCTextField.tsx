import * as React from 'react';
import { StatelessComponent } from 'react';
import TextField from 'material-ui/TextField';
import { IUPCTextProps } from '../../../../../interfaces';

export const UPCTextField: StatelessComponent<any> = (props: IUPCTextProps) => {
    return (
        <TextField
            name='UPC'
            value={props.UPC}
            className='textField'
            floatingLabelText='UPC'
            onChange={props.handleInputChange}
        />
    );
}