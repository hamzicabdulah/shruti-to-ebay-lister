import * as React from 'react';
import { Component, FormEvent, KeyboardEvent } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import Chip from 'material-ui/Chip';
import Toggle from 'material-ui/Toggle';
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { GridList, GridTile } from 'material-ui/GridList';
import axios from 'axios';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import { html as htmlBeautify } from 'js-beautify';
import { eBayConstantData } from '../../../../eBayConstantData';
import { ISite, ICategory, ICountry, IReturnPolicyDetail, IShippingServiceDetails, IDispatchTimeMaxDetails, IItemTotalFee } from '../../../../interfaces';
import { IAccount } from '../success/SuccessPage';

interface IForm {
    siteID: string;
    title: string;
    description: string;
    keywords: string[];
    currentKeyword: string;
    categoryID: string;
    startPrice: number;
    country: string;
    currency: string;
    dispatchTimeMax: string;
    listingDuration: string;
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
    domesticShippingService: string;
    supportsInternationalShipping: boolean;
    internationalShippingService: string;
    shippingType: string;
    shippingServicePriority: number;
    shippingServiceCost: number;
    brand: string;
    UPC: string;
    currentSpecific: string;
    itemSpecifics: string[];
    APIAuthToken: string;
    [key: string]: any;
}

