import * as React from 'react';
import { Component, FormEvent, KeyboardEvent } from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';
import axios from 'axios';
import { html as htmlBeautify } from 'js-beautify';
import { ISite, ICategory, ICountry, IReturnPolicyDetail, IShippingServiceDetails, IDispatchTimeMaxDetails, IItemTotalFee, IHomePageState, IForm, IAccount } from '../../../../interfaces';
import { eBayConstantData } from '../../../../eBayConstantData';
import { homeInitialState } from './homeInitialState';
import { PageLoader } from './childComponents/PageLoader';
import { AccountSelectField } from './childComponents/AccountSelectField';
import { SiteSelectField } from './childComponents/SiteSelectField';
import { TitleTextField } from './childComponents/TitleTextField';
import { DescriptionTextField } from './childComponents/DescriptionTextField';
import { DescriptionPreview } from './childComponents/DescriptionPreview';
import { BrandTextField } from './childComponents/BrandTextField';
import { UPCTextField } from './childComponents/UPCTextField';
import { CurrentKeywordTextField } from './childComponents/CurrentKeywordTextField';
import { KeywordsChips } from './childComponents/KeywordsChips';
import { CategorySelectField } from './childComponents/CategorySelectField';
import { CountrySelectField } from './childComponents/CountrySelectField';
import { PostalCodeTextField } from './childComponents/PostalCodeTextField';
import { StartPriceTextField } from './childComponents/StartPriceTextField';
import { CurrencySelectField } from './childComponents/CurrencySelectField';
import { DispatchTimeMaxTextField } from './childComponents/DispatchTimeMaxSelectField';
import { ListingDurationSelectField } from './childComponents/ListingDurationSelectField';
import { ListingTypeSelectField } from './childComponents/ListingTypeSelectField';
import { PaymentMethodsSelectField } from './childComponents/PaymentMethodsSelectField';
import { PayPalEmailTextField } from './childComponents/PayPalEmailTextField';
import { PictureUrlTextField } from './childComponents/PictureUrlTextField';
import { AddedPictures } from './childComponents/AddedPictures';
import { QuantityTextField } from './childComponents/QuantityTextField';
import { ReturnsAcceptedToggleField } from './childComponents/ReturnsAcceptedToggleField';
import { RefundSelectField } from './childComponents/RefundSelectField';
import { ReturnPolicyDescriptionTextField } from './childComponents/ReturnPolicyDescriptionTextField';
import { ReturnsWithinSelectField } from './childComponents/ReturnsWithinSelectField';
import { ShippingCostPaidBySelectField } from './childComponents/ShippingCostPaidBySelectField';
import { ShippingServicePriorityTextField } from './childComponents/ShippingServicePriorityTextField';
import { ShippingServiceCostTextField } from './childComponents/ShippingServiceCostTextField';
import { ShippingServiceSelectField } from './childComponents/ShippingServiceSelectField';
import { ShippingTypeSelectField } from './childComponents/ShippingTypeSelectField';
import { InternationalShippingToggleField } from './childComponents/InternationalShippingToggleField';
import { ItemSpecificsChips } from './childComponents/ItemSpecificsChips';
import { CurrentSpecificTextField } from './childComponents/CurrentSpecificTextField';
import { AddListingButton } from './childComponents/AddListingButton';

