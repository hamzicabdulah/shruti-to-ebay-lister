import { Request, Response } from 'express';
import { EBay } from '../../classes/EBay';

export const getAuthToken = (req: Request, res: Response) => {
    const { sessionID } = req.body;
    const eBay = new EBay(process.env.EBAY_AUTH_TOKEN);
    eBay.getAuthToken(sessionID)
        .then(authToken => res.send(authToken))
        .catch(err => res.send({ errors: err }));
}