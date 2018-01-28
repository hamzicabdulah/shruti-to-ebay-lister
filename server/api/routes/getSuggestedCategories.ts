import { Request, Response } from 'express';
import { EBay } from '../../classes/EBay';

export const getSuggestedCategories = (req: Request, res: Response) => {
    const { APIAuthToken, site, itemKeywords } = req.body;
    const eBay = new EBay(APIAuthToken, site);
    eBay.getSuggestedCategoriesForItem(itemKeywords)
        .then(categories => res.send(categories))
        .catch(err => res.send({ errors: err }));
}