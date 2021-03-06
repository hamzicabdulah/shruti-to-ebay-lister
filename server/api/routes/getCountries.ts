import { Request, Response } from 'express';
import { EBay } from '../../classes/EBay';

export const getCountries = (req: Request, res: Response) => {
    const { APIAuthToken } = req.body;
    const eBay = new EBay(APIAuthToken);
    eBay.getCountries()
        .then(countries => res.send(countries))
        .catch(err => res.send({ errors: err }));
}