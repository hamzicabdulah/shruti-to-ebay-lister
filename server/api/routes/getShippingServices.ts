import { Request, Response } from 'express';
import { EBay } from '../../classes/EBay';

export const getShippingServices = (req: Request, res: Response) => {
    const { site } = req.body;
    const eBay = new EBay(process.env.EBAY_AUTH_TOKEN, site);
    eBay.getShippingServices()
        .then(services => res.send(services))
        .catch(err => res.send({ errors: err }));
}