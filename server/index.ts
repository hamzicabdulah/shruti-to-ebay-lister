import * as express from 'express';
import { Application, Request, Response } from 'express';
import { resolve } from 'path';
import { connect } from 'mongoose';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import { api } from './api/api';
import { EBay } from "./classes/EBay";

export const app: Application = express();
dotenv.config({
    path: __dirname + '/../.env'
});
connect(process.env.MONGODB_URI, { useMongoClient: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

api(app);
app.use(express.static(resolve(__dirname, '../client/public')));
app.get('*', (req: Request, res: Response) => {
    res.sendFile(resolve(__dirname, '../client/public/index.html'));
});

const port = process.env.PORT || 3000;
if (!module.parent) {
    app.listen(port, (err: Error) => {
        if (err) throw err;
        else console.log('Listening on port ' + port);
    });
}
