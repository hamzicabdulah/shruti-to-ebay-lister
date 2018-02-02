export const eBayConstantData = {
    APIUrl: 'https://api.ebay.com/ws/api.dll',
    signInUrl: 'https://signin.ebay.com/ws/eBayISAPI.dll?SignIn&',
    ruName: 'Abdulah_Hamzic-AbdulahH-autoli-fbiefal',
    APICallNames: {
        GET_CATEGORIES: 'GetCategories',
        ADD_ITEM: 'AddItem',
        GET_SESSION_ID: 'GetSessionID',
        GET_EBAY_DETAILS: 'GeteBayDetails',
        GET_CATEGORY_FEATURES: 'GetCategoryFeatures',
        FETCH_TOKEN: 'FetchToken'
    },
    featureIDs: {
        PAYMENT_METHODS: 'PaymentMethods'
    },
    listingDurations: ['Days_3', 'Days_5', 'Days_7', 'Days_10'],
    listingTypes: {
        AD_TYPE: 'AdType',
        CHINESE: 'Chinese',
        CUSTOM_CODE: 'CustomCode',
        FIXED_PRICE_ITEM: 'FixedPriceItem',
        LEAD_GENERATION: 'LeadGeneration'
    },
    paymentMethods: [
        'AmEx',
        'CashInPerson',
        'CashOnPickup',
        'CCAccepted',
        'COD',
        'CODPrePayDelivery',
        'CreditCard',
        'CustomCode',
        'Diners',
        'DirectDebit',
        'Discover',
        'ELV',
        'Escrow',
        'IntegratedMerchantCreditCard',
        'LoanCheck',
        'MOCC',
        'MoneyXferAccepted',
        'MoneyXferAcceptedInCheckout',
        'None',
        'Other',
        'OtherOnlinePayments',
        'PaisaPayAccepted',
        'PaisaPayEscrow',
        'PaisaPayEscrowEMI',
        'PaymentSeeDescription',
        'PayOnPickup',
        'PayPal',
        'PayPalCredit',
        'PayUponInvoice',
        'PersonalCheck',
        'PostalTransfer',
        'PrePayDelivery',
        'VisaMC'
    ],
    APICompatibility: 967,
    XMLReqBody: {
        defaultRoot: '<?xml version=\"1.0\" encoding=\"utf-8\"?>',
        XMLNSDefaultAttribute: 'urn:ebay:apis:eBLBaseComponents',
        commonElements: '<ErrorLanguage>en_US</ErrorLanguage><WarningLevel>High</WarningLevel>'
    },
    detailNames: {
        COUNTRY_DETAILS: 'CountryDetails',
        SITE_DETAILS: 'SiteDetails',
        CURRENCY_DETAILS: 'CurrencyDetails',
        SHIPPING_SERVICE_DETAILS: 'ShippingServiceDetails',
        RETURN_POLICY_DETAILS: 'ReturnPolicyDetails'
    },
    returnsAcceptedOptions: {
        RETURNS_ACCEPTED: 'ReturnsAccepted',
        RETURNS_NOT_ACCEPTED: 'ReturnsNotAccepted'
    },
    shippingCostPaidByOptions: {
        BUYER: 'Buyer',
        SELLER: 'Seller'
    },
    refundOptions: {
        MONEY_BACK: 'MoneyBack',
        MONEY_BACK_OR_REPLACEMENT: 'MoneyBackOrReplacement',
        MONEY_BACK_OR_EXCHANGE: 'MoneyBackOrExchange'
    },
    returnsWithinOptions: {
        DAYS_14: 'Days_14',
        DAYS_30: 'Days_30',
        DAYS_60: 'Days_60'
    },
    countries: [
        {
            code: 'AL',
            name: 'Albania'
        },
        {
            code: 'DZ',
            name: 'Algeria'
        },
        {
            code: 'AG',
            name: 'Antigua and Barbuda'
        },
        {
            code: 'AW',
            name: 'Aruba'
        },
        {
            code: 'AU',
            name: 'Australia'
        },
        {
            code: 'AT',
            name: 'Austria'
        },
        {
            code: 'BH',
            name: 'Bahrain'
        },
        {
            code: 'BE',
            name: 'Belgium'
        },
        {
            code: 'BJ',
            name: 'Benin'
        },
        {
            code: 'BM',
            name: 'Bermuda'
        },
        {
            code: 'BA',
            name: 'Bosnia and Herzegovina'
        },
        {
            code: 'BW',
            name: 'Botswana'
        },
        {
            code: 'BG',
            name: 'Bulgaria'
        },
        {
            code: 'BF',
            name: 'Burkina Faso'
        },
        {
            code: 'MM',
            name: 'Burma'
        },
        {
            code: 'BI',
            name: 'Burundi'
        },
        {
            code: 'CM',
            name: 'Cameroon'
        },
        {
            code: 'KY',
            name: 'Cayman Islands'
        },
        {
            code: 'CL',
            name: 'Chile'
        },
        {
            code: 'KM',
            name: 'Comoros'
        },
        {
            code: 'CG',
            name: 'Congo, Republic of the'
        },
        {
            code: 'CK',
            name: 'Cook Islands'
        },
        {
            code: 'CI',
            name: 'Cote d Ivoire (Ivory Coast)'
        },
        {
            code: 'HR',
            name: 'Croatia, Democratic Republic of the'
        },
        {
            code: 'CZ',
            name: 'Czech Republic'
        },
        {
            code: 'DJ',
            name: 'Djibouti'
        },
        {
            code: 'DM',
            name: 'Dominica'
        },
        {
            code: 'GQ',
            name: 'Equatorial Guinea'
        },
        {
            code: 'EE',
            name: 'Estonia'
        },
        {
            code: 'ET',
            name: 'Ethiopia'
        },
        {
            code: 'FR',
            name: 'France'
        },
        {
            code: 'GF',
            name: 'French Guiana'
        },
        {
            code: 'GM',
            name: 'Gambia'
        },
        {
            code: 'GE',
            name: 'Georgia'
        },
        {
            code: 'DE',
            name: 'Germany'
        },
        {
            code: 'GR',
            name: 'Greece'
        },
        {
            code: 'GL',
            name: 'Greenland'
        },
        {
            code: 'GN',
            name: 'Guinea'
        },
        {
            code: 'HT',
            name: 'Haiti'
        },
        {
            code: 'HN',
            name: 'Honduras'
        },
        {
            code: 'IS',
            name: 'Iceland'
        },
        {
            code: 'IN',
            name: 'India'
        },
        {
            code: 'ID',
            name: 'Indonesia'
        },
        {
            code: 'IL',
            name: 'Israel'
        },
        {
            code: 'JO',
            name: 'Jordan'
        },
        {
            code: 'KZ',
            name: 'Kazakhstan'
        },
        {
            code: 'KI',
            name: 'Kiribati'
        },
        {
            code: 'KP',
            name: 'Korea, North'
        },
        {
            code: 'KW',
            name: 'Kuwait'
        },
        {
            code: 'LS',
            name: 'Lesotho'
        },
        {
            code: 'LY',
            name: 'Libya'
        },
        {
            code: 'LI',
            name: 'Liechtenstein'
        },
        {
            code: 'LT',
            name: 'Lithuania'
        },
        {
            code: 'MO',
            name: 'Macau'
        },
        {
            code: 'MG',
            name: 'Madagascar'
        },
        {
            code: 'ML',
            name: 'Mali'
        },
        {
            code: 'MH',
            name: 'Marshall Islands'
        },
        {
            code: 'MU',
            name: 'Mauritius'
        },
        {
            code: 'YT',
            name: 'Mayotte'
        },
        {
            code: 'MN',
            name: 'Mongolia'
        },
        {
            code: 'MA',
            name: 'Morocco'
        },
        {
            code: 'MZ',
            name: 'Mozambique'
        },
        {
            code: 'NR',
            name: 'Nauru'
        },
        {
            code: 'AN',
            name: 'Netherlands Antilles'
        },
        {
            code: 'NC',
            name: 'New Caledonia'
        },
        {
            code: 'NE',
            name: 'Niger'
        },
        {
            code: 'PK',
            name: 'Pakistan'
        },
        {
            code: 'PG',
            name: 'Papua New Guinea'
        },
        {
            code: 'PY',
            name: 'Paraguay'
        },
        {
            code: 'PE',
            name: 'Peru'
        },
        {
            code: 'PR',
            name: 'Puerto Rico'
        },
        {
            code: 'QA',
            name: 'Qatar'
        },
        {
            code: 'SH',
            name: 'Saint Helena'
        },
        {
            code: 'KN',
            name: 'Saint Kitts-Nevis'
        },
        {
            code: 'SC',
            name: 'Seychelles'
        },
        {
            code: 'SL',
            name: 'Sierra Leone'
        },
        {
            code: 'SB',
            name: 'Solomon Islands'
        },
        {
            code: 'SO',
            name: 'Somalia'
        },
        {
            code: 'ES',
            name: 'Spain'
        },
        {
            code: 'SD',
            name: 'Sudan'
        },
        {
            code: 'SR',
            name: 'Suriname'
        },
        {
            code: 'SE',
            name: 'Sweden'
        },
        {
            code: 'SY',
            name: 'Syria'
        },
        {
            code: 'TJ',
            name: 'Tajikistan'
        },
        {
            code: 'TZ',
            name: 'Tanzania'
        },
        {
            code: 'TT',
            name: 'Trinidad and Tobago'
        },
        {
            code: 'UG',
            name: 'Uganda'
        },
        {
            code: 'UA',
            name: 'Ukraine'
        },
        {
            code: 'AE',
            name: 'United Arab Emirates'
        },
        {
            code: 'GB',
            name: 'United Kingdom'
        },
        {
            code: 'UY',
            name: 'Uruguay'
        },
        {
            code: 'VU',
            name: 'Vanuatu'
        },
        {
            code: 'VA',
            name: 'Vatican City State'
        },
        {
            code: 'VE',
            name: 'Venezuela'
        },
        {
            code: 'VN',
            name: 'Vietnam'
        },
        {
            code: 'VI',
            name: 'Virgin Islands (U.S.)'
        },
        {
            code: 'EH',
            name: 'Western Sahara'
        },
        {
            code: 'WS',
            name: 'Western Samoa'
        },
        {
            code: 'YE',
            name: 'Yemen'
        },
        {
            code: 'ZW',
            name: 'Zimbabwe'
        },
        {
            code: 'AO',
            name: 'Angola'
        },
        {
            code: 'AA',
            name: 'APO/FPO'
        },
        {
            code: 'JP',
            name: 'Japan'
        },
        {
            code: 'RE',
            name: 'Réunion'
        },
        {
            code: 'FM',
            name: 'Micronesia'
        },
        {
            code: 'AD',
            name: 'Andorra'
        },
        {
            code: 'AM',
            name: 'Armenia'
        },
        {
            code: 'BS',
            name: 'Bahamas'
        },
        {
            code: 'BY',
            name: 'Belarus'
        },
        {
            code: 'BT',
            name: 'Bhutan'
        },
        {
            code: 'VG',
            name: 'British Virgin Islands'
        },
        {
            code: 'KH',
            name: 'Cambodia'
        },
        {
            code: 'CF',
            name: 'Central African Republic'
        },
        {
            code: 'CD',
            name: 'Congo, Democratic Republic of the'
        },
        {
            code: 'CY',
            name: 'Cyprus'
        },
        {
            code: 'DO',
            name: 'Dominican Republic'
        },
        {
            code: 'ER',
            name: 'Eritrea'
        },
        {
            code: 'FJ',
            name: 'Fiji'
        },
        {
            code: 'GA',
            name: 'Gabon Republic'
        },
        {
            code: 'GI',
            name: 'Gibraltar'
        },
        {
            code: 'GU',
            name: 'Guam'
        },
        {
            code: 'GW',
            name: 'Guinea-Bissau'
        },
        {
            code: 'HU',
            name: 'Hungary'
        },
        {
            code: 'IR',
            name: 'Iran'
        },
        {
            code: 'KE',
            name: 'Kenya Coast Republic'
        },
        {
            code: 'LA',
            name: 'Laos'
        },
        {
            code: 'LR',
            name: 'Liberia'
        },
        {
            code: 'LU',
            name: 'Luxembourg'
        },
        {
            code: 'MY',
            name: 'Malaysia'
        },
        {
            code: 'MQ',
            name: 'Martinique'
        },
        {
            code: 'MX',
            name: 'Mexico'
        },
        {
            code: 'MS',
            name: 'Montserrat'
        },
        {
            code: 'NP',
            name: 'Nepal'
        },
        {
            code: 'NZ',
            name: 'New Zealand'
        },
        {
            code: 'NO',
            name: 'Norway'
        },
        {
            code: 'PH',
            name: 'Philippines'
        },
        {
            code: 'RO',
            name: 'Romania'
        },
        {
            code: 'LC',
            name: 'Saint Lucia'
        },
        {
            code: 'SN',
            name: 'Senegal'
        },
        {
            code: 'SK',
            name: 'Slovakia'
        },
        {
            code: 'ZA',
            name: 'South Africa'
        },
        {
            code: 'SJ',
            name: 'Svalbard'
        },
        {
            code: 'TG',
            name: 'Togo'
        },
        {
            code: 'TV',
            name: 'Tuvalu'
        },
        {
            code: 'AF',
            name: 'Afghanistan'
        },
        {
            code: 'AZ',
            name: 'Azerbaijan Republic'
        },
        {
            code: 'BN',
            name: 'Brunei Darussalam'
        },
        {
            code: 'CO',
            name: 'Colombia'
        },
        {
            code: 'DK',
            name: 'Denmark'
        },
        {
            code: 'FI',
            name: 'Finland'
        },
        {
            code: 'GD',
            name: 'Grenada'
        },
        {
            code: 'HK',
            name: 'Hong Kong'
        },
        {
            code: 'LV',
            name: 'Latvia'
        },
        {
            code: 'MW',
            name: 'Malawi'
        },
        {
            code: 'MC',
            name: 'Monaco'
        },
        {
            code: 'NI',
            name: 'Nicaragua'
        },
        {
            code: 'PM',
            name: 'Saint Pierre and Miquelon'
        },
        {
            code: 'SZ',
            name: 'Swaziland'
        },
        {
            code: 'TR',
            name: 'Turkey'
        },
        {
            code: 'AI',
            name: 'Anguilla'
        },
        {
            code: 'BO',
            name: 'Bolivia'
        },
        {
            code: 'CN',
            name: 'China'
        },
        {
            code: 'EG',
            name: 'Egypt'
        },
        {
            code: 'GH',
            name: 'Ghana'
        },
        {
            code: 'IQ',
            name: 'Iraq'
        },
        {
            code: 'LB',
            name: 'Lebanon, South'
        },
        {
            code: 'MD',
            name: 'Moldova'
        },
        {
            code: 'SM',
            name: 'San Marino'
        },
        {
            code: 'TW',
            name: 'Taiwan'
        },
        {
            code: 'OM',
            name: 'Oman'
        },
        {
            code: 'RU',
            name: 'Russian Federation'
        },
        {
            code: 'TO',
            name: 'Tonga'
        },
        {
            code: 'SG',
            name: 'Singapore'
        },
        {
            code: 'AR',
            name: 'Argentina'
        },
        {
            code: 'TD',
            name: 'Chad'
        },
        {
            code: 'PF',
            name: 'French Polynesia'
        },
        {
            code: 'KG',
            name: 'Kyrgyzstan'
        },
        {
            code: 'NU',
            name: 'Niue'
        },
        {
            code: 'SI',
            name: 'Slovenia'
        },
        {
            code: 'BZ',
            name: 'Belize'
        },
        {
            code: 'SV',
            name: 'El Salvador'
        },
        {
            code: 'GT',
            name: 'Guatemala'
        },
        {
            code: 'IT',
            name: 'Italy'
        },
        {
            code: 'MV',
            name: 'Maldives'
        },
        {
            code: 'NL',
            name: 'Netherlands'
        },
        {
            code: 'TH',
            name: 'Thailand'
        },
        {
            code: 'AS',
            name: 'American Samoa'
        },
        {
            code: 'BD',
            name: 'Bangladesh'
        },
        {
            code: 'BR',
            name: 'Brazil'
        },
        {
            code: 'CV',
            name: 'Cape Verde Islands'
        },
        {
            code: 'CR',
            name: 'Costa Rica'
        },
        {
            code: 'EC',
            name: 'Ecuador'
        },
        {
            code: 'FK',
            name: 'Falkland Islands (Islas Makvinas)'
        },
        {
            code: 'GY',
            name: 'Guyana'
        },
        {
            code: 'IE',
            name: 'Ireland'
        },
        {
            code: 'KR',
            name: 'Korea, South'
        },
        {
            code: 'MK',
            name: 'Macedonia'
        },
        {
            code: 'MR',
            name: 'Mauritania'
        },
        {
            code: 'NA',
            name: 'Namibia'
        },
        {
            code: 'NG',
            name: 'Nigeria'
        },
        {
            code: 'PL',
            name: 'Poland'
        },
        {
            code: 'PT',
            name: 'Portugal'
        },
        {
            code: 'VC',
            name: 'Saint Vincent and the Grenadines'
        },
        {
            code: 'SA',
            name: 'Saudi Arabia'
        },
        {
            code: 'LK',
            name: 'Sri Lanka'
        },
        {
            code: 'CH',
            name: 'Switzerland'
        },
        {
            code: 'TN',
            name: 'Tunisia'
        },
        {
            code: 'TC',
            name: 'Turks and Caicos Islands'
        },
        {
            code: 'UZ',
            name: 'Uzbekistan'
        },
        {
            code: 'WF',
            name: 'Wallis and Futuna'
        },
        {
            code: 'ZM',
            name: 'Zambia'
        },
        {
            code: 'BB',
            name: 'Barbados'
        },
        {
            code: 'CA',
            name: 'Canada'
        },
        {
            code: 'CU',
            name: 'Cuba'
        },
        {
            code: 'GP',
            name: 'Guadeloupe'
        },
        {
            code: 'JM',
            name: 'Jamaica'
        },
        {
            code: 'MT',
            name: 'Malta'
        },
        {
            code: 'PA',
            name: 'Panama'
        },
        {
            code: 'RW',
            name: 'Rwanda'
        },
        {
            code: 'TM',
            name: 'Turkmenistan'
        },
        {
            code: 'US',
            name: 'United States'
        },
        {
            code: 'PW',
            name: 'Palau'
        },
        {
            code: 'ME',
            name: 'Montenegro'
        },
        {
            code: 'RS',
            name: 'Serbia'
        }
    ],
    currencies: [
        'USD',
        'CAD',
        'GBP',
        'AUD',
        'EUR',
        'CHF',
        'CNY',
        'HKD',
        'PHP',
        'PLN',
        'SEK',
        'SGD',
        'TWD',
        'INR',
        'MYR'
    ],
    sites: [
        {
            name: 'US',
            ID: '0'
        },
        {
            name: 'Canada',
            ID: '2'
        },
        {
            name: 'UK',
            ID: '3'
        },
        {
            name: 'Germany',
            ID: '77'
        },
        {
            name: 'Australia',
            ID: '15'
        },
        {
            name: 'France',
            ID: '71'
        },
        {
            name: 'eBayMotors',
            ID: '100'
        },
        {
            name: 'Italy',
            ID: '101'
        },
        {
            name: 'Netherlands',
            ID: '146'
        },
        {
            name: 'Spain',
            ID: '186'
        },
        {
            name: 'India',
            ID: '203'
        },
        {
            name: 'HongKong',
            ID: '201'
        },
        {
            name: 'Singapore',
            ID: '216'
        },
        {
            name: 'Malaysia',
            ID: '207'
        },
        {
            name: 'Philippines',
            ID: '211'
        },
        {
            name: 'CanadaFrench',
            ID: '210'
        },
        {
            name: 'Poland',
            ID: '212'
        },
        {
            name: 'Belgium_Dutch',
            ID: '123'
        },
        {
            name: 'Belgium_French',
            ID: '23'
        },
        {
            name: 'Austria',
            ID: '16'
        },
        {
            name: 'Switzerland',
            ID: '193'
        },
        {
            name: 'Ireland',
            ID: '205'
        }
    ]
}