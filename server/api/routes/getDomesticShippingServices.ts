import { Request, Response } from 'express';
import { EBay } from '../../classes/EBay';

export const getDomesticShippingServices = (req: Request, res: Response) => {
    const { APIAuthToken, site } = req.body;
    const eBay = new EBay(APIAuthToken, site);
    eBay.getDomesticShippingServices()
        .then(services => res.send(services))
        .catch(err => res.send({ errors: err }));
}