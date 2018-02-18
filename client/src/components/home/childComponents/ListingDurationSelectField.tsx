import * as React from 'react';
import { StatelessComponent } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { IListingDurationSelectProps } from '../../../../../interfaces';
import { eBayConstantData } from '../../../../../eBayConstantData';
const { listingDurations, listingTypes } = eBayConstantData;
const commonListingDurations: any = listingDurations.common;
const fixedListingDurations: any = listingDurations.fixed;

export const ListingDurationSelectField: StatelessComponent<any> = (props: IListingDurationSelectProps) => {
    return (
        <SelectField
            className='selectField'
            floatingLabelText='Listing Duration'
            value={props.listingDuration}
            onChange={props.handleSelectChange}
        >
            {Object.keys(commonListingDurations)
                .map((listingDuration, index) => {
                    return <MenuItem
                        value={listingDuration}
                        primaryText={commonListingDurations[listingDuration]}
                        key={listingDuration + index}
                    />;
                })}
            {
                props.listingType === listingTypes.FIXED_PRICE_ITEM &&
                Object.keys(fixedListingDurations)
                    .map((listingDuration, index) => {
                        return <MenuItem
                            value={listingDuration}
                            primaryText={fixedListingDurations[listingDuration]}
                            key={listingDuration + index}
                        />;
                    })
            }
        </SelectField>
    );
}