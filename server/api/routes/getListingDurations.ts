import { Request, Response } from 'express';
import { EBay } from '../../classes/EBay';

export const getListingDurations = (req: Request, res: Response) => {
    const { site, categoryID } = req.body;
    const eBay = new EBay(process.env.EBAY_AUTH_TOKEN, site);
    eBay.getListingDurations(categoryID)
        .then(response => res.send(response))
        .catch(err => res.send({ errors: err }));
}