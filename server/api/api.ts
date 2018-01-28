import { Application } from 'express';
import { addItem } from './routes/addItem';

export function api(app: Application) {
    app.post('/api/add-item', addItem);
}