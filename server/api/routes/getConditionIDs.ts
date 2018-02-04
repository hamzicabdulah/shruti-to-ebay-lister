import { Request, Response } from 'express';
import { EBay } from '../../classes/EBay';

export const getConditionIDs = (req: Request, res: Response) => {
    const { APIAuthToken, site, categoryID } = req.body;
    const eBay = new EBay(APIAuthToken, site);
    eBay.getConditionIDs(categoryID)
        .then(conditionIDs => res.send(conditionIDs))
        .catch(err => res.send({ errors: err }));
}