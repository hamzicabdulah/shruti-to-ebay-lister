import { Request, Response } from 'express';
import { EBay } from '../../classes/EBay';

export const getSuggestedCategories = (req: Request, res: Response) => {
    const { site, itemKeywords } = req.body;
    const eBay = new EBay(process.env.EBAY_AUTH_TOKEN, site);
    eBay.getSuggestedCategoriesForItem(itemKeywords)
        .then(categories => res.send(categories))
        .catch(err => res.send({ errors: err }));
}