import { Request, Response } from 'express';
import { EBay } from '../../classes/EBay';

export const getCurrencies = (req: Request, res: Response) => {
    const { APIAuthToken } = req.body;
    const eBay = new EBay(APIAuthToken);
    eBay.getCurrencies()
        .then(currencies => res.send(currencies))
        .catch(err => res.send({ errors: err }));
}