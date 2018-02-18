import * as React from 'react';
import { StatelessComponent } from 'react';
import TextField from 'material-ui/TextField';
import { ITitleTextProps } from '../../../../../interfaces';

export const TitleTextField: StatelessComponent<any> = (props: ITitleTextProps) => {
    return (
        <TextField
            name='title'
            value={props.title}
            className='textField'
            floatingLabelText={`Title (${props.title.length}/80)`}
            errorText={
                props.title.length > 80 ?
                    'Item title cannot contain more than 80 characters' :
                    null
            }
            onChange={props.handleInputChange}
        />
    );
}