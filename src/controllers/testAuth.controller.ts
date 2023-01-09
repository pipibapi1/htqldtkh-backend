import { Request, Response, NextFunction } from "express";

const testAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).send({result: req.body})
    } catch (e:any) {
        res.status(400).send({err: e})
    }
};

export default testAuth;