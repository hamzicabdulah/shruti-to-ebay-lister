import * as React from 'react';
import { StatelessComponent } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export const PageLoader: StatelessComponent<any> = () => {
    return (
        <div className='circularProgress'>
            <CircularProgress
                size={120}
                thickness={7}
            />
        </div>
    );
}