export class HomePage extends Component<any, IHomePageState> {
    constructor(props: any) {
        super(props);
        this.state = homeInitialState;
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
                        <PageLoader /> :
                        <div className='form'>
                            <AccountSelectField
                                token={this.state.form.APIAuthToken}
                                handleSelectChange={this.handleSelectChange.bind(this, 'APIAuthToken')}
                                accounts={this.state.accounts}
                            />
                            <SiteSelectField
                                siteID={this.state.form.siteID}
                                handleSelectChange={this.handleSelectChange.bind(this, 'siteID')}
                                categories={this.state.categories}
                                sites={this.state.sites}
                            />
                            <TitleTextField
                                title={this.state.form.title}
                                handleInputChange={this.handleInputChange}
                            />
                            <DescriptionTextField
                                description={this.state.form.description}
                                handleInputChange={this.handleInputChange}
                            />
                            {
                                typeof !!~this.state.form.description.length && !!~this.state.form.description.indexOf('</') &&
                                <DescriptionPreview description={this.state.form.description} />
                            }
                            <BrandTextField
                                brand={this.state.form.brand}
                                handleInputChange={this.handleInputChange}
                            />
                            <UPCTextField
                                UPC={this.state.form.UPC}
                                handleInputChange={this.handleInputChange}
                            />
                            <CurrentKeywordTextField
                                keyword={this.state.form.currentKeyword}
                                handleInputChange={this.handleInputChange}
                                addKeyword={this.addKeyword}
                                categories={this.state.categories}
                            />
                            <KeywordsChips
                                keywords={this.state.form.keywords}
                                categories={this.state.categories}
                                removeKeyword={this.removeKeyword}
                            />
                            <CategorySelectField
                                categories={this.state.categories}
                                categoryID={this.state.form.categoryID}
                                handleSelectChange={this.handleSelectChange.bind(this, 'categoryID')}
                            />
                            <CountrySelectField
                                countries={this.state.countries}
                                country={this.state.form.country}
                                handleSelectChange={this.handleSelectChange.bind(this, 'country')}
                            />
                            <PostalCodeTextField
                                postalCode={this.state.form.postalCode}
                                handleInputChange={this.handleInputChange}
                            />
                            <StartPriceTextField
                                startPrice={this.state.form.startPrice}
                                handleInputChange={this.handleInputChange}
                            />
                            <CurrencySelectField
                                currencies={this.state.currencies}
                                currency={this.state.form.currency}
                                handleSelectChange={this.handleSelectChange.bind(this, 'currency')}
                            />
                            <DispatchTimeMaxTextField
                                dispatchTimeMax={this.state.form.dispatchTimeMax}
                                dispatchTimeMaxOptions={this.state.dispatchTimeMaxOptions}
                                handleSelectChange={this.handleSelectChange.bind(this, 'dispatchTimeMax')}
                            />
                            <ListingDurationSelectField
                                listingType={this.state.form.listingType}
                                listingDuration={this.state.form.listingDuration}
                                handleSelectChange={this.handleSelectChange.bind(this, 'listingDuration')}
                            />
                            <ListingTypeSelectField
                                listingType={this.state.form.listingType}
                                handleSelectChange={this.handleSelectChange.bind(this, 'listingType')}
                            />
                            <PaymentMethodsSelectField
                                paymentMethods={this.state.paymentMethods}
                                selectedPaymentMethods={this.state.form.paymentMethods}
                                handleSelectChange={this.handleSelectChange.bind(this, 'paymentMethods')}
                            />
                            {
                                !!~this.state.form.paymentMethods.indexOf('PayPal') &&
                                <PayPalEmailTextField
                                    handleInputChange={this.handleInputChange}
                                    paypalEmail={this.state.form.paypalEmail}
                                />
                            }
                            <PictureUrlTextField
                                currentPictureURL={this.state.form.currentPictureURL}
                                addPictureURL={this.addPictureURL}
                                handleInputChange={this.handleInputChange}
                            />
                            <AddedPictures
                                pictureURLs={this.state.form.pictureURLs}
                                removePictureURL={this.removePictureURL}
                            />
                            <QuantityTextField
                                quantity={this.state.form.quantity}
                                handleInputChange={this.handleInputChange}
                            />
                            {
                                this.state.returnPolicySupport &&
                                <ReturnsAcceptedToggleField
                                    returnsAccepted={this.state.form.returnsAccepted}
                                    handleInputChange={this.handleInputChange}
                                />
                            }
                            {
                                this.state.form.returnsAccepted &&
                                <div>
                                    <RefundSelectField
                                        refundOptions={this.state.refundOptions}
                                        refund={this.state.form.refund}
                                        handleSelectChange={this.handleSelectChange.bind(this, 'refund')}
                                    />
                                    <ReturnPolicyDescriptionTextField
                                        returnPolicyDescription={this.state.form.returnPolicyDescription}
                                        handleInputChange={this.handleInputChange}
                                    />
                                    <ReturnsWithinSelectField
                                        returnsWithin={this.state.form.returnsWithin}
                                        returnsWithinOptions={this.state.returnsWithinOptions}
                                        handleSelectChange={this.handleSelectChange.bind(this, 'returnsWithin')}
                                    />
                                    <ShippingCostPaidBySelectField
                                        shippingCostPaidBy={this.state.form.shippingCostPaidBy}
                                        handleSelectChange={this.handleSelectChange.bind(this, 'shippingCostPaidBy')}
                                    />
                                </div>
                            }
                            <ShippingServicePriorityTextField
                                shippingServicePriority={this.state.form.shippingServicePriority}
                                handleInputChange={this.handleInputChange}
                            />
                            <ShippingServiceCostTextField
                                shippingServiceCost={this.state.form.shippingServiceCost}
                                currency={this.state.form.currency}
                                handleInputChange={this.handleInputChange}
                            />
                            <ShippingServiceSelectField
                                shippingServicesObjects={this.state.shippingServicesObjects}
                                shippingService={this.state.form.domesticShippingService}
                                shippingType='Domestic'
                                handleSelectChange={this.handleSelectChange.bind(this, 'domesticShippingService')}
                            />
                            {
                                this.domesticShippingServicesAvailable() &&
                                <ShippingTypeSelectField
                                    shippingType={this.state.form.shippingType}
                                    shippingServicesObjects={this.state.shippingServicesObjects}
                                    domesticShippingService={this.state.form.domesticShippingService}
                                    handleSelectChange={this.handleSelectChange.bind(this, 'shippingType')}
                                />
                            }
                            <InternationalShippingToggleField
                                supportsInternationalShipping={this.state.form.supportsInternationalShipping}
                                handleInputChange={this.handleInputChange}
                            />
                            {
                                !!this.state.form.supportsInternationalShipping &&
                                <ShippingServiceSelectField
                                    shippingServicesObjects={this.state.shippingServicesObjects}
                                    shippingService={this.state.form.internationalShippingService}
                                    shippingType='International'
                                    handleSelectChange={this.handleSelectChange.bind(this, 'internationalShippingService')}
                                />
                            }
                            <CurrentSpecificTextField
                                currentSpecific={this.state.form.currentSpecific}
                                addSpecific={this.addSpecific}
                                handleInputChange={this.handleInputChange}
                            />
                            <ItemSpecificsChips
                                itemSpecifics={this.state.form.itemSpecifics}
                                removedSpecific={this.removeSpecific}
                            />
                            <AddListingButton
                                submitItemListing={this.submitItemListing}
                                shouldDisableButton={this.shouldDisableButton}
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
        if (!this.state.form.keywords || !this.state.form.keywords.length) return;
        this.setState({ categories: undefined }, () => {
            const selectedSite: ISite = this.state.sites.find(site => site.ID === this.state.form.siteID);
            const reqBody = {
                itemKeywords: this.state.form.keywords,
                site: selectedSite
            };
            axios.post('/api/categories', reqBody)
                .then(response => {
                    const { data } = response;
                    if (data.errors) return this.alertError(data.errors);
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
                if (data.errors) return this.alertError(data.errors);
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
                const { data } = response;
                if (data.errors) return this.alertError(data.errors);
                const { refundOptions, returnsWithinOptions, returnPolicySupport } = data;
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
                const { data } = response;
                if (data.errors) return this.alertError(data.errors);
                const shippingServicesObjects = data;
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
                const { data } = response;
                this.setState({ listItemSubmitLoading: false });
                if (data.errors) return this.alertError(data.errors);
                const { errors, totalFee, itemID } = data;
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
        if (!username || !accounts || !accounts.length) {
            return this.props.history.push('/accounts');
        }
        this.setState({ accounts }, () => {
            console.log(this.state.accounts);
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
        if (selectedAccount) {
            if (selectedAccount.username === 'asvpublic')
                this.stateFormInputValueChange('paypalEmail', 'avaswani@yahoo.com');
            else if (selectedAccount.username === 'chessustore')
                this.stateFormInputValueChange('paypalEmail', 'asvpublic@yahoo.com');
        }
    }

    shouldDisableButton(): boolean {
        if (this.state.form.title.length > 80 || this.state.listItemSubmitLoading) {
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
                const { data } = response;
                if (data.errors) return this.alertError(data.errors);
                const dispatchTimeMaxOptions = data;
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

    domesticShippingServicesAvailable(): boolean {
        return !!this.state.shippingServicesObjects && !!this.state.shippingServicesObjects.length &&
            !!this.state.form.domesticShippingService;
    }
}
