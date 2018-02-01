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
import { ISite, ICategory, ICountry, IReturnPolicyDetail, IShippingServiceDetails } from '../../../../interfaces';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

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
    paymentMethods: string[];
    paypalEmail: string;
    pictureURLs: string[];
    currentPictureURL: string;
    postalCode: string;
    quantity: number;
    returnsAccepted: boolean;
    refund: string;
    returnPolicyDescription: string;
    returnsWithin: string;
    shippingCostPaidBy: 'Buyer' | 'Seller';
    shippingService: string;
    shippingType: string;
    shippingServicePriority: number;
    shippingServiceCost: number;
}

interface IHomePageState {
    sites: ISite[];
    categories: ICategory[];
    countries: ICountry[];
    currencies: string[];
    listingTypes: any;
    listingDurations: string[];
    paymentMethods: string[];
    refundOptions: IReturnPolicyDetail[];
    returnsWithinOptions: IReturnPolicyDetail[];
    shippingServicesObjects: IShippingServiceDetails[];
    form: ISelected;
}

export class HomePage extends Component<any, IHomePageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            sites: eBayConstantData.sites,
            categories: [],
            countries: eBayConstantData.countries,
            currencies: eBayConstantData.currencies,
            listingTypes: eBayConstantData.listingTypes,
            refundOptions: [],
            listingDurations: eBayConstantData.listingDurations,
            returnsWithinOptions: [],
            paymentMethods: [],
            shippingServicesObjects: [],
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
                paymentMethods: [],
                paypalEmail: '',
                pictureURLs: [],
                currentPictureURL: '',
                postalCode: '',
                quantity: 1,
                returnsAccepted: true,
                refund: eBayConstantData.refundOptions.MONEY_BACK,
                returnPolicyDescription: '',
                returnsWithin: '',
                shippingCostPaidBy: 'Buyer',
                shippingServicePriority: 1,
                shippingServiceCost: 0,
                shippingService: '',
                shippingType: ''
            }
        };
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.stateFormInputValueChange = this.stateFormInputValueChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getSuggestedItemCategories = this.getSuggestedItemCategories.bind(this);
        this.addKeyword = this.addKeyword.bind(this);
        this.removeKeyword = this.removeKeyword.bind(this);
        this.addPictureURL = this.addPictureURL.bind(this);
        this.removePictureURL = this.removePictureURL.bind(this);
        this.getPaymentMethods = this.getPaymentMethods.bind(this);
        this.getReturnPolicy = this.getReturnPolicy.bind(this);
        this.getShippingServices = this.getShippingServices.bind(this);
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
                        disabled={!this.state.categories}
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
                        floatingLabelText='Category Keywords (Only used to load categories, not included in item listing)'
                        hintText='Press Enter to add keyword'
                        onChange={this.handleInputChange}
                        onKeyPress={this.addKeyword}
                        disabled={!this.state.categories}
                    />
                    <div className='chips'>
                        {this.state.form.keywords.map((keyword, index) => {
                            return this.state.categories ?
                                <Chip
                                    className='chip'
                                    onRequestDelete={() => this.removeKeyword(index)}
                                    key={index}
                                >
                                    {keyword}
                                </Chip> :
                                <Chip
                                    className='chip'
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
                    <SelectField
                        className='selectField'
                        floatingLabelText='Listing Duration'
                        value={this.state.form.listingDuration}
                        onChange={this.handleSelectChange.bind(this, 'listingDuration')}
                    >
                        {this.state.listingDurations.map((listingDuration, index) => {
                            return <MenuItem
                                value={listingDuration}
                                primaryText={listingDuration}
                                key={index}
                            />;
                        })}
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
                    {
                        !!this.state.paymentMethods ?
                            <SelectField
                                className='selectField'
                                floatingLabelText='Payment Method'
                                multiple={true}
                                value={this.state.form.paymentMethods}
                                onChange={this.handleSelectChange.bind(this, 'paymentMethods')}
                            >
                                {this.state.paymentMethods.map(paymentMethod => {
                                    return <MenuItem
                                        value={paymentMethod}
                                        primaryText={paymentMethod}
                                        key={paymentMethod}
                                    />;
                                })}
                            </SelectField> :
                            <div>
                                <p className='materialParagraph'>Updating payment methods...</p>
                                <LinearProgress mode="indeterminate" />
                            </div>
                    }
                    <TextField
                        name='paypalEmail'
                        value={this.state.form.paypalEmail}
                        type='email'
                        className='textField'
                        floatingLabelText='PayPal Email Address'
                        onChange={this.handleInputChange}
                    />
                    <TextField
                        name='currentPictureURL'
                        value={this.state.form.currentPictureURL}
                        className='textField'
                        floatingLabelText='Picture URLs'
                        hintText='Press Enter to add picture URL'
                        onChange={this.handleInputChange}
                        onKeyPress={this.addPictureURL}
                    />
                    <div className='chips'>
                        {this.state.form.pictureURLs.map((pictureURL, index) => {
                            return <Chip
                                className='chip'
                                onRequestDelete={() => this.removePictureURL(index)}
                                key={index}
                            >
                                {pictureURL}
                            </Chip>;
                        })}
                    </div>
                    <div className='picturesDiv'>
                        {this.state.form.pictureURLs.map((pictureURL, index) => (
                            <img className='picture' key={index} src={pictureURL} />
                        ))}
                    </div>
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
                    {
                        this.state.form.returnsAccepted &&
                        <div>
                            {
                                !!this.state.refundOptions ?
                                    <SelectField
                                        className='selectField'
                                        floatingLabelText='Refund Option'
                                        value={this.state.form.refund}
                                        onChange={this.handleSelectChange.bind(this, 'refund')}
                                    >
                                        {this.state.refundOptions.map((refundOption, index) => {
                                            return <MenuItem
                                                value={refundOption.name}
                                                primaryText={refundOption.description}
                                                key={index}
                                            />;
                                        })}
                                    </SelectField> :
                                    <div>
                                        <p className='materialParagraph'>Updating refund options...</p>
                                        <LinearProgress mode="indeterminate" />
                                    </div>
                            }
                            <TextField
                                name='returnPolicyDescription'
                                value={this.state.form.returnPolicyDescription}
                                className='textField'
                                floatingLabelText='Return Policy Description'
                                multiLine={true}
                                onChange={this.handleInputChange}
                            />
                            {
                                !!this.state.returnsWithinOptions ?
                                    <SelectField
                                        className='selectField'
                                        floatingLabelText='Returns Within'
                                        value={this.state.form.returnsWithin}
                                        onChange={this.handleSelectChange.bind(this, 'returnsWithin')}
                                    >
                                        {this.state.returnsWithinOptions.map((returnsWithinOption, index) => {
                                            return <MenuItem
                                                value={returnsWithinOption.name}
                                                primaryText={returnsWithinOption.description}
                                                key={index}
                                            />;
                                        })}
                                    </SelectField> :
                                    <div>
                                        <p className='materialParagraph'>Updating returns within options...</p>
                                        <LinearProgress mode="indeterminate" />
                                    </div>
                            }
                            <SelectField
                                className='selectField'
                                floatingLabelText='Shipping Cost Paid By'
                                value={this.state.form.shippingCostPaidBy}
                                onChange={this.handleSelectChange.bind(this, 'shippingCostPaidBy')}
                            >
                                <MenuItem value='Buyer' primaryText='Buyer' />
                                <MenuItem value='Seller' primaryText='Seller' />
                            </SelectField>
                        </div>
                    }
                    <TextField
                        name='shippingServicePriority'
                        value={this.state.form.shippingServicePriority}
                        type='number'
                        className='textField'
                        floatingLabelText='Shipping Service Priority'
                        onChange={this.handleInputChange}
                    />
                    <TextField
                        name='shippingServiceCost'
                        value={this.state.form.shippingServiceCost}
                        type='number'
                        className='textField'
                        floatingLabelText={`Shipping Service Cost (${this.state.form.currency})`}
                        onChange={this.handleInputChange}
                    />
                    {
                        !!this.state.shippingServicesObjects ?
                            <SelectField
                                className='selectField'
                                floatingLabelText='Shipping Service'
                                value={this.state.form.shippingService}
                                onChange={this.handleSelectChange.bind(this, 'shippingService')}
                            >
                                {this.state.shippingServicesObjects.map((service, index) => {
                                    return <MenuItem
                                        value={service.name}
                                        primaryText={service.name}
                                        key={index}
                                    />;
                                })}
                            </SelectField> :
                            <div>
                                <p className='materialParagraph'>Updating shipping services...</p>
                                <LinearProgress mode="indeterminate" />
                            </div>
                    }
                    {
                        !!this.state.shippingServicesObjects && !!this.state.form.shippingService &&
                        <SelectField
                            className='selectField'
                            floatingLabelText='Shipping Type'
                            value={this.state.form.shippingType}
                            onChange={this.handleSelectChange.bind(this, 'shippingType')}
                        >
                            {this.state.shippingServicesObjects.filter(service => {
                                return service.name === this.state.form.shippingService;
                            })[0].types.map(type => {
                                return <MenuItem
                                    value={type}
                                    primaryText={type}
                                    key={type}
                                />;
                            })}
                        </SelectField>
                    }
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.reloadEBayData();
    }

    reloadEBayData() {
        this.getSuggestedItemCategories();
        this.getReturnPolicy();
        this.getShippingServices();
    }

    handleSelectChange(propName: string, event: FormEvent<{}>, index: number, value: string): void {
        this.stateFormInputValueChange(propName, value);
    }

    stateFormInputValueChange(propName: string, value: string | string[] | number): void {
        this.setState({
            form: {
                ...this.state.form,
                [propName]: value
            }
        }, () => {
            if (propName === 'siteID') this.reloadEBayData();
            else if (propName === 'categoryID') this.getPaymentMethods();
        });
    }

    handleInputChange(event: any, value: any): void {
        this.stateFormInputValueChange(event.currentTarget.name, value);
    }

    getSuggestedItemCategories(): void {
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
                this.setState({ categories: data }, () => {
                    if (data.length) {
                        this.setState({
                            form: {
                                ...this.state.form,
                                categoryID: this.state.categories[0].ID
                            }
                        }, () => this.getPaymentMethods());
                    }
                });
            })
            .catch(err => alert(err));
    }

    addKeyword(event: KeyboardEvent<{}>): void {
        if (event.key === 'Enter') {
            const keywords: string[] = [...this.state.form.keywords, this.state.form.currentKeyword];
            this.setState({
                form: {
                    ...this.state.form,
                    keywords,
                    currentKeyword: ''
                }
            }, () => this.getSuggestedItemCategories());
            event.preventDefault();
        }
    }

    removeKeyword(index: number): void {
        const keywords: string[] = [...this.state.form.keywords];
        const removedKeyword: string[] = keywords.splice(index, 1);
        this.setState({
            form: {
                ...this.state.form,
                keywords
            }
        }, () => this.getSuggestedItemCategories());
    }

    getPaymentMethods(): void {
        this.setState({ paymentMethods: undefined });
        const selectedSite: ISite = this.state.sites.filter(site => site.ID === this.state.form.siteID)[0];
        const reqBody = {
            categoryID: this.state.form.categoryID,
            site: selectedSite,
            APIAuthToken: `AgAAAA**AQAAAA**aAAAAA**w3xrWg**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6ADk4SjD5iCqA+dj6x9nY+seQ**5B4EAA**AAMAAA**0IwSrCUDIIaJZWsf11ROAxjV4ncqofn/z89Pi3R8AITOhTJWGbF51zP/5wOpUXJn9+Lg/OH5il7X8T2zuuTW137zFGQKmVMrYxKBMijEt5RivHLaiuVRnNAt9jzvczaJD17GjwbBwVrb0s+V1WN7E9CvubugpRQI66XFVnEqUJQAwHt9zhuFUFJoYcCKjC0eRYRiUgM+89iCEicQu/rTm7y7UgR4owFrzRpq9IGzetZeHnhgjwpZn6uyKN6RFXg0QY8cA6Dy2AuzWUW9fG0O3Yrbj0JI/MNf/myN38p7vpKxkMOrhL4v7FGep+zpTuydIFYeoVNS/1ZBTMhm9tNpKlmxan/fA3hJu2EcC1fZYNkPTYFLH+QWJ1NRwzfwEtJQ/lHq02bgtVWHoW7tyZui4yMoDg8f1C7o2t4520iuNtdhffIQyfxmuaEYDdsTZDz9UEfmIZN8+0nD8zgkwd7lc2VsO0j0XyYZ76WU+nYaIVWD1oZ2+OSXASwgsnlcaa6OGFtz/b8FDoUhHUMmLai4PG/NHd65e+nOGEA9zw6XcSsTvVwxSwHKjJusTFrNM85lpnRe718TjcevuWFMMnwNhCdqRO298JSt3bqPATMq24E5AGVz/VSMXqD0GFJJV8f+QaGr5OUq61o+dd/pVuZUh+EO+opMyk9Dp/dStTDSO0VBb6tK0yPBPAasQ7tE0zRMCG2tlkcAAPXN1+d/dQm8cp/wzCiEEjCDUxyL92ke+A+2Hcn8vyg3X85HN1Nijd4b`
        };
        axios.post('/api/payment-methods', reqBody)
            .then(response => {
                const { data } = response;
                this.setState({ paymentMethods: data }, () => {
                    const currentlySelectedPaymentMethods = [...this.state.form.paymentMethods];
                    currentlySelectedPaymentMethods.forEach((method, index) => {
                        if (!~data.indexOf(method)) currentlySelectedPaymentMethods.splice(index, 1);
                    });
                    if (data.length && !currentlySelectedPaymentMethods.length)
                        currentlySelectedPaymentMethods.push(data[0]);
                    this.stateFormInputValueChange('paymentMethods', currentlySelectedPaymentMethods);
                });
            })
            .catch(err => alert(err));
    }

    addPictureURL(event: KeyboardEvent<{}>): void {
        if (event.key === 'Enter') {
            const pictureURLs: string[] = [...this.state.form.pictureURLs, this.state.form.currentPictureURL];
            this.setState({
                form: {
                    ...this.state.form,
                    pictureURLs,
                    currentPictureURL: ''
                }
            });
            event.preventDefault();
        }
    }

    removePictureURL(index: number): void {
        const pictureURLs: string[] = [...this.state.form.pictureURLs];
        const removedPictureURL: string[] = pictureURLs.splice(index, 1);
        this.stateFormInputValueChange('pictureURLs', pictureURLs);
    }

    getReturnPolicy(): void {
        this.setState({
            refundOptions: undefined,
            returnsWithinOptions: undefined
        });
        const selectedSite: ISite = this.state.sites.filter(site => site.ID === this.state.form.siteID)[0];
        const reqBody = {
            site: selectedSite,
            APIAuthToken: `AgAAAA**AQAAAA**aAAAAA**w3xrWg**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6ADk4SjD5iCqA+dj6x9nY+seQ**5B4EAA**AAMAAA**0IwSrCUDIIaJZWsf11ROAxjV4ncqofn/z89Pi3R8AITOhTJWGbF51zP/5wOpUXJn9+Lg/OH5il7X8T2zuuTW137zFGQKmVMrYxKBMijEt5RivHLaiuVRnNAt9jzvczaJD17GjwbBwVrb0s+V1WN7E9CvubugpRQI66XFVnEqUJQAwHt9zhuFUFJoYcCKjC0eRYRiUgM+89iCEicQu/rTm7y7UgR4owFrzRpq9IGzetZeHnhgjwpZn6uyKN6RFXg0QY8cA6Dy2AuzWUW9fG0O3Yrbj0JI/MNf/myN38p7vpKxkMOrhL4v7FGep+zpTuydIFYeoVNS/1ZBTMhm9tNpKlmxan/fA3hJu2EcC1fZYNkPTYFLH+QWJ1NRwzfwEtJQ/lHq02bgtVWHoW7tyZui4yMoDg8f1C7o2t4520iuNtdhffIQyfxmuaEYDdsTZDz9UEfmIZN8+0nD8zgkwd7lc2VsO0j0XyYZ76WU+nYaIVWD1oZ2+OSXASwgsnlcaa6OGFtz/b8FDoUhHUMmLai4PG/NHd65e+nOGEA9zw6XcSsTvVwxSwHKjJusTFrNM85lpnRe718TjcevuWFMMnwNhCdqRO298JSt3bqPATMq24E5AGVz/VSMXqD0GFJJV8f+QaGr5OUq61o+dd/pVuZUh+EO+opMyk9Dp/dStTDSO0VBb6tK0yPBPAasQ7tE0zRMCG2tlkcAAPXN1+d/dQm8cp/wzCiEEjCDUxyL92ke+A+2Hcn8vyg3X85HN1Nijd4b`
        };
        axios.post('/api/return-policy', reqBody)
            .then(response => {
                const { refundOptions, returnsWithinOptions } = response.data;
                this.setState({ refundOptions, returnsWithinOptions }, () => {
                    this.stateFormInputValueChange('refund', refundOptions[0].name);
                    this.stateFormInputValueChange('returnsWithin', returnsWithinOptions[0].name);
                });
            })
            .catch(err => alert(err));
    }

    getShippingServices(): void {
        this.setState({ shippingServicesObjects: undefined });
        const selectedSite: ISite = this.state.sites.filter(site => site.ID === this.state.form.siteID)[0];
        const reqBody = {
            site: selectedSite,
            APIAuthToken: `AgAAAA**AQAAAA**aAAAAA**w3xrWg**nY+sHZ2PrBmdj6wVnY+sEZ2PrA2dj6ADk4SjD5iCqA+dj6x9nY+seQ**5B4EAA**AAMAAA**0IwSrCUDIIaJZWsf11ROAxjV4ncqofn/z89Pi3R8AITOhTJWGbF51zP/5wOpUXJn9+Lg/OH5il7X8T2zuuTW137zFGQKmVMrYxKBMijEt5RivHLaiuVRnNAt9jzvczaJD17GjwbBwVrb0s+V1WN7E9CvubugpRQI66XFVnEqUJQAwHt9zhuFUFJoYcCKjC0eRYRiUgM+89iCEicQu/rTm7y7UgR4owFrzRpq9IGzetZeHnhgjwpZn6uyKN6RFXg0QY8cA6Dy2AuzWUW9fG0O3Yrbj0JI/MNf/myN38p7vpKxkMOrhL4v7FGep+zpTuydIFYeoVNS/1ZBTMhm9tNpKlmxan/fA3hJu2EcC1fZYNkPTYFLH+QWJ1NRwzfwEtJQ/lHq02bgtVWHoW7tyZui4yMoDg8f1C7o2t4520iuNtdhffIQyfxmuaEYDdsTZDz9UEfmIZN8+0nD8zgkwd7lc2VsO0j0XyYZ76WU+nYaIVWD1oZ2+OSXASwgsnlcaa6OGFtz/b8FDoUhHUMmLai4PG/NHd65e+nOGEA9zw6XcSsTvVwxSwHKjJusTFrNM85lpnRe718TjcevuWFMMnwNhCdqRO298JSt3bqPATMq24E5AGVz/VSMXqD0GFJJV8f+QaGr5OUq61o+dd/pVuZUh+EO+opMyk9Dp/dStTDSO0VBb6tK0yPBPAasQ7tE0zRMCG2tlkcAAPXN1+d/dQm8cp/wzCiEEjCDUxyL92ke+A+2Hcn8vyg3X85HN1Nijd4b`
        };
        axios.post('/api/shipping-services', reqBody)
            .then(response => {
                const shippingServicesObjects = response.data;
                this.setState({
                    shippingServicesObjects,
                    form: {
                        ...this.state.form,
                        shippingService: shippingServicesObjects[0].name,
                        shippingType: shippingServicesObjects[0].types[0]
                    }
                });
            })
            .catch(err => alert(err));
    }
}