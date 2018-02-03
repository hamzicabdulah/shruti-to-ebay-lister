import { Request, Response } from 'express';
import { EBay } from '../../classes/EBay';

export const addItem = (req: Request, res: Response) => {
    const { APIAuthToken, site, ...params } = req.body;
    const eBay = new EBay(APIAuthToken, site);
    return eBay.addItem(params)
        .then(item => res.send(item))
        .catch(err => res.send({ errors: err }));
}