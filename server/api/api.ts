import { Application } from 'express';
import { addItem } from './routes/addItem';
import { getSuggestedCategories } from './routes/getSuggestedCategories';
import { getCountries } from './routes/getCountries';
import { getCurrencies } from './routes/getCurrencies';
import { getSites } from './routes/getSites';
import { getDomesticShippingServices } from './routes/getDomesticShippingServices';
import { getPaymentMethods } from './routes/getPaymentMethods';
import { getReturnPolicyDetails } from './routes/getReturnPolicyDetails';
import { getSessionID } from './routes/getSessionID';

export function api(app: Application) {
    app.post('/api/add-item', addItem);
    app.post('/api/categories', getSuggestedCategories);
    app.post('/api/countries', getCountries);
    app.post('/api/currencies', getCurrencies);
    app.post('/api/sites', getSites);
    app.post('/api/shipping-services', getDomesticShippingServices);
    app.post('/api/payment-methods', getPaymentMethods);
    app.post('/api/return-policy', getReturnPolicyDetails);
    app.get('/api/session-id', getSessionID);
}