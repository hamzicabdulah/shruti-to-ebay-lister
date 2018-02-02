import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import { EBay } from '../../classes/EBay';
import { eBayConstantData } from '../../../eBayConstantData';
dotenv.config({
    path: __dirname + '/../../../.env'
});

export const getSignInUrl = (req: Request, res: Response) => {
    const eBay = new EBay(process.env.EBAY_AUTH_TOKEN);
    eBay.getSessionID()
        .then(sessionID => {
            const sessionIDEncoded = encodeURIComponent(sessionID);
            const signInUrl = `${eBayConstantData.signInUrl}RUName=${eBayConstantData.ruName}&SessID=${sessionIDEncoded}&ruparams=sessionID%3D${sessionIDEncoded}`;
            res.send(signInUrl);
        })
        .catch(err => res.send({ errors: err }));
}