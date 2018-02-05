import { Request, Response } from 'express';
import { EBay } from '../../classes/EBay';

export const getDispatchTimeMaxOptions = (req: Request, res: Response) => {
    const { site } = req.body;
    const eBay = new EBay(process.env.EBAY_AUTH_TOKEN, site);
    eBay.getDispatchTimeMaxOptions()
        .then(dispatchTimeMaxOptions => res.send(dispatchTimeMaxOptions))
        .catch(err => res.send({ errors: err }));
}