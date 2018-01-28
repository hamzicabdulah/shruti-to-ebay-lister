import { Request, Response } from 'express';
import { EBay, IAddedItem } from '../../classes/EBay';

export const addItem = (req: Request, res: Response) => {
    const { APIAuthToken, site, ...params } = req.body;
    const eBay = new EBay(APIAuthToken, site);
    eBay.addItem(params)
        .then((item: IAddedItem) => res.send(item))
        .catch(err => res.send({ errors: err }));
}