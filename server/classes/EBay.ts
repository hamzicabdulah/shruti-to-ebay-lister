import * as dotenv from 'dotenv';
import * as request from 'request-promise';
import { Options } from 'request';
import { parseString as convertToJS } from 'xml2js';
dotenv.config({
    path: __dirname + '/../../.env'
});

interface IItem {
    title: string;
    description: string;
    categoryID: number;
    startPrice: number;
    country: string;
    currency: string;
    conditionID: number;
    dispatchTimeMax: number;
    listingDuration: string;
    listingType: string;
    paymentMethods: string[];
    paypalEmail: string;
    pictureURLs: string[];
    postalCode: string;
    quantity: number;
    returnsAccepted: string;
    refund: string;
    returnPolicyDescription: string;
    returnsWithin: string;
    shippingCostPaidBy: string;
    shippingType: string;
    shippingServicePriority: number;
    domesticShippingService: string;
    shippingServiceCost: number;
    site: string;
}

interface IItemTotalFee {
    currency: string;
    value: number;
}

export class EBay {
    APIUrl: string = 'https://api.ebay.com/ws/api.dll';
    APIAuthToken: string = process.env.EBAY_AUTH_TOKEN;
    USSiteID: number = 0;
    APICompatibility: number = 967;
    APICallNames = {
        GET_CATEGORIES: 'GetCategories',
        ADD_ITEM: 'AddItem',
        GET_SESSION_ID: 'GetSessionID',
    };
    APIAppName: string = process.env.EBAY_APP_NAME;
    APIDevName: string = process.env.EBAY_DEV_NAME;
    APICertName: string = process.env.EBAY_CERT_NAME;
    APIRuName: string = process.env.EBAY_RU_NAME;

    constructor() { }

    getCategories() {
        const XMLReqBody: string = this.getCategoriesXMLReqBody();
        const callName: string = this.APICallNames.GET_CATEGORIES;
        this.HTTPPostRequestToEBayAPI(callName, XMLReqBody)
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }

    private getCategoriesXMLReqBody(): string {
        const XMLReqBody: string = `
            <?xml version="1.0" encoding="utf-8"?>
            <GetCategoriesRequest xmlns="urn:ebay:apis:eBLBaseComponents">
                <RequesterCredentials>
                    <eBayAuthToken>${this.APIAuthToken}</eBayAuthToken>
                </RequesterCredentials>
                <CategorySiteID>${this.USSiteID}</CategorySiteID>
                <ErrorLanguage>en_US</ErrorLanguage>
                <WarningLevel>High</WarningLevel>
                <DetailLevel>ReturnAll</DetailLevel>
                <ViewAllNodes>true</ViewAllNodes>
            </GetCategoriesRequest>
        `;
        return XMLReqBody;
    }

