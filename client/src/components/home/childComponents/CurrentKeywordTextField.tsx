import * as React from 'react';
import { StatelessComponent } from 'react';
import TextField from 'material-ui/TextField';
import { ICurrentKeywordTextProps } from '../../../../../interfaces';

export const CurrentKeywordTextField: StatelessComponent<any> = (props: ICurrentKeywordTextProps) => {
    return (
        <TextField
            name='currentKeyword'
            value={props.keyword}
            className='textField'
            floatingLabelText='Category Keywords (Only used to load categories, not included in item listing)'
            hintText='Press Enter to add keyword'
            onChange={props.handleInputChange}
            onKeyPress={props.addKeyword}
            disabled={!props.categories}
        />
    );
}