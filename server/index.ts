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
    const ebay = new EBay();
    ebay.addItem({
        title: 'Some product',
        description: 'string',
        categoryID: 377,
        startPrice: 1100,
        country: 'US',
        currency: 'USD',
        conditionID: 1000,
        dispatchTimeMax: 2,
        listingDuration: 'Days_7',
        listingType: 'Chinese',
        paymentMethods: ['PayPal'],
        paypalEmail: 'abdulahhamzic@gmail.com',
        pictureURLs: ['http://i16.ebayimg.com/01/c/03/c2/9d/d5_6.JPG'],
        postalCode: '94155',
        quantity: 1,
        returnsAccepted: 'ReturnsAccepted',
        refund: 'MoneyBack',
        returnPolicyDescription: 'string',
        returnsWithin: 'Days_14',
        shippingCostPaidBy: 'Buyer',
        shippingType: 'Flat',
        shippingServicePriority: 1,
        domesticShippingService: 'USPSMedia',
        shippingServiceCost: 2,
        site: 'US'
    })
    .then(res => console.log(res))
    .catch(err => console.error(err));
}
