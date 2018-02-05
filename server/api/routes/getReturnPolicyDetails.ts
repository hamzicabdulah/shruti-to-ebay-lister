import { Request, Response } from 'express';
import { EBay } from '../../classes/EBay';

export const getReturnPolicyDetails = (req: Request, res: Response) => {
    const { site, categoryID } = req.body;
    const eBay = new EBay(process.env.EBAY_AUTH_TOKEN, site);
    eBay.getReturnPolicySupport(categoryID)
        .then(returnPolicySupport => {
            eBay.getReturnPolicyDetails()
                .then(returnPolicy => {
                    res.send({
                        returnPolicySupport,
                        ...returnPolicy
                    });
                })
                .catch(err => res.send({ errors: err }));
        })
}