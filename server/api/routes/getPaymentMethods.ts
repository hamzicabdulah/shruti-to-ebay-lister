import { Request, Response } from 'express';
import { EBay } from '../../classes/EBay';

export const getPaymentMethods = (req: Request, res: Response) => {
    const { APIAuthToken, site, categoryID } = req.body;
    const eBay = new EBay(APIAuthToken, site);
    eBay.getPaymentMethods(categoryID)
        .then(paymentMethods => res.send(paymentMethods))
        .catch(err => res.send({ errors: err }));
}