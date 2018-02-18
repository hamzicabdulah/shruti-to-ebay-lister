import * as React from 'react';
import { StatelessComponent } from 'react';
import Chip from 'material-ui/Chip';
import { IKeywordsChipsProps } from '../../../../../interfaces';

export const KeywordsChips: StatelessComponent<any> = (props: IKeywordsChipsProps) => {
    return (
        <div className='chips'>
            {props.keywords.map((keyword, index) => {
                return (
                    <Chip
                        className='chip'
                        onRequestDelete={
                            props.categories ?
                                () => props.removeKeyword(index) :
                                null
                        }
                        key={index}
                    >
                        {keyword}
                    </Chip>
                );
            })}
        </div>
    );
}