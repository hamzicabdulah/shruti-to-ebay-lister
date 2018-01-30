import * as dotenv from 'dotenv';
import * as request from 'request-promise';
import { Options } from 'request';
import { parseString as convertToJS } from 'xml2js';
dotenv.config({
    path: __dirname + '/../../.env'
});
import { eBayConstantData } from '../../eBayConstantData';
import { ISite, ICountry, IShippingServiceDetails, ICategory, IAddedItem, IItem, IItemTotalFee, IReturnPolicy } from '../../interfaces';

export class EBay {
    APIUrl: string = 'https://api.ebay.com/ws/api.dll';
    APICompatibility: number = eBayConstantData.APICompatibility;
    APICallNames = eBayConstantData.APICallNames;
    APIAppName: string = process.env.EBAY_APP_NAME;
    APIDevName: string = process.env.EBAY_DEV_NAME;
    APICertName: string = process.env.EBAY_CERT_NAME;
    APIRuName: string = process.env.EBAY_RU_NAME;
    XMLDefaultRoot: string = eBayConstantData.XMLReqBody.defaultRoot;
    XMLNSDefaultAttribute: string = eBayConstantData.XMLReqBody.XMLNSDefaultAttribute;
    commonXMLElements: string = eBayConstantData.XMLReqBody.commonElements;
    detailNames = eBayConstantData.detailNames;
    returnsAcceptedOptions = eBayConstantData.returnsAcceptedOptions;
    featureIDs = eBayConstantData.featureIDs;

    constructor(private APIAuthToken: string, private site: ISite = { name: 'US', ID: '0' }) {
        this.commonXMLElements += `
            <RequesterCredentials>
                <eBayAuthToken>${this.APIAuthToken}</eBayAuthToken>
            </RequesterCredentials>
        `;
    }

    getCountries(): Promise<ICountry[]> {
        return new Promise((resolve, reject) => {
            this.getEBayDetails(this.detailNames.COUNTRY_DETAILS)
                .then(GeteBayDetailsResponse => {
                    const { CountryDetails } = GeteBayDetailsResponse;
                    const countries: ICountry[] = CountryDetails.map(country => {
                        return {
                            code: country.Country[0],
                            name: country.Description[0]
                        };
                    });
                    resolve(countries);
                })
                .catch(err => reject(err));
        });
    }

    getEBayDetails(detailName): Promise<any> {
        return new Promise((resolve, reject) => {
            const XMLReqBody: string = this.getEBayDetailsXMLReqBody(detailName);
            const callName: string = this.APICallNames.GET_EBAY_DETAILS;
            this.HTTPPostRequestToEBayAPI(callName, XMLReqBody)
                .then(JSONResBody => {
                    const { GeteBayDetailsResponse } = JSONResBody;
                    const { Errors } = GeteBayDetailsResponse;
                    if (Errors && Errors.length) {
                        const errors: string[] = Errors.map(error => error.LongMessage[0]);
                        return reject(errors);
                    }
                    resolve(GeteBayDetailsResponse);
                })
                .catch(err => reject(err));
        });
    }

