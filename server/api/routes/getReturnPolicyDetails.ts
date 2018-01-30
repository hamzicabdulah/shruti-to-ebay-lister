import { Request, Response } from 'express';
import { EBay } from '../../classes/EBay';

export const getReturnPolicyDetails = (req: Request, res: Response) => {
    const { APIAuthToken, site } = req.body;
    const eBay = new EBay(APIAuthToken, site);
    eBay.getReturnPolicyDetails()
        .then(returnPolicy => res.send(returnPolicy))
        .catch(err => res.send({ errors: err }));
}