interface IHomePageState {
    sites: ISite[];
    categories: ICategory[];
    countries: ICountry[];
    currencies: string[];
    listingTypes: any;
    listingDurations: any;
    paymentMethods: string[];
    returnPolicySupport: false;
    refundOptions: IReturnPolicyDetail[];
    returnsWithinOptions: IReturnPolicyDetail[];
    shippingServicesObjects: IShippingServiceDetails[];
    listItemSubmitLoading: boolean;
    snackbarOpen: boolean;
    snackbarMessage: string;
    dispatchTimeMaxOptions: IDispatchTimeMaxDetails[];
    accounts: IAccount[];
    gettingDataFromShruti: boolean;
    form: IForm;
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
            returnPolicySupport: false,
            returnsWithinOptions: [],
            paymentMethods: [],
            shippingServicesObjects: [],
            listItemSubmitLoading: false,
            snackbarOpen: false,
            snackbarMessage: '',
            dispatchTimeMaxOptions: [],
            accounts: [],
            gettingDataFromShruti: false,
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
                dispatchTimeMax: '3',
                listingDuration: 'GTC',
                listingType: eBayConstantData.listingTypes.FIXED_PRICE_ITEM,
                paymentMethods: [],
                paypalEmail: '',
                pictureURLs: [],
                currentPictureURL: '',
                postalCode: '',
                quantity: 1,
                returnsAccepted: true,
                refund: eBayConstantData.refundOptions.MONEY_BACK_OR_REPLACEMENT,
                returnPolicyDescription: '',
                returnsWithin: '',
                shippingCostPaidBy: 'Buyer',
                shippingServicePriority: 1,
                shippingServiceCost: 0,
                domesticShippingService: 'Other',
                shippingType: 'Flat',
                supportsInternationalShipping: true,
                internationalShippingService: 'StandardInternational',
                brand: '',
                UPC: '',
                currentSpecific: '',
                itemSpecifics: [],
                APIAuthToken: undefined
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
        this.addSpecific = this.addSpecific.bind(this);
        this.removeSpecific = this.removeSpecific.bind(this);
        this.getPaymentMethods = this.getPaymentMethods.bind(this);
        this.getReturnPolicy = this.getReturnPolicy.bind(this);
        this.getShippingServices = this.getShippingServices.bind(this);
        this.submitItemListing = this.submitItemListing.bind(this);
        this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
        this.shouldDisableButton = this.shouldDisableButton.bind(this);
    }

    render() {
        return (
            <div className='home-page'>
                {
                    this.state.gettingDataFromShruti ?
                        <div className='circularProgress'>
                            <CircularProgress
                                size={120}
                                thickness={7}
                            />
                        </div> :
                        <div className='form'>
                            <SelectField
                                className='selectField'
                                floatingLabelText='eBay Account'
                                value={this.state.form.APIAuthToken}
                                onChange={this.handleSelectChange.bind(this, 'APIAuthToken')}
                            >
                                {this.state.accounts.map((account, index) => {
                                    return <MenuItem
                                        value={account.token}
                                        primaryText={account.username}
                                        key={index}
                                    />;
                                })}
                            </SelectField>
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
                                floatingLabelText={`Title (${this.state.form.title.length}/80)`}
                                errorText={
                                    this.state.form.title.length > 80 ?
                                        'Item title cannot contain more than 80 characters' :
                                        null
                                }
                                onChange={this.handleInputChange}
                            />
                            <TextField
                                name='description'
                                value={this.state.form.description}
                                className='textField'
                                floatingLabelText='Description (HTML code supported)'
                                multiLine={true}
                                rowsMax={20}
                                onChange={this.handleInputChange}
                                disabled={typeof this.state.form.description == 'undefined'}
                            />
                            {
                                typeof !!~this.state.form.description.length && !!~this.state.form.description.indexOf('</') &&
                                <Card className='card'>
                                    <CardText className='cardText'>
                                        <h3>DESCRIPTION PREVIEW</h3>
                                        <div dangerouslySetInnerHTML={{ __html: this.state.form.description }} />
                                    </CardText>
                                </Card>
                            }
                            <TextField
                                name='brand'
                                value={this.state.form.brand}
                                className='textField'
                                floatingLabelText='Brand'
                                onChange={this.handleInputChange}
                            />
                            <TextField
                                name='UPC'
                                value={this.state.form.UPC}
                                className='textField'
                                floatingLabelText='UPC'
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
                                    return (
                                        <Chip
                                            className='chip'
                                            onRequestDelete={
                                                this.state.categories ?
                                                    () => this.removeKeyword(index) :
                                                    null
                                            }
                                            key={index}
                                        >
                                            {keyword}
                                        </Chip>
                                    );
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
                            <TextField
                                name='postalCode'
                                value={this.state.form.postalCode}
                                className='textField'
                                floatingLabelText='Postal Code'
                                onChange={this.handleInputChange}
                            />
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
                            {
                                this.state.dispatchTimeMaxOptions ?
                                    <SelectField
                                        value={this.state.form.dispatchTimeMax}
                                        className='selectField'
                                        floatingLabelText='Maximum Dispatch Time'
                                        onChange={this.handleSelectChange.bind(this, 'dispatchTimeMax')}
                                    >
                                        {this.state.dispatchTimeMaxOptions.map((dispatchTimeMaxOption, index) => {
                                            return <MenuItem
                                                value={dispatchTimeMaxOption.value}
                                                primaryText={dispatchTimeMaxOption.description}
                                                key={index}
                                            />;
                                        })}
                                    </SelectField> :
                                    <div>
                                        <p className='materialParagraph'>Updating dispatch time max options...</p>
                                        <LinearProgress mode="indeterminate" />
                                    </div>
                            }
                            <SelectField
                                className='selectField'
                                floatingLabelText='Listing Duration'
                                value={this.state.form.listingDuration}
                                onChange={this.handleSelectChange.bind(this, 'listingDuration')}
                            >
                                {Object.keys(this.state.listingDurations.common)
                                    .map((listingDuration, index) => {
                                        return <MenuItem
                                            value={listingDuration}
                                            primaryText={this.state.listingDurations.common[listingDuration]}
                                            key={listingDuration + index}
                                        />;
                                    })}
                                {
                                    this.state.form.listingType === this.state.listingTypes.FIXED_PRICE_ITEM &&
                                    Object.keys(this.state.listingDurations.fixed)
                                        .map((listingDuration, index) => {
                                            return <MenuItem
                                                value={listingDuration}
                                                primaryText={this.state.listingDurations.fixed[listingDuration]}
                                                key={listingDuration + index}
                                            />;
                                        })
                                }
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
                            {
                                !!~this.state.form.paymentMethods.indexOf('PayPal') &&
                                <TextField
                                    name='paypalEmail'
                                    value={this.state.form.paypalEmail}
                                    type='email'
                                    className='textField'
                                    floatingLabelText='PayPal Email Address'
                                    onChange={this.handleInputChange}
                                />
                            }
                            <TextField
                                name='currentPictureURL'
                                value={this.state.form.currentPictureURL}
                                className='textField'
                                floatingLabelText='Picture URLs'
                                hintText='Press Enter to add picture URL'
                                onChange={this.handleInputChange}
                                onKeyPress={this.addPictureURL}
                            />
                            <div className='picturesDiv'>
                                {this.state.form.pictureURLs.map((pictureURL, index) => (
                                    <Card className='picture' key={index}>
                                        <CardMedia>
                                            <img src={pictureURL} />
                                        </CardMedia>
                                        <CardActions>
                                            <FlatButton label='Remove' onClick={() => this.removePictureURL(index)} />
                                            <FlatButton label='Open' href={pictureURL} target='_blank' />
                                        </CardActions>
                                    </Card>
                                ))}
                            </div>
                            <TextField
                                name='quantity'
                                value={this.state.form.quantity}
                                type='email'
                                className='textField'
                                floatingLabelText='Item Quantity'
                                onChange={this.handleInputChange}
                            />
                            {
                                this.state.returnPolicySupport &&
                                <div className='toggleDiv'>
                                    <Toggle
                                        className='toggle'
                                        name='returnsAccepted'
                                        label='Returns Accepted'
                                        defaultToggled={this.state.form.returnsAccepted}
                                        onToggle={this.handleInputChange}
                                    />
                                </div>
                            }
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
                                        floatingLabelText='Domestic Shipping Service'
                                        value={this.state.form.domesticShippingService}
                                        onChange={this.handleSelectChange.bind(this, 'domesticShippingService')}
                                    >
                                        {this.state.shippingServicesObjects.filter(service => !service.isInternational)
                                            .map((service, index) => {
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
                                !!this.state.shippingServicesObjects && !!this.state.shippingServicesObjects.length &&
                                !!this.state.form.domesticShippingService &&
                                <SelectField
                                    className='selectField'
                                    floatingLabelText='Shipping Type'
                                    value={this.state.form.shippingType}
                                    onChange={this.handleSelectChange.bind(this, 'shippingType')}
                                >
                                    {this.state.shippingServicesObjects && this.state.shippingServicesObjects.find(service => service.name === this.state.form.domesticShippingService)
                                        .types.map(type => {
                                            return <MenuItem
                                                value={type}
                                                primaryText={type}
                                                key={type}
                                            />;
                                        })}
                                </SelectField>
                            }
                            <div className='toggleDiv'>
                                <Toggle
                                    className='toggle'
                                    name='supportsInternationalShipping'
                                    label='International Shipping Support'
                                    defaultToggled={this.state.form.supportsInternationalShipping}
                                    onToggle={this.handleInputChange}
                                />
                            </div>
                            {
                                !!this.state.form.supportsInternationalShipping &&
                                (!!this.state.shippingServicesObjects ?
                                    <SelectField
                                        className='selectField'
                                        floatingLabelText='International Shipping Service'
                                        value={this.state.form.internationalShippingService}
                                        onChange={this.handleSelectChange.bind(this, 'internationalShippingService')}
                                    >
                                        {this.state.shippingServicesObjects.filter(service => service.isInternational)
                                            .map((service, index) => {
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
                                    </div>)
                            }
                            <TextField
                                name='currentSpecific'
                                value={this.state.form.currentSpecific}
                                className='textField'
                                floatingLabelText='Item specifics (Use this field if asked to include specific fields for an item)'
                                hintText='Press Enter to add. Separate name and value with colon and whitespace. Eg: Colour: red'
                                onChange={this.handleInputChange}
                                onKeyPress={this.addSpecific}
                            />
                            <div className='chips'>
                                {this.state.form.itemSpecifics.map((specific, index) => {
                                    return <Chip
                                        className='chip'
                                        onRequestDelete={() => this.removeSpecific(index)}
                                        key={index}
                                    >
                                        {specific}
                                    </Chip>;
                                })}
                            </div>
                            <RaisedButton
                                className='submitButton'
                                label='List Item'
                                primary={true}
                                onClick={this.submitItemListing}
                                disabled={this.shouldDisableButton()}
                            />
                            {
                                this.state.listItemSubmitLoading &&
                                <div>
                                    <LinearProgress mode='indeterminate' />
                                    <p className='materialParagraph'>Item listing is in progress. Please be patient.</p>
                                </div>
                            }
                            <Snackbar
                                open={this.state.snackbarOpen}
                                message={this.state.snackbarMessage}
                                autoHideDuration={6000}
                                onRequestClose={this.handleSnackbarClose}
                            />
                        </div>
                }
            </div>
        );
    }

    componentDidMount() {
        this.fillInputsWithShrutiProductData()
            .then(() => this.reloadEBayData())
            .then(() => this.getTokenFromLocalStorage())
            .then(() => this.fillUserSpecificEmail())
            .catch(err => alert(err));
    }

    reloadEBayData() {
        if (this.state.form.keywords && this.state.form.keywords.length) this.getSuggestedItemCategories();
        this.getShippingServices();
        this.getDispatchTimeMaxOptions();
    }

    handleSelectChange(propName: string, event: FormEvent<{}>, index: number, value: string): void {
        this.stateFormInputValueChange(propName, value);
    }

    stateFormInputValueChange(propName: string, value: any): void {
        this.setState({
            form: {
                ...this.state.form,
                [propName]: value
            }
        }, () => {
            switch (propName) {
                case 'siteID':
                    this.reloadEBayData();
                    break;
                case 'categoryID':
                    this.getPaymentMethods();
                    break;
                case 'APIAuthToken':
                    this.fillUserSpecificEmail();
                    break;
                default:
                    return;
            }
        });
    }

    handleInputChange(event: any, value: any): void {
        const inputName: string = event.currentTarget.name;
        if (this.inputValueShouldBeNumber(inputName)) value = +value;
        this.stateFormInputValueChange(inputName, value);
    }

    inputValueShouldBeNumber(inputName: string) {
        switch (inputName) {
            case 'startPrice':
            case 'quantity':
            case 'shippingServicePriority':
            case 'shippingServiceCost':
                return true;
            default:
                return false;
        }
    }

    getSuggestedItemCategories(): void {
        this.setState({ categories: undefined }, () => {
            const selectedSite: ISite = this.state.sites.find(site => site.ID === this.state.form.siteID);
            const reqBody = {
                itemKeywords: this.state.form.keywords,
                site: selectedSite
            };
            axios.post('/api/categories', reqBody)
                .then(response => {
                    const { data } = response;
                    this.setState({ categories: data }, () => {
                        if (data.length && !this.isValidCategorySelected()) {
                            this.setState({
                                form: {
                                    ...this.state.form,
                                    categoryID: this.state.categories[0].ID
                                }
                            }, () => {
                                this.getReturnPolicy();
                                this.getPaymentMethods();
                            });
                        }
                    });
                })
                .catch(err => alert(err));
        });
    }

    isValidCategorySelected(): boolean {
        const categoryIDs: string[] = this.state.categories.map(category => category.ID);
        const selectedCategoryID: string = this.state.form.categoryID;
        return !!selectedCategoryID && !!selectedCategoryID.length && !!~categoryIDs.indexOf(selectedCategoryID);
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
        const selectedSite: ISite = this.state.sites.find(site => site.ID === this.state.form.siteID);
        const reqBody = {
            categoryID: this.state.form.categoryID,
            site: selectedSite
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

    addSpecific(event: KeyboardEvent<{}>): void {
        if (event.key === 'Enter') {
            const itemSpecifics: string[] = [...this.state.form.itemSpecifics, this.state.form.currentSpecific];
            this.setState({
                form: {
                    ...this.state.form,
                    itemSpecifics,
                    currentSpecific: ''
                }
            });
            event.preventDefault();
        }
    }

    removeSpecific(index: number): void {
        const itemSpecifics: string[] = [...this.state.form.itemSpecifics];
        const removedSpecific: string[] = itemSpecifics.splice(index, 1);
        this.stateFormInputValueChange('itemSpecifics', itemSpecifics);
    }

    getReturnPolicy(): void {
        this.setState({
            refundOptions: undefined,
            returnsWithinOptions: undefined
        });
        const selectedSite: ISite = this.state.sites.find(site => site.ID === this.state.form.siteID);
        const reqBody = {
            site: selectedSite,
            categoryID: this.state.form.categoryID
        };
        axios.post('/api/return-policy', reqBody)
            .then(response => {
                const { refundOptions, returnsWithinOptions, returnPolicySupport } = response.data;
                this.setState({ refundOptions, returnsWithinOptions, returnPolicySupport }, () => {
                    if (!this.isValidRefundOptionSelected())
                        this.stateFormInputValueChange('refund', refundOptions[0].name);
                    if (!this.isValidReturnsWithinOptionSelected())
                        this.stateFormInputValueChange('returnsWithin', returnsWithinOptions[0].name);
                });
            })
            .catch(err => alert(err));
    }

    isValidRefundOptionSelected(): boolean {
        const refundOptionNames: string[] = this.state.refundOptions.map(option => option.name);
        const selectedRefundOptionName: string = this.state.form.refund;
        return !!selectedRefundOptionName && !!selectedRefundOptionName.length
            && !!~refundOptionNames.indexOf(selectedRefundOptionName);
    }

    isValidReturnsWithinOptionSelected(): boolean {
        const returnsWithinOptionNames: string[] = this.state.returnsWithinOptions.map(option => option.name);
        const selectedReturnsWithinOptionName: string = this.state.form.returnsWithin;
        return !!selectedReturnsWithinOptionName && !!selectedReturnsWithinOptionName.length
            && !!~returnsWithinOptionNames.indexOf(selectedReturnsWithinOptionName);
    }

    getShippingServices(): void {
        this.setState({ shippingServicesObjects: undefined });
        const selectedSite: ISite = this.state.sites.find(site => site.ID === this.state.form.siteID);
        const reqBody = { site: selectedSite };
        axios.post('/api/shipping-services', reqBody)
            .then(response => {
                const shippingServicesObjects = response.data;
                this.setState({ shippingServicesObjects }, () => {
                    if (!this.isShippingServiceSelectedValid()) {
                        this.setState({
                            form: {
                                ...this.state.form,
                                domesticShippingService: shippingServicesObjects.filter((service: IShippingServiceDetails) => !service.isInternational)[0].name,
                                internationalShippingService: shippingServicesObjects.filter((service: IShippingServiceDetails) => service.isInternational)[0].name,
                                shippingType: this.state.shippingServicesObjects.filter((service: IShippingServiceDetails) => !service.isInternational)[0].types[0]
                            }
                        });
                    }
                });
            })
            .catch(err => this.alertError(err));
    }

    isShippingServiceSelectedValid(): boolean {
        const shippingServiceNames: string[] = this.state.shippingServicesObjects.map(service => service.name);
        const selectedShippingService: string = this.state.form.domesticShippingService;
        return !!selectedShippingService && !!selectedShippingService.length
            && !!~shippingServiceNames.indexOf(selectedShippingService);
    }

    submitItemListing(): void {
        this.setState({ listItemSubmitLoading: true });
        const selectedSite: ISite = this.state.sites.find(site => site.ID === this.state.form.siteID);
        const itemSpecifics: any = {};
        this.state.form.itemSpecifics.forEach(specific => {
            const [key, value] = specific.split(': ');
            itemSpecifics[key] = value;
        });
        const reqBody = {
            ...this.state.form,
            site: selectedSite,
            itemSpecifics,
            returnPolicySupport: this.state.returnPolicySupport,
            returnsAccepted: this.state.form.returnsAccepted ? eBayConstantData.returnsAcceptedOptions.RETURNS_ACCEPTED : eBayConstantData.returnsAcceptedOptions.RETURNS_NOT_ACCEPTED
        };
        axios.post('/api/add-item', reqBody)
            .then(response => {
                this.setState({ listItemSubmitLoading: false });
                const { errors, totalFee, itemID } = response.data;
                if (errors) return this.alertError(errors);
                this.snackbarSuccess(itemID, totalFee);
                this.redirectAfterItemListing(itemID);

            })
            .catch(err => alert(err));
    }

    alertError(err: string | string[]): void {
        const errorToDisplay: string = typeof err === 'string' ? err : err.join('\n');
        alert(errorToDisplay);
    }

    snackbarSuccess(itemID: string, totalFee: IItemTotalFee): void {
        this.setState({
            snackbarOpen: true,
            snackbarMessage: `Your item has been listed. Total fee is ${totalFee.value}${totalFee.currency}. Redirecting you...`
        });
    }

    redirectAfterItemListing(itemID: string) {
        setTimeout(() => {
            const titleFormattedForUrl: string = this.state.form.title.replace(/ /gi, '-');
            window.location.href = `https://www.ebay.com/itm/${titleFormattedForUrl}/${itemID}`;
        }, 5000);
    }

    handleSnackbarClose(): void {
        this.setState({
            snackbarOpen: false,
            snackbarMessage: ''
        });
    };

    getTokenFromLocalStorage(): void {
        const selectedAccKey: string = 'selectedAccount';
        const username: string = localStorage.getItem(selectedAccKey);
        const accountsKey: string = 'eBayListerAccounts';
        const accounts: IAccount[] = JSON.parse(localStorage.getItem(accountsKey)) || [];
        if (!username || !accounts || !accounts.length) return this.props.history.push('/accounts');
        this.setState({ accounts }, () => {
            const selectedAccount: IAccount = this.state.accounts.find(account => account.username === username);
            this.stateFormInputValueChange('APIAuthToken', selectedAccount.token);
        });
    }

    async fillInputsWithShrutiProductData(): Promise<any> {
        const paramsStr: string = this.props.location.search.slice(1);
        const paramPairsArray: string[] = paramsStr.split('&');
        const params: any = {};
        paramPairsArray.forEach(paramPair => {
            const [key, encodedValue] = paramPair.split('=');
            const value = decodeURIComponent(encodedValue);
            params[key] = value;
        });
        if (~Object.keys(params).indexOf('pictureURLs')) await this.stateFormInputValueChange('pictureURLs', params.pictureURLs.split(' '));
        if (~Object.keys(params).indexOf('startPrice')) await this.stateFormInputValueChange('startPrice', +params.startPrice);
        if (~Object.keys(params).indexOf('productUrl')) await this.fillMainDetailsFromUrl(params.productUrl);
        return;
    }

    fillMainDetailsFromUrl(productUrl: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.setState({ gettingDataFromShruti: true }, () => {
                axios.get(productUrl)
                    .then(response => {
                        const { data } = response;
                        const parser = new DOMParser();
                        const productHTML: any = parser.parseFromString(data, 'text/html');
                        const titleWithUPC: string = productHTML.querySelector('#ContentPlaceHolder1_ProductName').innerText;
                        const mainKeywords: string = productHTML.querySelectorAll('.BrdcmbClk')[2].innerText.trim();
                        const subKeywords: string = productHTML.querySelectorAll('.BrdcmbClk')[1].innerText.trim();
                        const dataFromShruti: IForm = {
                            title: this.getTitleWithoutUPC(titleWithUPC),
                            keywords: 'India Cultural Ethnic Clothing'.split(' '),
                            siteID: '0',
                            country: 'IN',
                            postalCode: '400002',
                            currency: 'USD',
                            description: htmlBeautify(productHTML.querySelector('#ContentPlaceHolder1_ProductDescription').outerHTML),
                            brand: productHTML.querySelector('#ContentPlaceHolder1_BrandName').innerText,
                            UPC: productHTML.querySelector('#ContentPlaceHolder1_ProductCode').innerText
                        } as any;
                        this.setState({
                            gettingDataFromShruti: false,
                            form: {
                                ...this.state.form,
                                ...dataFromShruti
                            }
                        }, () => resolve());
                    })
                    .catch(() => reject(this.alertError('Could not get data from Shruti product page')));
            });
        });
    }

    getTitleWithoutUPC(titleWithUPC: string): string {
        let indexWhereUPCEnds: number = 0;
        for (let i = 0; i < titleWithUPC.length; i++) {
            if (isNaN(+titleWithUPC[i]) && titleWithUPC[i] !== ' ') {
                indexWhereUPCEnds = i;
                break;
            }
        }
        const title: string = titleWithUPC.slice(indexWhereUPCEnds);
        return title;
    }

    INRToUSD(INRRate: number, USDRate: number, INRAmount: number): number {
        const EURAmount: number = INRAmount / INRRate;
        const USDAmount: number = EURAmount * USDRate;
        return USDAmount;
    }

    fillUserSpecificEmail(): void {
        const selectedAccount: IAccount = this.state.accounts.find(account => account.token === this.state.form.APIAuthToken);
        if (selectedAccount.username === 'asvpublic')
            this.stateFormInputValueChange('paypalEmail', 'avaswani@yahoo.com');
        else if (selectedAccount.username === 'chessustore')
            this.stateFormInputValueChange('paypalEmail', 'asvpublic@yahoo.com');
    }

    shouldDisableButton(): boolean {
        if (this.state.form.title.length > 80) {
            return true;
        }
        const shouldNotBeChecked: string[] = ['description', 'keywords', 'currentKeyword', 'paypalEmail',
            'currentPictureURL', 'quantity', 'returnsAccepted', 'refund', 'returnPolicyDescription',
            'returnsWithin', 'shippingCostPaidBy', 'shippingServicePriority', 'shippingServiceCost',
            'brand', 'UPC', 'currentSpecific', 'internationalShippingService', 'itemSpecifics',
            'supportsInternationalShipping'];
        const params = Object.keys(this.state.form);
        for (let i = 0; i < params.length; i++) {
            const param: string = params[i];
            const paramValue: any = this.state.form[param];
            const requiredFieldIsEmpty: boolean = (this.inputValueShouldBeNumber(param) && isNaN(this.state.form[param])) ||
                (!this.inputValueShouldBeNumber(param) && (!this.state.form[param] || !this.state.form[param].length));
            if (~shouldNotBeChecked.indexOf(param)) continue;
            else if (requiredFieldIsEmpty) return true;
        }
        return false;
    }

    getDispatchTimeMaxOptions(): void {
        this.setState({ dispatchTimeMaxOptions: undefined });
        const selectedSite: ISite = this.state.sites.find(site => site.ID === this.state.form.siteID);
        const reqBody = { site: selectedSite };
        axios.post('/api/dispatch-time-max', reqBody)
            .then(response => {
                const dispatchTimeMaxOptions = response.data;
                this.setState({ dispatchTimeMaxOptions }, () => {
                    if (!this.isDispatchTimeMaxSelectedValid()) {
                        this.stateFormInputValueChange('dispatchTimeMax', this.state.dispatchTimeMaxOptions[0].value);
                    }
                });
            })
            .catch(err => this.alertError(err));
    }

    isDispatchTimeMaxSelectedValid(): boolean {
        const dispatchTimeMaxValues: string[] = this.state.dispatchTimeMaxOptions.map(option => option.value);
        const selectedDispatchTimeMax: string = this.state.form.dispatchTimeMax;
        return !!selectedDispatchTimeMax && !!selectedDispatchTimeMax.length
            && !!~dispatchTimeMaxValues.indexOf(selectedDispatchTimeMax);
    }
}