    private HTTPPostRequestToEBayAPI(callName: string, XMLReqBody: string, additionalReqHeaders: any = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            const reqOptions: Options = {
                url: this.APIUrl,
                method: 'POST',
                headers: {
                    'content-type': 'application/xml',
                    'X-EBAY-API-SITEID': this.USSiteID,
                    'X-EBAY-API-COMPATIBILITY-LEVEL': this.APICompatibility,
                    'X-EBAY-API-CALL-NAME': callName,
                    ...additionalReqHeaders
                },
                body: XMLReqBody
            };
            console.log(reqOptions.headers);
            console.log(reqOptions.body);
            request(reqOptions)
                .then((XMLResBody: XMLDocument) => {
                    convertToJS(XMLResBody, (err, JSONResBody) => {
                        if (err) return reject(err);
                        resolve(JSONResBody);
                    });
                })
                .catch((err: Error) => reject(err));
        });
    }

    addItem(params: IItem): Promise<any> {
        return new Promise((resolve, reject) => {
            const XMLReqBody: string = this.getAddItemXMLReqBody(params);
            const callName: string = this.APICallNames.ADD_ITEM;
            this.HTTPPostRequestToEBayAPI(callName, XMLReqBody)
                .then((JSONResBody) => {
                    const { Errors, ItemID, StartTime, EndTime, Fees } = JSONResBody.AddItemResponse;
                    const errors: string[] = Errors.map(error => error.LongMessage[0]);
                    if (Errors && Errors.length) return reject({ errors });
                    const totalFee: IItemTotalFee = {
                        currency: Fees.Fee.Fee.$.currencyID,
                        value: Object.keys(Fees).reduce((acc, key) => acc + Fees[key].Fee, 0)
                    };
                    resolve({
                        totalFee,
                        itemID: ItemID,
                        startTime: StartTime,
                        endTime: EndTime
                    });
                })
                .catch(err => reject({ errors: [err] }));
        });
    }

    private getAddItemXMLReqBody(params: IItem): string {
        const XMLReqBody: string = `
            <?xml version='1.0' encoding='utf-8'?>
            <AddItemRequest xmlns='urn:ebay:apis:eBLBaseComponents'>
                <RequesterCredentials>
                    <eBayAuthToken>${this.APIAuthToken}</eBayAuthToken>
                </RequesterCredentials>
                <ErrorLanguage>en_US</ErrorLanguage>
                <WarningLevel>High</WarningLevel>
                <Item>
                    <Title>${params.title}</Title>
                    <Description>${params.description}</Description>
                    <PrimaryCategory>
                        <CategoryID>${params.categoryID}</CategoryID>
                    </PrimaryCategory>
                    <StartPrice>${params.startPrice}</StartPrice>
                    <CategoryMappingAllowed>true</CategoryMappingAllowed>
                    <Country>${params.country}</Country>
                    <Currency>${params.currency}</Currency>
                    <ConditionID>${params.conditionID}</ConditionID>
                    <DispatchTimeMax>${params.dispatchTimeMax}</DispatchTimeMax>
                    <ListingDuration>${params.listingDuration}</ListingDuration>
                    <ListingType>${params.listingType}</ListingType>
                    ${params.paymentMethods.map(method => '<PaymentMethods>' + method + '</PaymentMethods>').join(' ')}
                    <PayPalEmailAddress>${params.paypalEmail}</PayPalEmailAddress>
                    <PictureDetails>
                        <GalleryType>Gallery</GalleryType>
                        <GalleryURL>${params.pictureURLs[0]}</GalleryURL>
                        ${params.pictureURLs.map(picture => '<PictureURL>' + picture + '</PictureURL>').join(' ')}
                    </PictureDetails>
                    <PostalCode>${params.postalCode}</PostalCode>
                    <Quantity>${params.quantity}</Quantity>
                    <ReturnPolicy>
                        <ReturnsAcceptedOption>${params.returnsAccepted}</ReturnsAcceptedOption>
                        <RefundOption>${params.refund}</RefundOption>
                        <ReturnsWithinOption>${params.returnsWithin}</ReturnsWithinOption>
                        <Description>${params.returnPolicyDescription}</Description>
                        <ShippingCostPaidByOption>${params.shippingCostPaidBy}</ShippingCostPaidByOption>
                    </ReturnPolicy>
                    <ShippingDetails>
                        <ShippingType>${params.shippingType}</ShippingType>
                        <ShippingServiceOptions>
                            <ShippingServicePriority>${params.shippingServicePriority}</ShippingServicePriority>
                            <ShippingService>${params.domesticShippingService}</ShippingService>
                            <ShippingServiceCost>${params.shippingServiceCost}</ShippingServiceCost>
                        </ShippingServiceOptions>
                    </ShippingDetails>
                    <Site>${params.site}</Site>
                </Item>
            </AddItemRequest>
        `;
        return XMLReqBody;
    }

    getSessionID(): Promise<any> {
        return new Promise((resolve, reject) => {
            const XMLReqBody: string = this.getSessionIDXMLReqBody();
            const callName: string = this.APICallNames.GET_SESSION_ID;
            const additionalReqHeaders = {
                'X-EBAY-API-APP-NAME': this.APIAppName,
                'X-EBAY-API-DEV-NAME': this.APIDevName,
                'X-EBAY-API-CERT-NAME': this.APICertName
            };
            this.HTTPPostRequestToEBayAPI(callName, XMLReqBody, additionalReqHeaders)
                .then((JSONResBody) => {
                    const { Errors, SessionID } = JSONResBody.GetSessionIDResponse
                    const errors: string[] = Errors.map(error => error.LongMessage[0]);
                    if (Errors && Errors.length) return reject({ errors });
                    resolve({ SessionID });
                })
                .catch(err => reject({ errors: [err] }));
        });
    }

    private getSessionIDXMLReqBody() {
        const XMLReqBody: string = `
            <?xml version="1.0" encoding="utf-8"?>
            <GetSessionIDRequest xmlns="urn:ebay:apis:eBLBaseComponents">
            <RequesterCredentials>
                <eBayAuthToken>${this.APIAuthToken}</eBayAuthToken>
            </RequesterCredentials>
            <ErrorLanguage>en_US</ErrorLanguage>
            <WarningLevel>High</WarningLevel>
            <RuName>${this.APIRuName}</RuName>
            </GetSessionIDRequest>
        `;
        return XMLReqBody;
    }
}