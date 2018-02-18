import { KeyboardEvent, FormEvent } from 'react';

export interface IItem {
    title: string;
    description: string;
    categoryID: string;
    startPrice: number;
    country: string;
    currency: string;
    dispatchTimeMax: string;
    listingDuration: string;
    listingType: string;
    paymentMethods: string[];
    paypalEmail?: string;
    pictureURLs: string[];
    postalCode: string;
    quantity?: number;
    returnPolicySupport: boolean;
    returnsAccepted: string;
    refund?: string;
    returnPolicyDescription?: string;
    returnsWithin?: string;
    shippingCostPaidBy?: string;
    shippingType: string;
    shippingServicePriority: number;
    domesticShippingService: string;
    supportsInternationalShipping: boolean;
    internationalShippingService: string;
    shippingServiceCost: number;
    brand: string;
    UPC: string;
    itemSpecifics: any;
}

export interface IItemTotalFee {
    currency: string;
    value: number;
}

export interface IAddedItem {
    totalFee: IItemTotalFee;
    itemID: string;
    startTime: Date;
    endTime: Date;
}

export interface ICountry {
    code: string;
    name: string;
}

export interface ISite {
    name: string;
    ID: string;
}

export interface ICategory {
    name: string;
    ID: string;
}

export interface IShippingServiceDetails {
    name: string;
    types: string[];
    isInternational: boolean;
}

export interface IReturnPolicyDetail {
    name: string;
    description: string;
}

export interface IReturnPolicy {
    refundOptions: IReturnPolicyDetail[];
    returnsWithinOptions: IReturnPolicyDetail[];
}

export interface IAuthTokenDetails {
    token: string;
    expirationTime: Date;
}

export interface IDispatchTimeMaxDetails {
    value: string;
    description: string;
}

export interface ILocation {
    name: string;
    description: string;
}

export interface IForm {
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

export interface IHomePageState {
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

export interface IAccountSelectProps {
    token?: string;
    selectedAccount?: string
    handleSelectChange: () => void;
    accounts: IAccount[];
}

export interface ISiteSelectProps {
    siteID: string;
    handleSelectChange: () => void;
    categories: ICategory[];
    sites: ISite[];
}

export interface ITitleTextProps {
    title: string;
    handleInputChange: () => void;
}

export interface IDescriptionTextProps {
    description: string;
    handleInputChange: () => void;
}

export interface IDescriptionPreviewProps {
    description: string;
}

export interface IBrandTextProps {
    brand: string;
    handleInputChange: () => void;
}

export interface IUPCTextProps {
    UPC: string;
    handleInputChange: () => void;
}

export interface ICurrentKeywordTextProps {
    keyword: string;
    addKeyword: (event: KeyboardEvent<any>) => void;
    handleInputChange: () => void;
    categories: ICategory[];
}

export interface IKeywordsChipsProps {
    keywords: string[];
    categories: ICategory[];
    removeKeyword: (index: number) => void;
}

export interface ICategorySelectProps {
    categories: ICategory[];
    categoryID: string;
    handleSelectChange: () => void;
}

export interface ICountrySelectProps {
    countries: ICountry[];
    country: string;
    handleSelectChange: () => void;
}

export interface IPostalCodeTextProps {
    postalCode: string;
    handleInputChange: () => void;
}

export interface IStartPriceTextProps {
    startPrice: number;
    handleInputChange: () => void;
}

export interface ICurrencySelectProps {
    currencies: string[];
    currency: string;
    handleSelectChange: () => void;
}

export interface IDispatchTimeMaxSelectProps {
    dispatchTimeMaxOptions: IDispatchTimeMaxDetails[];
    dispatchTimeMax: string;
    handleSelectChange: () => void;
}

export interface IListingDurationSelectProps {
    listingType: string;
    listingDuration: string;
    handleSelectChange: () => void;
}

export interface IListingTypeSelectProps {
    listingType: string;
    handleSelectChange: () => void;
}

export interface IPaymentMethodsSelectProps {
    selectedPaymentMethods: string[];
    paymentMethods: string[];
    handleSelectChange: () => void;
}

export interface IPayPalEmailTextProps {
    paypalEmail: string;
    handleInputChange: () => void;
}

export interface IPictureUrlTextProps {
    currentPictureURL: string;
    addPictureURL: () => void;
    handleInputChange: () => void;
}

export interface IAddedPicturesProps {
    pictureURLs: string[];
    removePictureURL: (index: number) => void;
}

export interface IQuantityTextProps {
    quantity: number;
    handleInputChange: () => void;
}

export interface IReturnsAcceptedToggleProps {
    returnsAccepted: boolean;
    handleInputChange: () => void;
}

export interface IRefundSelectProps {
    refundOptions: IReturnPolicyDetail[];
    refund: string;
    handleSelectChange: () => void;
}

export interface IReturnPolicyDescriptionTextProps {
    returnPolicyDescription: string;
    handleInputChange: () => void;
}

export interface IReturnsWithinSelectProps {
    returnsWithinOptions: IReturnPolicyDetail[];
    returnsWithin: string;
    handleSelectChange: () => void;
}

export interface IShippingCostPaidBySelectProps {
    shippingCostPaidBy: string;
    handleSelectChange: () => void;
}

export interface IShippingServicePriorityTextProps {
    shippingServicePriority: number;
    handleInputChange: () => void;
}

export interface IShippingServiceCostTextProps {
    shippingServiceCost: number;
    currency: string;
    handleInputChange: () => void;
}

export interface IShippingServiceSelectProps {
    shippingServicesObjects: IShippingServiceDetails[];
    shippingService: string;
    shippingType: string;
    handleSelectChange: () => void;
}

export interface IShippingTypeSelectProps {
    shippingServicesObjects: IShippingServiceDetails[];
    domesticShippingService: string;
    shippingType: string;
    handleSelectChange: () => void;
}

export interface IInternationalShippingToggleProps {
    supportsInternationalShipping: boolean;
    handleInputChange: () => void;
}

export interface IItemSpecificsChipsProps {
    itemSpecifics: string[];
    removeSpecific: (index: number) => void;
}

export interface ICurrentSpecificTextProps {
    currentSpecific: string;
    addSpecific: (event: KeyboardEvent<any>) => void;
    handleInputChange: () => void;
}

export interface IAddListingButtonProps {
    submitItemListing: () => void;
    disabled: boolean;
}

export interface ISuccessPageState {
    token: string;
    username: string;
}

export interface IAccount {
    username: string;
    token: string;
}

export interface IAccountsPageState {
    accounts: IAccount[];
    selectedAccount: string;
    signInUrl: string;
    snackbarOpen: boolean;
}