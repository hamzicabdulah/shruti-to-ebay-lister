import { Request, Response } from 'express';
import { EBay } from '../../classes/EBay';

export const getCurrencies = (req: Request, res: Response) => {
    const { APIAuthToken, site } = req.body;
    const eBay = new EBay(APIAuthToken, site);
    eBay.getCurrencies()
        .then(currencies => res.send(currencies))
        .catch(err => res.send({ errors: err }));
}