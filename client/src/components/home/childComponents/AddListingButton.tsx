import * as React from 'react';
import { StatelessComponent } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { IAddListingButtonProps } from '../../../../../interfaces';

export const AddListingButton: StatelessComponent<any> = (props: IAddListingButtonProps) => {
    return (
        <RaisedButton
            className='submitButton'
            label='List Item'
            primary={true}
            onClick={props.submitItemListing}
            disabled={props.disabled}
        />
    );
}