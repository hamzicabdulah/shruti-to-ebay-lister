export interface IItem {
    title: string;
    description: string;
    categoryID: string;
    startPrice: number;
    country: string;
    currency: string;
    dispatchTimeMax: number;
    listingDuration: string;
    listingType: string;
    paymentMethods: string[];
    paypalEmail: string;
    pictureURLs: string[];
    postalCode: string;
    quantity?: number;
    returnsAccepted: string;
    refund: string;
    returnPolicyDescription: string;
    returnsWithin: string;
    shippingCostPaidBy: string;
    shippingType: string;
    shippingServicePriority: number;
    shippingService: string;
    shippingServiceCost: number;
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