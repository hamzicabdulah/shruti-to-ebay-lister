import * as React from 'react';
import { StatelessComponent } from 'react';
import Chip from 'material-ui/Chip';
import { IItemSpecificsChipsProps } from '../../../../../interfaces';

export const ItemSpecificsChips: StatelessComponent<any> = (props: IItemSpecificsChipsProps) => {
    return (
        <div className='chips'>
            {props.itemSpecifics.map((specific, index) => {
                return <Chip
                    className='chip'
                    onRequestDelete={() => props.removeSpecific(index)}
                    key={index}
                >
                    {specific}
                </Chip>;
            })}
        </div>
    );
}