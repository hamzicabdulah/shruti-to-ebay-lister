import { Request, Response } from 'express';
import { EBay } from '../../classes/EBay';

export const getCountries = (req: Request, res: Response) => {
    const { APIAuthToken, site } = req.body;
    const eBay = new EBay(APIAuthToken, site);
    eBay.getCountries()
        .then(countries => res.send(countries))
        .catch(err => res.send({ errors: err }));
}