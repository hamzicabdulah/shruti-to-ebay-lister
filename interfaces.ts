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
    shippingService: string;
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