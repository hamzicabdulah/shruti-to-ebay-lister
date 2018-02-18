import * as React from 'react';
import { StatelessComponent } from 'react';
import TextField from 'material-ui/TextField';
import { IReturnPolicyDescriptionTextProps } from '../../../../../interfaces';

export const ReturnPolicyDescriptionTextField: StatelessComponent<any> = (props: IReturnPolicyDescriptionTextProps) => {
    return (
        <TextField
            name='returnPolicyDescription'
            value={props.returnPolicyDescription}
            className='textField'
            floatingLabelText='Return Policy Description'
            multiLine={true}
            onChange={props.handleInputChange}
        />
    );
}