import * as React from 'react';
import { StatelessComponent } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { ISiteSelectProps } from '../../../../../interfaces';

export const SiteSelectField: StatelessComponent<any> = (props: ISiteSelectProps) => {
    return (
        <SelectField
            className='selectField'
            floatingLabelText='Site'
            value={props.siteID}
            onChange={props.handleSelectChange}
            disabled={!props.categories}
        >
            {props.sites.map(site => {
                return <MenuItem
                    value={site.ID}
                    primaryText={site.name}
                    key={site.ID}
                />;
            })}
        </SelectField>
    );
}