import { Application } from 'express';
import { addItem } from './routes/addItem';
import { getSuggestedCategories } from './routes/getSuggestedCategories';
import { getCountries } from './routes/getCountries';
import { getCurrencies } from './routes/getCurrencies';

export function api(app: Application) {
    app.post('/api/add-item', addItem);
    app.post('/api/categories', getSuggestedCategories);
    app.post('/api/countries', getCountries);
    app.post('/api/currencies', getCurrencies);
}