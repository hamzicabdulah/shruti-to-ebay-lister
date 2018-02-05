import { Request, Response } from 'express';
import { EBay } from '../../classes/EBay';

export const getPaymentMethods = (req: Request, res: Response) => {
    const { site, categoryID } = req.body;
    const eBay = new EBay(process.env.EBAY_AUTH_TOKEN, site);
    eBay.getPaymentMethods(categoryID)
        .then(paymentMethods => res.send(paymentMethods))
        .catch(err => res.send({ errors: err }));
}