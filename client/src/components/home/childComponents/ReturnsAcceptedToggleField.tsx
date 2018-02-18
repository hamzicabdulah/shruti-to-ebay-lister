import * as React from 'react';
import { StatelessComponent } from 'react';
import Toggle from 'material-ui/Toggle';
import { IReturnsAcceptedToggleProps } from '../../../../../interfaces';

export const ReturnsAcceptedToggleField: StatelessComponent<any> = (props: IReturnsAcceptedToggleProps) => {
    return (
        <div className='toggleDiv'>
            <Toggle
                className='toggle'
                name='returnsAccepted'
                label='Returns Accepted'
                defaultToggled={props.returnsAccepted}
                onToggle={props.handleInputChange}
            />
        </div>
    );
}