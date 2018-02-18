import * as React from 'react';
import { StatelessComponent } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { IListingTypeSelectProps } from '../../../../../interfaces';
import { eBayConstantData } from '../../../../../eBayConstantData';
const listingTypes: any = eBayConstantData.listingTypes;

export const ListingTypeSelectField: StatelessComponent<any> = (props: IListingTypeSelectProps) => {
    return (
        <SelectField
            className='selectField'
            floatingLabelText='Listing Type'
            value={props.listingType}
            onChange={props.handleSelectChange}
        >
            {Object.keys(listingTypes).map((listingType, index) => {
                return <MenuItem
                    value={listingTypes[listingType]}
                    primaryText={listingTypes[listingType]}
                    key={index}
                />;
            })}
        </SelectField>
    );
}