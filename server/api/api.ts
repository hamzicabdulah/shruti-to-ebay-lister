import { Application } from 'express';
import { addItem } from './routes/addItem';
import { getSuggestedCategories } from './routes/getSuggestedCategories';
import { getCountries } from './routes/getCountries';
import { getCurrencies } from './routes/getCurrencies';
import { getSites } from './routes/getSites';
import { getShippingServices } from './routes/getShippingServices';
import { getPaymentMethods } from './routes/getPaymentMethods';
import { getReturnPolicyDetails } from './routes/getReturnPolicyDetails';
import { getSignInUrl } from './routes/getSignInUrl';
import { getAuthToken } from './routes/getAuthToken';
import { getConditionIDs } from './routes/getConditionIDs';
import { getDispatchTimeMaxOptions } from './routes/getDispatchTimeMaxOptions';
import { getListingDurations } from './routes/getListingDurations';

export function api(app: Application) {
    app.post('/api/add-item', addItem);
    app.post('/api/categories', getSuggestedCategories);
    app.post('/api/countries', getCountries);
    app.post('/api/currencies', getCurrencies);
    app.post('/api/sites', getSites);
    app.post('/api/shipping-services', getShippingServices);
    app.post('/api/payment-methods', getPaymentMethods);
    app.post('/api/return-policy', getReturnPolicyDetails);
    app.post('/api/condition-ids', getConditionIDs);
    app.get('/api/sign-in-url', getSignInUrl);
    app.post('/api/auth-token', getAuthToken);
    app.post('/api/dispatch-time-max', getDispatchTimeMaxOptions);
    app.post('/api/listing-durations', getListingDurations);
}