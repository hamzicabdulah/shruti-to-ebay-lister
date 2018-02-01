import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import { EBay } from '../../classes/EBay';
dotenv.config({
    path: __dirname + '/../../../.env'
});

export const getSessionID = (req: Request, res: Response) => {
    const eBay = new EBay(process.env.EBAY_AUTH_TOKEN);
    eBay.getSessionID()
        .then(sessionID => res.send(sessionID))
        .catch(err => res.send({ errors: err }));
}