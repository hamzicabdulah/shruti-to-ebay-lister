import { Request, Response } from 'express';
import { EBay } from '../../classes/EBay';

export const getSites = (req: Request, res: Response) => {
    const { APIAuthToken } = req.body;
    const eBay = new EBay(APIAuthToken);
    eBay.getSites()
        .then(sites => res.send(sites))
        .catch(err => res.send({ errors: err }));
}