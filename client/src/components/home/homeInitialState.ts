import { IHomePageState } from '../../../../interfaces';
import { eBayConstantData } from '../../../../eBayConstantData';

export const homeInitialState: IHomePageState = {
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