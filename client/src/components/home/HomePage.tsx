import * as React from 'react';
import { Component, FormEvent, KeyboardEvent } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import Chip from 'material-ui/Chip';
import Toggle from 'material-ui/Toggle';
import LinearProgress from 'material-ui/LinearProgress';
import axios from 'axios';
import { eBayConstantData } from '../../../../eBayConstantData';
import { ISite, ICategory, ICountry } from '../../../../interfaces';

interface ISelected {
    siteID: string;
    title: string;
    description: string;
    keywords: string[];
    currentKeyword: string;
    categoryID: string;
    startPrice: number;
    country: string;
    currency: string;
    dispatchTimeMax: number;
    listingDuration: number;
    listingType: string;
    paypalEmail: string;
    postalCode: string;
    quantity: number;
    returnsAccepted: boolean;
    refund: string;
    returnPolicyDescription: string;
}

interface IHomePageState {
    sites: ISite[];
    categories: ICategory[];
    countries: ICountry[];
    currencies: string[];
    listingTypes: any;
    refundOptions: any;
    form: ISelected;
}

export class HomePage extends Component<any, IHomePageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            sites: eBayConstantData.sites,
            categories: undefined,
            countries: eBayConstantData.countries,
            currencies: eBayConstantData.currencies,
            listingTypes: eBayConstantData.listingTypes,
            refundOptions: eBayConstantData.refundOptions,
            form: {
                siteID: eBayConstantData.sites[0].ID,
                title: '',
                description: '',
                currentKeyword: '',
                keywords: [],
                categoryID: '',
                startPrice: 0,
                country: eBayConstantData.countries[0].code,
                currency: 'INR',
                dispatchTimeMax: 1,
                listingDuration: 14,
                listingType: eBayConstantData.listingTypes.FIXED_PRICE_ITEM,
                paypalEmail: '',
                postalCode: '',
                quantity: 1,
                returnsAccepted: true,
                refund: eBayConstantData.refundOptions.MONEY_BACK,
                returnPolicyDescription: ''
            }
        };
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.stateFormInputValueChange = this.stateFormInputValueChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getSuggestedItemCategories = this.getSuggestedItemCategories.bind(this);
        this.addKeyword = this.addKeyword.bind(this);
        this.removeKeyword = this.removeKeyword.bind(this);
    }

    render() {
        return (
            <div className='home-page'>
                <div className='form'>
                    <SelectField
                        className='selectField'
                        floatingLabelText='Site'
                        value={this.state.form.siteID}
                        onChange={this.handleSelectChange.bind(this, 'siteID')}
                    >
                        {this.state.sites.map(site => {
                            return <MenuItem
                                value={site.ID}
                                primaryText={site.name}
                                key={site.ID}
                            />;
                        })}
                    </SelectField>
                    <TextField
                        name='title'
                        value={this.state.form.title}
                        className='textField'
                        floatingLabelText='Item Title'
                        onChange={this.handleInputChange}
                    />
                    <TextField
                        name='description'
                        value={this.state.form.description}
                        className='textField'
                        floatingLabelText='Description'
                        multiLine={true}
                        onChange={this.handleInputChange}
                    />
                    <TextField
                        name='currentKeyword'
                        value={this.state.form.currentKeyword}
                        className='textField'
                        floatingLabelText='Category Keywords'
                        hintText='Press Enter to add keyword'
                        onChange={this.handleInputChange}
                        onKeyPress={this.addKeyword}
                    />
                    <div className='chips'>
                        {this.state.form.keywords.map((keyword, index) => {
                            return <Chip
                                className='chip'
                                onRequestDelete={() => this.removeKeyword(index)}
                                key={index}
                            >
                                {keyword}
                            </Chip>;
                        })}
                    </div>
                    {
                        !!this.state.categories ?
                            <SelectField
                                className='selectField'
                                floatingLabelText='Category'
                                value={this.state.form.categoryID}
                                onChange={this.handleSelectChange.bind(this, 'categoryID')}
                            >
                                {this.state.categories.map(category => {
                                    return <MenuItem
                                        value={category.ID}
                                        primaryText={category.name}
                                        key={category.ID}
                                    />;
                                })}
                            </SelectField> :
                            <div>
                                <p className='materialParagraph'>Updating categories...</p>
                                <LinearProgress mode="indeterminate" />
                            </div>
                    }
                    <TextField
                        name='startPrice'
                        value={this.state.form.startPrice}
                        type='number'
                        className='textField'
                        floatingLabelText='Price'
                        onChange={this.handleInputChange}
                    />
                    <SelectField
                        className='selectField'
                        floatingLabelText='Country'
                        value={this.state.form.country}
                        onChange={this.handleSelectChange.bind(this, 'country')}
                    >
                        {this.state.countries.map((country, index) => {
                            return <MenuItem
                                value={country.code}
                                primaryText={country.name}
                                key={index}
                            />;
                        })}
                    </SelectField>
                    <SelectField
                        className='selectField'
                        floatingLabelText='Currency'
                        value={this.state.form.currency}
                        onChange={this.handleSelectChange.bind(this, 'currency')}
                    >
                        {this.state.currencies.map((currency, index) => {
                            return <MenuItem
                                value={currency}
                                primaryText={currency}
                                key={index}
                            />;
                        })}
                    </SelectField>
                    <TextField
                        name='dispatchTimeMax'
                        value={this.state.form.dispatchTimeMax}
                        type='number'
                        className='textField'
                        floatingLabelText='Maximum Dispatch Time (In Days)'
                        onChange={this.handleInputChange}
                    />
                    <SelectField className='selectField' floatingLabelText='Listing Duration' value={this.state.form.listingDuration}>
                        <MenuItem value={7} primaryText='Days_7' />
                        <MenuItem value={14} primaryText='Days_14' />
                    </SelectField>
                    <SelectField
                        className='selectField'
                        floatingLabelText='Listing Type'
                        value={this.state.form.listingType}
                        onChange={this.handleSelectChange.bind(this, 'listingType')}
                    >
                        {Object.keys(this.state.listingTypes).map((listingType, index) => {
                            return <MenuItem
                                value={this.state.listingTypes[listingType]}
                                primaryText={this.state.listingTypes[listingType]}
                                key={index}
                            />;
                        })}
                    </SelectField>
                    <div className='checkboxDiv'>
                        <p className='materialParagraph'>Payment Methods</p>
                        <Checkbox className='checkbox' label='PayPal' />
                        <Checkbox className='checkbox' label='VisaMc' />
                        <Checkbox className='checkbox' label='PayPal' />
                        <Checkbox className='checkbox' label='VisaMc' />
                        <Checkbox className='checkbox' label='PayPal' />
                        <Checkbox className='checkbox' label='VisaMc' />
                        <Checkbox className='checkbox' label='PayPal' />
                        <Checkbox className='checkbox' label='VisaMc' />
                        <Checkbox className='checkbox' label='PayPal' />
                        <Checkbox className='checkbox' label='VisaMc' />
                        <Checkbox className='checkbox' label='PayPal' />
                        <Checkbox className='checkbox' label='VisaMc' />
                        <Checkbox className='checkbox' label='PayPal' />
                        <Checkbox className='checkbox' label='VisaMc' />
                    </div>
                    <TextField
                        name='paypalEmail'
                        value={this.state.form.paypalEmail}
                        type='email'
                        className='textField'
                        floatingLabelText='PayPal Email Address'
                        onChange={this.handleInputChange}
                    />
                    <TextField className='textField' floatingLabelText='Picture URLs' multiLine={true} hintText='Separate by whitespace (" ")' />
                    <TextField
                        name='postalCode'
                        value={this.state.form.postalCode}
                        className='textField'
                        floatingLabelText='Postal Code'
                        onChange={this.handleInputChange}
                    />
                    <TextField
                        name='quantity'
                        value={this.state.form.quantity}
                        type='email'
                        className='textField'
                        floatingLabelText='Item Quantity'
                        onChange={this.handleInputChange}
                    />
                    <div className='toggleDiv'>
                        <Toggle
                            className='toggle'
                            name='returnsAccepted'
                            label='Returns Accepted'
                            defaultToggled={this.state.form.returnsAccepted}
                            onToggle={this.handleInputChange}
                        />
                    </div>
                    <SelectField
                        className='selectField'
                        floatingLabelText='Refund Option'
                        value={this.state.form.refund}
                        onChange={this.handleSelectChange.bind(this, 'refund')}
                    >
                        {Object.keys(this.state.refundOptions).map((refundOption, index) => {
                            return <MenuItem
                                value={this.state.refundOptions[refundOption]}
                                primaryText={this.state.refundOptions[refundOption]}
                                key={index}
                            />;
                        })}
                    </SelectField>
                    <TextField
                        name='returnPolicyDescription'
                        value={this.state.form.returnPolicyDescription}
                        className='textField'
                        floatingLabelText='Return Policy Description'
                        multiLine={true}
                        onChange={this.handleInputChange}
                    />
                    <SelectField className='selectField' floatingLabelText='Returns Within' value={this.state.form.listingDuration}>
                        <MenuItem value={7} primaryText='Days_7' />
                        <MenuItem value={14} primaryText='Days_14' />
                    </SelectField>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.getSuggestedItemCategories();
    }

    handleSelectChange(propName: string, event: FormEvent<{}>, index: number, value: string) {
        this.stateFormInputValueChange(propName, value);
    }

    stateFormInputValueChange(propName: string, value: string | string[] | number) {
        this.setState({
            form: {
                ...this.state.form,
                [propName]: value
            }
        });
    }

    handleInputChange(event: any, value: any) {
        this.stateFormInputValueChange(event.currentTarget.name, value);
    }

    getSuggestedItemCategories() {
        this.setState({ categories: undefined });
        const selectedSite: ISite = this.state.sites.filter(site => site.ID === this.state.form.siteID)[0];
        const reqBody = {
            itemKeywords: this.state.form.keywords,
            site: selectedSite,
            APIAuthToken: `AgAAAA**AQAAAA**aAAAAA**w3xrWg**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6ADk4SjD5iCqA+dj6x9nY+seQ**5B4EAA**AAMAAA**0IwSrCUDIIaJZWsf11ROAxjV4ncqofn/z89Pi3R8AITOhTJWGbF51zP/5wOpUXJn9+Lg/OH5il7X8T2zuuTW137zFGQKmVMrYxKBMijEt5RivHLaiuVRnNAt9jzvczaJD17GjwbBwVrb0s+V1WN7E9CvubugpRQI66XFVnEqUJQAwHt9zhuFUFJoYcCKjC0eRYRiUgM+89iCEicQu/rTm7y7UgR4owFrzRpq9IGzetZeHnhgjwpZn6uyKN6RFXg0QY8cA6Dy2AuzWUW9fG0O3Yrbj0JI/MNf/myN38p7vpKxkMOrhL4v7FGep+zpTuydIFYeoVNS/1ZBTMhm9tNpKlmxan/fA3hJu2EcC1fZYNkPTYFLH+QWJ1NRwzfwEtJQ/lHq02bgtVWHoW7tyZui4yMoDg8f1C7o2t4520iuNtdhffIQyfxmuaEYDdsTZDz9UEfmIZN8+0nD8zgkwd7lc2VsO0j0XyYZ76WU+nYaIVWD1oZ2+OSXASwgsnlcaa6OGFtz/b8FDoUhHUMmLai4PG/NHd65e+nOGEA9zw6XcSsTvVwxSwHKjJusTFrNM85lpnRe718TjcevuWFMMnwNhCdqRO298JSt3bqPATMq24E5AGVz/VSMXqD0GFJJV8f+QaGr5OUq61o+dd/pVuZUh+EO+opMyk9Dp/dStTDSO0VBb6tK0yPBPAasQ7tE0zRMCG2tlkcAAPXN1+d/dQm8cp/wzCiEEjCDUxyL92ke+A+2Hcn8vyg3X85HN1Nijd4b`
        };
        axios.post('/api/categories', reqBody)
            .then(response => {
                const { data } = response;
                this.setState({ categories: data });
                if (data.length) this.stateFormInputValueChange('categoryID', this.state.categories[0].ID);
            })
            .catch(err => alert(err));
    }

    addKeyword(event: KeyboardEvent<{}>) {
        if (event.key === 'Enter') {
            const keywords: string[] = [...this.state.form.keywords, this.state.form.currentKeyword];
            this.setState({
                form: {
                    ...this.state.form,
                    keywords,
                    currentKeyword: ''
                }
            });
            this.getSuggestedItemCategories();
            event.preventDefault();
        }
    }

    removeKeyword(index: number) {
        const keywords: string[] = [...this.state.form.keywords];
        const removedKeyword: string[] = keywords.splice(index, 1);
        this.stateFormInputValueChange('keywords', keywords);
        this.getSuggestedItemCategories();
    }
}