    private getEBayDetailsXMLReqBody(detailName: string): string {
        const XMLReqBody: string = `
            ${this.XMLDefaultRoot}
            <GeteBayDetailsRequest xmlns="${this.XMLNSDefaultAttribute}">
                ${this.commonXMLElements}
                <DetailName>${detailName}</DetailName>
            </GeteBayDetailsRequest>
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
                    'X-EBAY-API-SITEID': this.site.ID,
                    'X-EBAY-API-COMPATIBILITY-LEVEL': this.APICompatibility,
                    'X-EBAY-API-CALL-NAME': callName,
                    ...additionalReqHeaders
                },
                body: XMLReqBody
            };
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

    getSites(): Promise<ISite[]> {
        return new Promise((resolve, reject) => {
            this.getEBayDetails(this.detailNames.SITE_DETAILS)
                .then(GeteBayDetailsResponse => {
                    const { SiteDetails } = GeteBayDetailsResponse;
                    const sites: ISite[] = SiteDetails.map(site => {
                        return {
                            name: site.Site[0],
                            ID: site.SiteID[0]
                        };
                    });
                    resolve(sites);
                })
                .catch(err => reject(err));
        });
    }

    getCurrencies(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            this.getEBayDetails(this.detailNames.CURRENCY_DETAILS)
                .then(GeteBayDetailsResponse => {
                    const { CurrencyDetails } = GeteBayDetailsResponse;
                    const currencies: string[] = CurrencyDetails.map(currency => currency.Currency[0]);
                    resolve(currencies);
                })
                .catch(err => reject(err));
        });
    }

    getDomesticShippingServices(): Promise<IShippingServiceDetails[]> {
        return new Promise((resolve, reject) => {
            this.getShippingServices()
                .then(shippingServices => resolve(shippingServices.filter(service => !service.isInternational)))
                .catch(err => reject(err));
        });
    }

    getShippingServices(): Promise<IShippingServiceDetails[]> {
        return new Promise((resolve, reject) => {
            this.getEBayDetails(this.detailNames.SHIPPING_SERVICE_DETAILS)
                .then(GeteBayDetailsResponse => {
                    const { ShippingServiceDetails } = GeteBayDetailsResponse;
                    const shippingServices: IShippingServiceDetails[] = ShippingServiceDetails.map(service => {
                        const shippingService: IShippingServiceDetails = {
                            name: service.ShippingService[0],
                            types: service.ServiceType,
                            isInternational: service.InternationalService ? true : false
                        };
                        return shippingService;
                    });
                    resolve(shippingServices);
                })
                .catch(err => reject(err));
        });
    }

    getSuggestedCategoriesForItem(itemKeywords: string[]): Promise<ICategory[]> {
        return new Promise((resolve, reject) => {
            this.getCategories()
                .then(allCategories => {
                    const suggestedCategories = allCategories.filter(category => {
                        for (let i = 0; i < itemKeywords.length; i++) {
                            if (~category.name.toLowerCase().indexOf(itemKeywords[i].toLowerCase())) {
                                return true;
                            }
                        }
                        return false;
                    });
                    resolve(suggestedCategories);
                })
                .catch(err => reject(err));
        });
    }

    getCategories(): Promise<ICategory[]> {
        return new Promise((resolve, reject) => {
            const XMLReqBody: string = this.getCategoriesXMLReqBody();
            const callName: string = this.APICallNames.GET_CATEGORIES;
            this.HTTPPostRequestToEBayAPI(callName, XMLReqBody)
                .then(JSONResBody => {
                    const { Errors, CategoryArray } = JSONResBody.GetCategoriesResponse;
                    if (Errors && Errors.length) {
                        const errors: string[] = Errors.map(error => error.LongMessage[0]);
                        return reject(errors);
                    }
                    const categories: ICategory[] = CategoryArray[0].Category.map(category => {
                        return {
                            name: category.CategoryName[0],
                            ID: category.CategoryID[0]
                        };
                    });
                    resolve(categories);
                })
                .catch(err => reject(err));
        });
    }

    private getCategoriesXMLReqBody(): string {
        const XMLReqBody: string = `
            ${this.XMLDefaultRoot}
            <GetCategoriesRequest xmlns="${this.XMLNSDefaultAttribute}">
                <CategorySiteID>${this.site.ID}</CategorySiteID>
                ${this.commonXMLElements}
                <DetailLevel>ReturnAll</DetailLevel>
                <ViewAllNodes>true</ViewAllNodes>
            </GetCategoriesRequest>
        `;
        return XMLReqBody;
    }

    addItem(params: IItem): Promise<IAddedItem> {
        return new Promise((resolve, reject) => {
            const XMLReqBody: string = this.getAddItemXMLReqBody(params);
            const callName: string = this.APICallNames.ADD_ITEM;
            this.HTTPPostRequestToEBayAPI(callName, XMLReqBody)
                .then(JSONResBody => {
                    const { Errors, ItemID, StartTime, EndTime, Fees } = JSONResBody.AddItemResponse;
                    if (Errors && Errors.length) {
                        const errors: string[] = Errors.map(error => error.LongMessage[0]);
                        return reject(errors);
                    }
                    const totalFee: IItemTotalFee = {
                        currency: Fees[0].Fee[0].$.currencyID,
                        value: Fees[0].Fee.reduce((acc, fee) => acc + fee.Fee, 0)
                    };
                    resolve({
                        totalFee,
                        itemID: ItemID,
                        startTime: StartTime,
                        endTime: EndTime
                    });
                })
                .catch(err => reject(err));
        });
    }

    private getAddItemXMLReqBody(params: IItem): string {
        const returnPolicyOptions: string = params.returnsAccepted === this.returnsAcceptedOptions.RETURNS_ACCEPTED ? `
            <RefundOption>${params.refund}</RefundOption>
            <ReturnsWithinOption>${params.returnsWithin}</ReturnsWithinOption>
            <Description>${params.returnPolicyDescription}</Description>
            <ShippingCostPaidByOption>${params.shippingCostPaidBy}</ShippingCostPaidByOption>
        ` : '';
        const XMLReqBody: string = `
            <?xml version='1.0' encoding='utf-8'?>
            <AddItemRequest xmlns='urn:ebay:apis:eBLBaseComponents'>
                ${this.commonXMLElements}
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
                    <ConditionID>1000</ConditionID>
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
                    <Quantity>${params.quantity || 1}</Quantity>
                    <ReturnPolicy>
                        <ReturnsAcceptedOption>${params.returnsAccepted}</ReturnsAcceptedOption>
                        ${returnPolicyOptions}
                    </ReturnPolicy>
                    <ShippingDetails>
                        <ShippingType>${params.shippingType}</ShippingType>
                        <ShippingServiceOptions>
                            <ShippingServicePriority>${params.shippingServicePriority}</ShippingServicePriority>
                            <ShippingService>${params.shippingService}</ShippingService>
                            <ShippingServiceCost>${params.shippingServiceCost}</ShippingServiceCost>
                        </ShippingServiceOptions>
                    </ShippingDetails>
                    <Site>${this.site.name}</Site>
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
                .then(JSONResBody => {
                    const { Errors, SessionID } = JSONResBody.GetSessionIDResponse
                    if (Errors && Errors.length) {
                        const errors: string[] = Errors.map(error => error.LongMessage[0]);
                        return reject(errors);
                    }
                    resolve({ SessionID });
                })
                .catch(err => reject(err));
        });
    }

    private getSessionIDXMLReqBody(): string {
        const XMLReqBody: string = `
            ${this.XMLDefaultRoot}
            <GetSessionIDRequest xmlns="${this.XMLNSDefaultAttribute}">
                ${this.commonXMLElements}
                <RuName>${this.APIRuName}</RuName>
            </GetSessionIDRequest>
        `;
        return XMLReqBody;
    }

    getPaymentMethods(categoryID: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getCategoryFeatures(categoryID, this.featureIDs.PAYMENT_METHODS)
                .then(GetCategoryFeaturesResponse => {
                    const { PaymentMethod } = GetCategoryFeaturesResponse.SiteDefaults[0];
                    resolve(PaymentMethod);
                })
                .catch(err => reject(err));
        });
    }

    getCategoryFeatures(categoryID: string, featureID: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const XMLReqBody: string = this.getCategoryFeaturesXMLReqBody(categoryID, featureID);
            const callName: string = this.APICallNames.GET_CATEGORY_FEATURES;
            this.HTTPPostRequestToEBayAPI(callName, XMLReqBody)
                .then(JSONResBody => {
                    const { GetCategoryFeaturesResponse } = JSONResBody;
                    const { Errors } = GetCategoryFeaturesResponse;
                    if (Errors && Errors.length) {
                        const errors: string[] = Errors.map(error => error.LongMessage[0]);
                        return reject(errors);
                    }
                    resolve(GetCategoryFeaturesResponse);
                })
                .catch(err => reject(err));
        });
    }

    private getCategoryFeaturesXMLReqBody(categoryID: string, featureID: string): string {
        const XMLReqBody: string = `
            ${this.XMLDefaultRoot}
            <GetCategoryFeaturesRequest xmlns="${this.XMLNSDefaultAttribute}">
                ${this.commonXMLElements}
                <CategoryID>${categoryID}</CategoryID>
                <DetailLevel>ReturnAll</DetailLevel>
                <FeatureID>${featureID}</FeatureID>
            </GetCategoryFeaturesRequest>
        `;
        return XMLReqBody;
    }

    getReturnPolicyDetails(): Promise<IReturnPolicy> {
        return new Promise((resolve, reject) => {
            this.getEBayDetails(this.detailNames.RETURN_POLICY_DETAILS)
                .then(GeteBayDetailsResponse => {
                    const { ReturnPolicyDetails } = GeteBayDetailsResponse;
                    const { Refund, ReturnsWithin } = ReturnPolicyDetails[0];
                    const returnPolicy: IReturnPolicy = {} as any;
                    returnPolicy.refundOptions = Refund.map(refund => {
                        return {
                            name: refund.RefundOption[0],
                            description: refund.Description[0]
                        };
                    })
                    returnPolicy.returnsWithinOptions = ReturnsWithin.map(option => {
                        return {
                            name: option.ReturnsWithinOption[0],
                            description: option.Description[0]
                        };
                    });
                    resolve(returnPolicy);
                })
                .catch(err => reject(err));
        });
    }
}